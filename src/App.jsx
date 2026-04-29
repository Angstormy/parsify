import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MainLayout from './components/layout/MainLayout';
import ComingSoon from './components/features/ComingSoon';
import TeamMembers from './components/features/TeamMembers';
import About from './components/features/About';
import Docs from './components/features/Docs';
import './styles/globals.css';

// API URL - Using Hugging Face production API
const API_BASE = 'https://angstormy-hindi-ocr-api.hf.space';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showEngine, setShowEngine] = useState(true); // Default to showing engine
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [lang, setLang] = useState('english'); // Default to English
  const [detectedLang, setDetectedLang] = useState('');
  const [debugImage, setDebugImage] = useState(null);
  const [inferenceSteps, setInferenceSteps] = useState([]);
  const [loaderMessage, setLoaderMessage] = useState('Initializing Engines...');
  const fileInputRef = useRef(null);

  const statusMessages = [
    'Initializing AI Experts...',
    'Analyzing Vector Gradients...',
    'Consulting Devanagari Master...',
    'Auditing Lexicon Dictionary...',
    'Finalizing Consensus...'
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      let idx = 0;
      setLoaderMessage(statusMessages[0]);
      interval = setInterval(() => {
        idx = (idx + 1) % statusMessages.length;
        setLoaderMessage(statusMessages[idx]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('parsify-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setPrediction('');
      setError('');
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setPrediction('');
      setError('');
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handlePredict = async () => {
    if (!file) return;

    setLoading(true);
    setPrediction('');
    setDebugImage(null);
    setInferenceSteps([]);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE}/predict?lang=${lang}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data.prediction);
      setDebugImage(response.data.engine_view);
      setDetectedLang(response.data.detected_lang);
      setInferenceSteps(response.data.inference_steps || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  const getConfColor = (conf) => {
    if (conf > 0.8) return '#10b981';
    if (conf > 0.4) return '#f59e0b';
    return '#ef4444';
  };

  const renderHomeSection = () => (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 lg:mb-6">
        <h1 className="text-2xl lg:text-4xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>TRANSFORMER BASED HANDWRITTEN TEXT RECOGNITION ENGINE</h1>
        <p className="mt-1 text-sm lg:text-base" style={{ color: 'var(--text-secondary)' }}>
          Extract text from English/Hindi documents
        </p>
      </div>

      {/* Language Switcher - English first, then Hindi */}
      <div className="mb-4 lg:mb-6">
        <div className="inline-flex rounded-xl p-1" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
          <button 
            className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              lang === 'english' 
                ? 'bg-primary-600 text-white shadow-sm' 
                : 'hover:bg-primary-50/30'
            }`}
            style={lang === 'english' ? {} : { color: 'var(--text-secondary)' }}
            onClick={() => setLang('english')}
          >
            English
          </button>
          <button 
            className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              lang === 'hindi' 
                ? 'bg-primary-600 text-white shadow-sm' 
                : 'hover:bg-primary-50/30'
            }`}
            style={lang === 'hindi' ? {} : { color: 'var(--text-secondary)' }}
            onClick={() => setLang('hindi')}
          >
            Hindi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8 min-h-[300px] lg:min-h-[400px]">
        {/* Upload Section */}
        <div className="rounded-2xl shadow-sm p-6 flex flex-col h-full" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
          <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Original</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Upload or drag your document</p>
          
          <div 
            className="flex-1 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all flex flex-col items-center justify-center min-h-[220px]"
            style={{ borderColor: 'var(--border-subtle)' }}
            onClick={() => fileInputRef.current.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              hidden 
              accept="image/*"
            />
            {!preview ? (
              <div className="py-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--bg-base)' }}>
                  <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  Drop your file here or click to browse
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Supports PDF, JPG, PNG, WEBP up to 10MB
                </p>
              </div>
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="overflow-auto max-h-full max-w-full">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-40 max-w-full object-contain rounded-lg" 
                  />
                </div>
                <p className="text-sm mt-4" style={{ color: 'var(--text-secondary)' }}>{file.name}</p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 px-4 py-3 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <p className="text-sm" style={{ color: '#ef4444' }}>{error}</p>
            </div>
          )}

          <button 
            onClick={handlePredict} 
            disabled={!file || loading}
            className={`w-full mt-auto pt-6 flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all ${
              !file 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : loading
                  ? 'bg-primary-400 text-white cursor-wait'
                  : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {loaderMessage}
              </>
            ) : (
              'Upload Image'
            )}
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl shadow-lg p-6 text-white flex flex-col h-full max-h-[420px] lg:max-h-[520px]">
          <h2 className="text-lg font-semibold mb-1">Extracted Text</h2>
          <p className="text-sm text-white/70 mb-4">OCR results will appear here</p>
          
          {!prediction && !debugImage ? (
            <div className="flex-1 flex flex-col items-center justify-center py-4 text-white/50">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm">No extracted text yet</p>
              <p className="text-xs mt-1">Upload an image to get started</p>
            </div>
          ) : (
            <div className="flex-1 space-y-4 overflow-auto">
              {prediction && (
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white/70 uppercase tracking-wide">Extracted Output</span>
                    {detectedLang && (
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">{detectedLang}</span>
                    )}
                  </div>
                  <pre className="text-white text-3xl font-bold whitespace-pre-wrap leading-relaxed max-h-[150px] overflow-y-auto">{prediction}</pre>
                  <button 
                    onClick={() => navigator.clipboard.writeText(prediction)}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Text
                  </button>
                </div>
              )}
              
              {/* Small Debug Box */}
              {debugImage && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-white/50 uppercase">Debug View</span>
                  </div>
                  <div className="overflow-x-auto rounded-lg">
                    <img 
                      src={debugImage} 
                      alt="Debug" 
                      className="max-w-none rounded-lg border border-white/10" 
                      style={{ maxHeight: '120px' }} 
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Engine Vision Matrix - Full Width */}
      {debugImage && (
        <div className="rounded-2xl shadow-sm p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Engine Vision Matrix</h3>
          </div>
          <div className="overflow-x-auto rounded-xl p-4" style={{ background: 'var(--bg-base)' }}>
            <img src={debugImage} alt="Engine Vision" className="max-w-none rounded-lg mx-auto" style={{ maxHeight: '300px' }} />
          </div>
          <p className="text-sm mt-3 text-center" style={{ color: 'var(--text-secondary)' }}>Processed image visualization showing detected regions</p>
        </div>
      )}

      {/* Inference Steps - Full Width */}
      {inferenceSteps.length > 0 && (
        <div className="mt-6 rounded-2xl shadow-sm p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Vector Diagnostic Matrix</h3>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {inferenceSteps.map((wordObj, wIdx) => (
              <div key={wIdx} className="rounded-xl p-4" style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>WORD: {wordObj.word}</p>
                {wordObj.steps && wordObj.steps.map((step, sIdx) => (
                  <div key={sIdx} className="mb-3">
                    <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>Step {step.step}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.top_candidates && step.top_candidates.map((cand, cIdx) => (
                        <div 
                          key={cIdx} 
                          className="flex items-center gap-1 px-2 py-1 rounded-lg text-sm border"
                          style={{ 
                            borderColor: cIdx === 0 ? getConfColor(cand.confidence) : 'var(--border-subtle)',
                            backgroundColor: cIdx === 0 ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface)'
                          }}
                        >
                          <span style={{ color: 'var(--text-primary)' }}>{cand.char === '<eos>' ? '⌁' : cand.char}</span>
                          <span 
                            className="text-xs font-medium"
                            style={{ color: getConfColor(cand.confidence) }}
                          >
                            {Math.round(cand.confidence * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return renderHomeSection();
      case 'about':
        return <About />;
      case 'team':
        return <TeamMembers />;
      case 'docs':
        return <Docs />;
      default:
        return renderHomeSection();
    }
  };

  const handleEngineClick = () => {
    setActiveSection('home');
    setShowEngine(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout activeSection={activeSection} onSectionChange={setActiveSection} onEngineClick={handleEngineClick}>
      {renderSection()}
    </MainLayout>
  );
}

export default App;
