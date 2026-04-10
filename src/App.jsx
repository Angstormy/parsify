import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './App.css';

// Dynamic API URL: Use Localhost for dev, Hugging Face for Production
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://127.0.0.1:7860'
  : 'https://angstormy-hindi-ocr-api.hf.space';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [lang, setLang] = useState('hindi');
  const [detectedLang, setDetectedLang] = useState('');
  const fileInputRef = useRef(null);


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

  const [debugImage, setDebugImage] = useState(null);
  const [inferenceSteps, setInferenceSteps] = useState([]);
  const [loaderMessage, setLoaderMessage] = useState('Initializing Engines...');

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
    if (conf > 0.8) return '#10b981'; // Emerald
    if (conf > 0.4) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className="app-container">

      {/* Dynamic Background Elements */}
      <div className="bg-glow object-1"></div>
      <div className="bg-glow object-2"></div>
      <div className="bg-glow object-3"></div>
      <div className="grid-overlay"></div>


      <header className="brand-header">
        <div className="logo-container">
          <div className="logo-glow"></div>
          <img src="/logo.png" alt="Parsify Logo" className="brand-logo" />
          <h1>Parsify<span className="dot">.</span></h1>
        </div>
        <p className="subtitle">The Ultra-Precision Visual AI Engine</p>
      </header>


      <div className="lang-switcher">
        <button 
          className={`lang-pill ${lang === 'hindi' ? 'active' : ''}`}
          onClick={() => setLang('hindi')}
        >
          Hindi
        </button>
        <button 
          className={`lang-pill ${lang === 'english' ? 'active' : ''}`}
          onClick={() => setLang('english')}
        >
          English
        </button>
      </div>

      <div className="upload-card">
        <div 
          className={`upload-zone ${file ? 'has-file' : ''}`}
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
            <div className="empty-state">
              <div className="empty-glow"></div>
              <span className="icon">✧</span>
              <p className="primary-text">Drag & drop or <strong>browse</strong></p>
              <p className="subtext">Supports high-res JPG, PNG, WEBP</p>
            </div>

          ) : (
            <div className="preview-container">
              <div className={`scanning-container ${loading ? 'active' : ''}`}>
                <img src={preview} alt="Selected" className="preview-img" />
                {loading && (
                  <>
                    <div className="scanning-beam"></div>
                    <div className="scanning-glow"></div>
                  </>
                )}
              </div>
              <div className="file-chip">
                <span className="filename">{file.name}</span>
              </div>
            </div>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          onClick={handlePredict} 
          disabled={!file || loading}
          className={loading ? 'loading-btn' : 'action-btn'}
        >
          {loading ? 'Analyzing...' : 'Parse Text'}
        </button>

        {loading && (
          <div className="loader-overlay">
            <div className="apple-aura">
              <div className="aura-disk disk-1"></div>
              <div className="aura-disk disk-2"></div>
              <div className="aura-disk disk-3"></div>
            </div>
            <div className="frost-card">
              <div className="loader-logo-container">
                <img src="/logo.png" className="loader-logo-pulsar" alt="Parsify Loading" />
                <div className="loader-logo-glow"></div>
              </div>
              <div className="loader-text-group">
                <p className="loader-status">{loaderMessage}</p>
                <p className="loader-sub">Parsify Intelligence Engine</p>
              </div>
            </div>
          </div>
        )}

        {debugImage && (
          <div className="debug-container">
            <div className="debug-header">
              <span className="pulse-dot"></span>
              <p className="subtext">Engine Vision Matrix</p>
            </div>
            <div className="img-wrapper">
              <img src={debugImage} alt="Debug Vision" className="debug-img" />
            </div>
          </div>
        )}

        {prediction && (
          <div className="result-card">
            <div className="result-header">
              <div className="label-group">
                <span className="result-label">Extracted Output</span>
                {detectedLang && <span className="lang-badge">{detectedLang}</span>}
              </div>
              <button className="copy-btn" onClick={() => navigator.clipboard.writeText(prediction)}>
                Copy
              </button>
            </div>
            <div className="prediction-text">{prediction}</div>
          </div>
        )}

        {inferenceSteps.length > 0 && (
          <div className="diagnostic-container">
            <div className="debug-header" style={{ marginTop: '2rem' }}>
              <span className="pulse-dot" style={{ backgroundColor: 'var(--secondary)', boxShadow: '0 0 10px var(--secondary)' }}></span>
              <p className="subtext">Vector Diagnostic Matrix</p>
            </div>
            <div className="diagnostic-scroll">
              {inferenceSteps.map((wordObj, wIdx) => (
                <div key={wIdx} className="diagnostic-word-group" style={{ marginBottom: '1rem' }}>
                  <div className="word-label" style={{ color: 'var(--textSecondary)', fontSize: '0.8rem', paddingBottom: '0.5rem' }}>WORD: {wordObj.word}</div>
                  {wordObj.steps && wordObj.steps.map((step, sIdx) => (
                    <div key={`${wIdx}-${sIdx}`} className="diagnostic-step">
                      <div className="step-num">S{step.step}</div>
                      <div className="candidate-list">
                        {step.top_candidates && step.top_candidates.map((cand, cIdx) => (
                          <div key={cIdx} className="candidate-pill" style={{ borderColor: cIdx === 0 ? getConfColor(cand.confidence) : 'transparent' }}>
                            <span className="cand-char">{cand.char === '<eos>' ? '⌁' : cand.char}</span>
                            <span className="cand-conf" style={{ color: getConfColor(cand.confidence) }}>
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

      <footer>
        &copy; 2026 Parsify Intelligence &bull; Powered by Vercel & PyTorch Edge
      </footer>
    </div>
  );
}

export default App;
