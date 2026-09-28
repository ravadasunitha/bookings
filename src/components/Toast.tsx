import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-600 shrink-0" />
  };

  const bgStyles = {
    success: 'bg-white border-emerald-200 text-slate-800 shadow-emerald-500/10',
    warning: 'bg-white border-amber-200 text-slate-800 shadow-amber-500/10',
    info: 'bg-white border-blue-200 text-slate-800 shadow-blue-500/10'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-md ${
          bgStyles[toast.type]
        }`}
      >
        {icons[toast.type]}
        <div className="text-xs font-medium text-slate-800 flex-1">{toast.message}</div>
        <button
          onClick={hideToast}
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
