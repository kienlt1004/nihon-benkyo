import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  PhoneCall,
  PhoneOff,
  Sparkles,
  Radio,
  Send,
  AlertCircle,
  HelpCircle,
  Headphones,
  CheckCircle2,
} from "lucide-react";

const KAIWA_TOPICS = [
  {
    id: "intro",
    title: "Tự giới thiệu bản thân (自己紹介)",
    prompt: "こんにちは！初めまして。自己紹介の練習をしましょう。お名前は何ですか？ (Xin chào! Hãy cùng luyện tập tự giới thiệu bản thân nhé. Bạn tên là gì?)",
  },
  {
    id: "shopping",
    title: "Mua sắm & Gọi món (買い物・レストラン)",
    prompt: "いらっしゃいませ！何名様ですか？ご注文はお決まりですか？ (Kính chào quý khách! Quý khách đi mấy người ạ? Đã chọn món chưa?)",
  },
  {
    id: "directions",
    title: "Hỏi đường & Đi tàu điện (道案内・電車)",
    prompt: "すみません、東京駅に行きたいんですが、どの電車に乗ればいいですか？ (Xin lỗi, tôi muốn đến ga Tokyo thì nên đi chuyến tàu nào ạ?)",
  },
  {
    id: "weekend",
    title: "Kế hoạch cuối tuần (週末の予定)",
    prompt: "今週末は何をしますか？どこかに行きますか？ (Cuối tuần này bạn làm gì? Có đi đâu chơi không?)",
  },
  {
    id: "free",
    title: "Trò chuyện tự do N4 (自由会話)",
    prompt: "こんにちは！今日はどんなことについて話しましょうか？日本語で楽しくおしゃべりしましょう！ (Xin chào! Hôm nay chúng ta cùng trò chuyện về chủ đề gì nào?)",
  },
];

export function LiveVoiceKaiwa() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [statusText, setStatusText] = useState("Sẵn sàng bắt đầu");
  const [activeTopic, setActiveTopic] = useState(KAIWA_TOPICS[0]);
  const [error, setError] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [isModelSpeaking, setIsModelSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Audio Context and WebSocket references
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const isMutedRef = useRef(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      disconnectSession();
    };
  }, []);

  const pcmToBase64 = (float32Array: Float32Array): string => {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    const bytes = new Uint8Array(int16Array.buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const playPcmChunk = (base64Data: string) => {
    try {
      if (!outputAudioCtxRef.current) {
        outputAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 24000,
        });
      }
      const ctx = outputAudioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const binary = atob(base64Data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / (int16[i] < 0 ? 0x8000 : 0x7fff);
      }

      const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
      audioBuffer.copyToChannel(float32, 0);

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      const now = ctx.currentTime;
      if (nextStartTimeRef.current < now) {
        nextStartTimeRef.current = now;
      }

      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;

      activeSourcesRef.current.push(source);
      setIsModelSpeaking(true);

      source.onended = () => {
        activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
        if (activeSourcesRef.current.length === 0) {
          setIsModelSpeaking(false);
        }
      };
    } catch (e) {
      console.error("Lỗi phát âm thanh Live:", e);
    }
  };

  const stopActiveAudioPlayback = () => {
    activeSourcesRef.current.forEach((source) => {
      try {
        source.stop();
        source.disconnect();
      } catch {
        // ignore
      }
    });
    activeSourcesRef.current = [];
    if (outputAudioCtxRef.current) {
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
    }
    setIsModelSpeaking(false);
  };

  const connectSession = async () => {
    try {
      setError(null);
      setIsConnecting(true);
      setStatusText("Đang xin quyền Microphone...");

      // 1. Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;

      // 2. Initialize Audio Contexts
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      inputAudioCtxRef.current = new AudioCtx({ sampleRate: 16000 });
      outputAudioCtxRef.current = new AudioCtx({ sampleRate: 24000 });

      if (inputAudioCtxRef.current.state === "suspended") {
        await inputAudioCtxRef.current.resume();
      }
      if (outputAudioCtxRef.current.state === "suspended") {
        await outputAudioCtxRef.current.resume();
      }

      // 3. Connect WebSocket to server.ts Live API endpoint
      setStatusText("Đang kết nối Gemini 3.8 Live API...");
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/api/live-voice`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setStatusText("Đã kết nối! Đang trò chuyện với Sakura-sensei...");
        setIsConnected(true);
        setIsConnecting(false);

        // Send opening topic context
        if (activeTopic.prompt) {
          ws.send(
            JSON.stringify({
              text: `Chào Sakura-sensei, hôm nay em muốn luyện tập chủ đề: "${activeTopic.title}". Bắt đầu với gợi ý: "${activeTopic.prompt}". Sensei hãy mở lời chào và đặt câu hỏi mở đầu cho em nhé.`,
            }),
          );
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.audio) {
            playPcmChunk(data.audio);
          }
          if (data.interrupted) {
            stopActiveAudioPlayback();
          }
          if (data.error) {
            setError(data.error);
          }
        } catch (e) {
          console.error("Lỗi giải mã tin nhắn WebSocket:", e);
        }
      };

      ws.onerror = (err) => {
        console.error("Lỗi WebSocket Live:", err);
        setError("Không thể kết nối đến máy chủ đàm thoại.");
        disconnectSession();
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
        setStatusText("Phiên đàm thoại đã kết thúc");
      };

      // 4. Setup microphone audio processing (16kHz PCM streaming)
      const source = inputAudioCtxRef.current.createMediaStreamSource(stream);
      const processor = inputAudioCtxRef.current.createScriptProcessor(4096, 1, 1);
      scriptProcessorRef.current = processor;

      source.connect(processor);
      processor.connect(inputAudioCtxRef.current.destination);

      processor.onaudioprocess = (e) => {
        if (isMutedRef.current || ws.readyState !== WebSocket.OPEN) return;

        const channelData = e.inputBuffer.getChannelData(0);

        // Calculate simple volume level for visualizer
        let sum = 0;
        for (let i = 0; i < channelData.length; i++) {
          sum += Math.abs(channelData[i]);
        }
        const avg = sum / channelData.length;
        setAudioLevel(Math.min(100, Math.round(avg * 400)));

        const base64Audio = pcmToBase64(channelData);
        ws.send(JSON.stringify({ audio: base64Audio }));
      };
    } catch (err: any) {
      console.error("Lỗi khởi tạo Microphone / Live API:", err);
      setError(
        err?.name === "NotAllowedError"
          ? "Trình duyệt chưa được cấp quyền Microphone. Vui lòng cho phép quyền Mic để trò chuyện."
          : err?.message || "Không thể khởi động kết nối đàm thoại thoại.",
      );
      disconnectSession();
    }
  };

  const disconnectSession = () => {
    stopActiveAudioPlayback();

    if (scriptProcessorRef.current) {
      try {
        scriptProcessorRef.current.disconnect();
      } catch {}
      scriptProcessorRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (inputAudioCtxRef.current) {
      try {
        inputAudioCtxRef.current.close();
      } catch {}
      inputAudioCtxRef.current = null;
    }

    if (outputAudioCtxRef.current) {
      try {
        outputAudioCtxRef.current.close();
      } catch {}
      outputAudioCtxRef.current = null;
    }

    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch {}
      wsRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    setIsModelSpeaking(false);
    setAudioLevel(0);
    setStatusText("Đã ngắt kết nối");
  };

  const handleSendTextMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(JSON.stringify({ text: textInput.trim() }));
    setTextInput("");
  };

  return (
    <div className="space-y-6">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-rose-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-rose-800/40 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-medium mb-3">
              <Sparkles size={14} className="text-amber-300" />
              <span>Gemini 3.8 Live API (Real-time Audio Conversation)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Luyện Kaiwa N4 cùng Sakura-sensei
              {isConnected && (
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              )}
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Trò chuyện trực tiếp bằng giọng nói 2 chiều siêu mượt với trí tuệ nhân tạo Sakura-sensei. Luyện phản xạ giao tiếp, phát âm chuẩn và tự tin trước kỳ thi JLPT N4.
            </p>
          </div>

          {/* Connection Toggle Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {!isConnected ? (
              <button
                onClick={connectSession}
                disabled={isConnecting}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold rounded-2xl text-sm transition-all flex items-center gap-2.5 shadow-lg shadow-emerald-950/30 cursor-pointer"
              >
                <PhoneCall size={18} />
                <span>{isConnecting ? "Đang kết nối..." : "Bắt đầu đàm thoại Voice"}</span>
              </button>
            ) : (
              <button
                onClick={disconnectSession}
                className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-sm transition-all flex items-center gap-2.5 shadow-lg shadow-rose-950/30 cursor-pointer"
              >
                <PhoneOff size={18} />
                <span>Kết thúc cuộc gọi</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm flex items-start gap-3">
          <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Thông báo lỗi:</strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Sensei Avatar & Audio Visualizer */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-between min-h-[420px]">
          {/* Status badge */}
          <div className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-xs font-semibold">
            <Radio size={14} className={isConnected ? "text-emerald-500 animate-pulse" : "text-slate-400"} />
            <span>{statusText}</span>
          </div>

          {/* Central Avatar & Sound Animation */}
          <div className="relative my-8 flex flex-col items-center">
            {/* Visualizer rings when speaking or active */}
            {isConnected && (
              <div
                className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none -m-8 sm:-m-12 ${
                  isModelSpeaking
                    ? "bg-rose-400/20 scale-125 animate-ping"
                    : audioLevel > 15
                    ? "bg-indigo-400/20 scale-110"
                    : "opacity-0"
                }`}
              />
            )}

            <div
              className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center p-2 text-white shadow-xl transition-all duration-300 relative z-10 ${
                !isConnected
                  ? "bg-gradient-to-tr from-slate-400 to-slate-500"
                  : isModelSpeaking
                  ? "bg-gradient-to-tr from-rose-500 to-pink-500 ring-8 ring-rose-100"
                  : "bg-gradient-to-tr from-indigo-600 to-indigo-800 ring-8 ring-indigo-50"
              }`}
            >
              <div className="text-4xl mb-1">🌸</div>
              <div className="text-base sm:text-lg font-bold tracking-tight">Sakura-sensei</div>
              <div className="text-[11px] text-white/80 font-medium">JLPT N4 Kaiwa</div>
            </div>

            {/* Speaking / Listening feedback */}
            <div className="mt-4 text-center">
              {isConnected ? (
                isModelSpeaking ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                    <Volume2 size={14} className="animate-bounce" /> Sakura-sensei đang nói...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    <Mic size={14} className="animate-pulse text-indigo-600" /> Đang lắng nghe bạn nói...
                  </span>
                )
              ) : (
                <span className="text-xs text-slate-400">
                  Nhấn "Bắt đầu đàm thoại Voice" để trò chuyện với Sensei
                </span>
              )}
            </div>
          </div>

          {/* Bottom Action Controls */}
          {isConnected ? (
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3.5 rounded-full border transition-all flex items-center gap-2 text-sm font-semibold cursor-pointer ${
                    isMuted
                      ? "bg-amber-50 border-amber-300 text-amber-700"
                      : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                  <span>{isMuted ? "Đã tắt Mic (Bật lại)" : "Đang bật Mic"}</span>
                </button>

                <button
                  onClick={stopActiveAudioPlayback}
                  disabled={!isModelSpeaking}
                  className="p-3.5 rounded-full border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold disabled:opacity-40 transition-all flex items-center gap-2 cursor-pointer"
                  title="Ngắt lời Sensei"
                >
                  <VolumeX size={18} />
                  <span>Ngắt lời</span>
                </button>
              </div>

              {/* Text Fallback message form */}
              <form onSubmit={handleSendTextMessage} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Hoặc gõ tin nhắn tiếng Nhật/Việt gửi cho Sensei..."
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!textInput.trim()}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send size={14} />
                  <span>Gửi</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-xs text-slate-500 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
              <Headphones size={16} className="text-indigo-600" />
              <span>Khuyến nghị đeo tai nghe để trải nghiệm âm thanh rõ nét và chống vang mic tốt nhất.</span>
            </div>
          )}
        </div>

        {/* Right 1 Col: Topic Selection & Conversation Guide */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <HelpCircle size={18} className="text-indigo-600" />
              Chọn chủ đề đàm thoại
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Chọn chủ đề bạn muốn luyện tập trước khi bắt đầu cuộc gọi:
            </p>

            <div className="space-y-2">
              {KAIWA_TOPICS.map((topic) => {
                const isSelected = activeTopic.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setActiveTopic(topic);
                      if (isConnected && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                        wsRef.current.send(
                          JSON.stringify({
                            text: `Sensei ơi, em muốn đổi sang chủ đề: "${topic.title}". Bắt đầu với: "${topic.prompt}"`,
                          }),
                        );
                      }
                    }}
                    className={`w-full p-3 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? "bg-indigo-50/80 border-indigo-300 text-indigo-950 font-semibold shadow-xs"
                        : "bg-slate-50/60 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{topic.title}</span>
                      {isSelected && <CheckCircle2 size={16} className="text-indigo-600" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Helpful Tips Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200 text-amber-900 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
              <span>💡 Mẹo luyện Kaiwa hiệu quả:</span>
            </h4>
            <ul className="text-xs space-y-1.5 text-amber-900/90 leading-relaxed list-disc list-inside">
              <li>Nói to, rõ ràng và tự nhiên theo tốc độ của bạn.</li>
              <li>Nếu không hiểu câu hỏi của Sensei, hãy nói <em>"もう一度言ってください"</em> (Xin hãy nhắc lại một lần nữa).</li>
              <li>Bạn có thể ngắt lời bất kỳ lúc nào bằng nút "Ngắt lời" hoặc bắt đầu nói.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
