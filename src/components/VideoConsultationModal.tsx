import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  MessageSquare,
  FileText,
  Shield,
  User,
  Send
} from 'lucide-react';

export const VideoConsultationModal: React.FC = () => {
  const { activeVideoAppointment, setActiveVideoAppointment, showToast } = useApp();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(42);
  const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<
    { sender: 'doctor' | 'patient'; text: string; time: string }[]
  >([
    {
      sender: 'doctor',
      text: 'Good day! I have reviewed your previous symptoms. How are you feeling today?',
      time: 'Just now'
    }
  ]);

  useEffect(() => {
    if (!activeVideoAppointment) return;
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeVideoAppointment]);

  if (!activeVideoAppointment) return null;

  const apt = activeVideoAppointment;

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      sender: 'patient' as const,
      text: chatInput.trim(),
      time: 'Just now'
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    // Doctor simulated quick response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'doctor',
          text: 'Understood. Let me note that in your clinical prescription.',
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  const handleEndCall = () => {
    showToast('Video consultation ended. Notes saved to your dashboard.', 'info');
    setActiveVideoAppointment(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 text-white rounded-2xl max-w-5xl w-full h-[90vh] max-h-[720px] shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
              <img src={apt.doctor.photo} alt={apt.doctor.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{apt.doctor.name}</span>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Consultation
                </span>
              </div>
              <div className="text-xs text-slate-400">
                {apt.doctor.specialization} · {apt.doctor.hospital}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>{formatTimer(secondsElapsed)}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>256-bit Encrypted</span>
            </div>
            <button
              onClick={() => setActiveVideoAppointment(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden bg-slate-950">
          {/* Video Area (2 cols on desktop) */}
          <div className="lg:col-span-2 relative flex flex-col justify-between p-4 bg-slate-950">
            {/* Doctor Video Feed */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
              <img
                src={apt.doctor.photo}
                alt={apt.doctor.name}
                className="w-full h-full object-cover opacity-90 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Doctor Label overlay */}
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs">
                <span className="font-semibold text-white">{apt.doctor.name}</span>
                <span className="text-slate-400 text-[11px] ml-2">Speaking...</span>
              </div>

              {/* Patient PIP feed */}
              <div className="absolute top-4 right-4 w-32 sm:w-40 h-24 sm:h-28 rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-800 shadow-xl">
                {isVideoOn ? (
                  <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                    <User className="w-8 h-8 text-blue-400 mb-1" />
                    <span className="text-[10px] font-medium text-slate-300">You (Patient Camera)</span>
                  </div>
                ) : (
                  <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-slate-500">
                    <VideoOff className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">Camera Off</span>
                  </div>
                )}
                <div className="absolute bottom-1 left-2 text-[10px] text-white/80 font-medium">
                  Rahul Verma
                </div>
              </div>
            </div>

            {/* Bottom In-Call Controls */}
            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  isMicOn
                    ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                    : 'bg-rose-600 border-rose-500 text-white'
                }`}
                title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  isVideoOn
                    ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                    : 'bg-rose-600 border-rose-500 text-white'
                }`}
                title={isVideoOn ? 'Turn off video' : 'Turn on video'}
              >
                {isVideoOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEndCall}
                className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Leave Call</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar: Chat & Clinical Notes */}
          <div className="border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col bg-slate-900/60">
            {/* Tabs */}
            <div className="flex border-b border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 px-4 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'chat'
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Consultation Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3 px-4 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'notes'
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-800/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Prescription Preview</span>
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'chat' ? (
              <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${
                        msg.sender === 'patient' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                          msg.sender === 'patient'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-0.5">{msg.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type message or ask doctor..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
                <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="font-semibold text-blue-400">Chief Symptoms Logged</div>
                  <div className="text-slate-300">{apt.symptoms || 'General Checkup'}</div>
                </div>

                <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/80 space-y-2">
                  <div className="font-semibold text-emerald-400">Doctor Realtime Advice</div>
                  <ul className="list-disc pl-4 text-slate-300 space-y-1 leading-relaxed">
                    <li>Maintain regular hydration (2.5L water daily)</li>
                    <li>Avoid high caffeine post 4 PM</li>
                    <li>Repeat blood pressure tracking for 3 consecutive mornings</li>
                  </ul>
                </div>

                <div className="text-[11px] text-slate-500 italic text-center">
                  Official signed e-prescription will be generated upon concluding the consultation.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
