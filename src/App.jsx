import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MainLayout from './components/layout/MainLayout';
import ComingSoon from './components/features/ComingSoon';
import TeamMembers from './components/features/TeamMembers';
import About from './components/features/About';
import './styles/globals.css';

// API URL - Using Hugging Face production API
const API_BASE = 'https://angstormy-hindi-ocr-api.hf.space';

function App() {
  const [activeSection, setActiveSection] = useState('home');
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
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">TRANSFORMER BASED HANDWRITTEN TEXT RECOGNITION ENGINE</h1>
        <p className="text-gray-500 mt-1 text-sm lg:text-base">
          Extract text from English/Hindi documents
        </p>
      </div>

      {/* Language Switcher - English first, then Hindi */}
      <div className="mb-4 lg:mb-6">
        <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1">
          <button 
            className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              lang === 'english' 
                ? 'bg-primary-600 text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setLang('english')}
          >
            English
          </button>
          <button 
            className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              lang === 'hindi' 
                ? 'bg-primary-600 text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setLang('hindi')}
          >
            Hindi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8 min-h-[400px] lg:min-h-[600px]">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col h-full">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Original</h2>
          <p className="text-sm text-gray-500 mb-4">Upload or drag your document</p>
          
          <div 
            className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all flex flex-col items-center justify-center min-h-[300px]"
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
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Drop your file here or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supports PDF, JPG, PNG, WEBP up to 10MB
                </p>
              </div>
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="overflow-auto max-h-full max-w-full">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-64 max-w-full object-contain rounded-lg" 
                  />
                </div>
                <p className="text-sm text-gray-600 mt-4">{file.name}</p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button 
            onClick={handlePredict} 
            disabled={!file || loading}
            className={`w-full mt-auto pt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
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
        <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl shadow-lg p-6 text-white flex flex-col h-full">
          <h2 className="text-lg font-semibold mb-1">Extracted Text</h2>
          <p className="text-sm text-white/70 mb-4">OCR results will appear here</p>
          
          {!prediction && !debugImage ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-white/50">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm">No extracted text yet</p>
              <p className="text-xs mt-1">Upload an image to get started</p>
            </div>
          ) : (
            <div className="flex-1 space-y-4 overflow-auto">
              {prediction && (
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-white/70 uppercase tracking-wide">Extracted Output</span>
                    {detectedLang && (
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">{detectedLang}</span>
                    )}
                  </div>
                  <pre className="text-white text-5xl font-bold whitespace-pre-wrap leading-relaxed">{prediction}</pre>
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
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-gray-900">Engine Vision Matrix</h3>
          </div>
          <div className="overflow-x-auto bg-gray-50 rounded-xl p-4">
            <img src={debugImage} alt="Engine Vision" className="max-w-none rounded-lg mx-auto" style={{ maxHeight: '300px' }} />
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center">Processed image visualization showing detected regions</p>
        </div>
      )}

      {/* Inference Steps - Full Width */}
      {inferenceSteps.length > 0 && (
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-gray-900">Vector Diagnostic Matrix</h3>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {inferenceSteps.map((wordObj, wIdx) => (
              <div key={wIdx} className="border border-gray-100 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-500 mb-2">WORD: {wordObj.word}</p>
                {wordObj.steps && wordObj.steps.map((step, sIdx) => (
                  <div key={sIdx} className="mb-3">
                    <p className="text-xs text-gray-400 mb-1">Step {step.step}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.top_candidates && step.top_candidates.map((cand, cIdx) => (
                        <div 
                          key={cIdx} 
                          className="flex items-center gap-1 px-2 py-1 rounded-lg text-sm border"
                          style={{ 
                            borderColor: cIdx === 0 ? getConfColor(cand.confidence) : '#e5e7eb',
                            backgroundColor: cIdx === 0 ? '#f0fdf4' : '#f9fafb'
                          }}
                        >
                          <span>{cand.char === '<eos>' ? '⌁' : cand.char}</span>
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
      default:
        return renderHomeSection();
    }
  };

  return (
    <MainLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </MainLayout>
  );
}

export default App;
