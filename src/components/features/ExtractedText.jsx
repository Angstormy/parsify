import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ExtractedText({ text, debugImage }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!text && !debugImage) {
    return (
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl shadow-lg shadow-primary-500/25 overflow-hidden flex flex-col h-full">
        <div className="px-6 py-4 bg-white/10 backdrop-blur border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Extracted Text</h2>
          <p className="text-sm text-white/70 mt-0.5">OCR results will appear here</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-white/70 text-sm">No extracted text yet</p>
            <p className="text-white/50 text-xs mt-1">Upload a PDF to get started</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl shadow-lg shadow-primary-500/25 overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 bg-white/10 backdrop-blur border-b border-white/10">
        <div>
          <h2 className="text-lg font-semibold text-white">Extracted Text</h2>
          <p className="text-sm text-white/70 mt-0.5">Hindi OCR Results</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden p-6">
        {text && (
          <div className="flex-1 bg-white/10 backdrop-blur rounded-xl p-4 mb-4 overflow-auto">
            <pre className="text-white/90 text-sm whitespace-pre-wrap font-sans leading-relaxed">
              {text}
            </pre>
          </div>
        )}
        
        {debugImage && (
          <div className="mt-4">
            <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
              Debug Vision
            </p>
            <img
              src={debugImage}
              alt="Debug"
              className="w-full rounded-xl border border-white/20"
            />
          </div>
        )}

        {text && (
          <div className="flex justify-end">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white/90 text-sm font-medium transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Text
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
