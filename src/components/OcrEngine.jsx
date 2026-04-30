import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { UploadCloud, FileImage, Copy, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import DiagnosticMatrix from './DiagnosticMatrix';

const API_BASE = 'https://angstormy-hindi-ocr-api.hf.space';

const OcrEngine = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [lang, setLang] = useState('hindi');
  const [detectedLang, setDetectedLang] = useState('');
  const [debugImage, setDebugImage] = useState(null);
  const [inferenceSteps, setInferenceSteps] = useState([]);
  const [copied, setCopied] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'online', 'offline'
  const [loaderMessage, setLoaderMessage] = useState('Initializing Engines...');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const statusMessages = [
    'Initializing AI Experts...',
    'Analyzing Vector Gradients...',
    'Consulting Devanagari Master...',
    'Auditing Lexicon Dictionary...',
    'Finalizing Consensus...'
  ];

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await axios.get(API_BASE, { timeout: 5000 });
        setApiStatus('online');
      } catch (err) {
        if (err.response) {
          setApiStatus('online');
        } else {
          setApiStatus('offline');
        }
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const hindiMessages = [
    'Initializing Devanagari Core...',
    'Analyzing Vector Gradients...',
    'Consulting Devanagari Master...',
    'Auditing Hindi Lexicon...',
    'Finalizing Consensus...'
  ];

  const englishMessages = [
    'Initializing TrOCR Vision...',
    'Analyzing Latin Cursive...',
    'Mapping Stroke Vectors...',
    'Consulting Oxford Engine...',
    'Decoding Neural Tokens...'
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      const messages = lang === 'hindi' ? hindiMessages : englishMessages;
      let idx = 0;
      setLoaderMessage(messages[0]);
      interval = setInterval(() => {
        idx = (idx + 1) % messages.length;
        setLoaderMessage(messages[idx]);
      }, 2200);
    }
    return () => clearInterval(interval);
  }, [loading, lang]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setPrediction('');
      setError('');
      setDebugImage(null);
      setInferenceSteps([]);
    }
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
      setError(err.response?.data?.detail || 'Failed to process image. Make sure the API server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prediction);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="engine-zone" className="section" style={{ position: 'relative', zIndex: 10, padding: isMobile ? '40px 0' : 'var(--section-padding)' }}>
      <div className="bg-gradient-blue"></div>
      
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '48px' }}>
          <h2 style={{ fontSize: isMobile ? '1.75rem' : '2.5rem', marginBottom: '16px' }}>Interactive Engine Core</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Upload an image and watch the neural network decode handwriting in real-time.</p>
        </div>

        {/* API Status Bar */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          background: 'var(--bg-surface)', 
          padding: '12px 20px', 
          borderRadius: '12px', 
          border: '1px solid var(--border-subtle)',
          marginBottom: '32px',
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: apiStatus === 'online' ? '#10b981' : apiStatus === 'checking' ? '#f59e0b' : '#ef4444',
              boxShadow: `0 0 10px ${apiStatus === 'online' ? '#10b981' : apiStatus === 'checking' ? '#f59e0b' : '#ef4444'}`,
              animation: apiStatus === 'checking' ? 'pulse-status 1.5s infinite' : 'none'
            }}></div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Neural Interface: {apiStatus.charAt(0).toUpperCase() + apiStatus.slice(1)}
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: isMobile ? '0' : 'auto', opacity: 0.7, fontFamily: 'monospace' }}>
            ocr-api.hf.space
          </span>
        </div>

        <div style={{ padding: isMobile ? '24px 16px' : '40px', display: 'flex', flexDirection: 'column', gap: isMobile ? '24px' : '32px', background: 'var(--bg-surface)', borderRadius: '24px', border: '1px solid var(--border-subtle)' }}>
          
          {/* Language Toggle */}
          <div style={{ display: 'flex', background: 'var(--border-glow)', borderRadius: '12px', padding: '6px', alignSelf: 'stretch' }}>
            <button 
              onClick={() => setLang('hindi')}
              style={{
                flex: 1, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s',
                background: lang === 'hindi' ? 'var(--accent-primary)' : 'transparent',
                color: lang === 'hindi' ? '#000' : 'var(--text-secondary)',
                fontSize: '0.9rem'
              }}
            >Hindi</button>
            <button 
              onClick={() => setLang('english')}
              style={{
                flex: 1, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s',
                background: lang === 'english' ? 'var(--accent-primary)' : 'transparent',
                color: lang === 'english' ? '#000' : 'var(--text-secondary)',
                fontSize: '0.9rem'
              }}
            >English</button>
          </div>

          {/* Upload Zone */}
          <div 
            onClick={() => !loading && fileInputRef.current.click()}
            style={{
              border: `2px dashed ${preview ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
              borderRadius: '20px', padding: isMobile ? '32px 16px' : '48px', textAlign: 'center', cursor: loading ? 'default' : 'pointer',
              background: preview ? 'var(--accent-glow)' : 'transparent',
              transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden'
            }}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
            
            {!preview ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: isMobile ? '60px' : '80px', height: isMobile ? '60px' : '80px', borderRadius: '50%', background: 'var(--bg-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-subtle)' }}>
                  <UploadCloud size={isMobile ? 30 : 40} color="var(--text-secondary)" />
                </div>
                <div>
                  <h4 style={{ fontSize: isMobile ? '1.1rem' : '1.25rem', marginBottom: '8px' }}>Tap to upload image</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Supports JPG, PNG, WEBP</p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)', width: '100%', maxHeight: '300px', background: 'rgba(0,0,0,0.2)' }}>
                  <img src={preview} alt="Selected" style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-hover)', padding: '6px 12px', borderRadius: '999px', border: '1px solid var(--border-subtle)' }}>
                  <FileImage size={16} color="var(--accent-primary)" />
                  <span style={{ fontSize: '0.75rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', borderRadius: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <button 
            onClick={handlePredict} 
            disabled={!file || loading}
            className={`btn-primary ${loading ? 'btn-loading' : ''}`}
            style={{ width: '100%', padding: '16px', fontSize: '1rem', position: 'relative', overflow: 'hidden' }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                <div className="button-spinner"></div>
                <span style={{ fontSize: isMobile ? '0.85rem' : '1rem' }}>{loaderMessage}</span>
              </div>
            ) : (
              'Parse Text'
            )}
          </button>
          
        </div>

        {/* Results Area */}
        {prediction && (
          <div className="glass-panel" style={{ marginTop: '32px', padding: isMobile ? '20px' : '32px', borderLeft: '4px solid var(--accent-primary)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexDirection: isMobile ? 'column' : 'row', gap: '12px', alignItems: isMobile ? 'flex-start' : 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Extracted Output</span>
                {detectedLang && <span style={{ fontSize: '0.7rem', background: 'var(--accent-glow)', color: 'var(--accent-primary)', padding: '2px 8px', borderRadius: '999px', border: '1px solid var(--accent-primary)' }}>{detectedLang}</span>}
              </div>
              <button onClick={handleCopy} style={{ background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', fontSize: '0.85rem', width: isMobile ? '100%' : 'auto', justifyContent: 'center' }}>
                {copied ? <CheckCircle2 size={16} color="var(--accent-primary)" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy Text'}
              </button>
            </div>
            <div style={{ fontSize: isMobile ? (lang === 'hindi' ? '2.5rem' : '2.25rem') : (lang === 'hindi' ? '2.25rem' : '1.75rem'), lineHeight: 1.4, color: 'var(--text-primary)', wordBreak: 'break-word', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              {prediction}
            </div>
          </div>
        )}

        {/* Debug Matrix Area */}
        {(debugImage || inferenceSteps.length > 0) && (
          <div style={{ marginTop: '48px' }}>
            <h3 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ChevronRight size={isMobile ? 20 : 24} color="var(--accent-secondary)" />
              System Diagnostics
            </h3>
            
            {debugImage && (
              <div className="glass-panel" style={{ padding: isMobile ? '16px' : '24px', marginBottom: '32px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Vision Engine Checkpoint</h4>
                <img src={debugImage} alt="Debug Matrix" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-subtle)' }} />
              </div>
            )}

            {inferenceSteps.length > 0 && <DiagnosticMatrix steps={inferenceSteps} />}
          </div>
        )}
        
      </div>
    </section>
  );
};

export default OcrEngine;
