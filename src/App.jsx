import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
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

  const handlePredict = async () => {
    if (!file) return;

    setLoading(true);
    setPrediction('');
    setDebugImage(null);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://angstormy-hindi-ocr-api.hf.space/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data.prediction);
      setDebugImage(response.data.debug_image);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic Background Elements */}
      <div className="bg-glow object-1"></div>
      <div className="bg-glow object-2"></div>

      <header>
        <h1>Parsify<span className="dot">.</span></h1>
        <p className="subtitle">The Ultra-Precision Visual AI Engine</p>
      </header>

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
              <span className="icon">✦</span>
              <p className="primary-text">Drag & drop or <strong>browse</strong></p>
              <p className="subtext">Supports high-res JPG, PNG, WEBP</p>
            </div>
          ) : (
            <div className="preview-container">
              <img src={preview} alt="Selected" className="preview-img" />
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
          {loading ? (
            <span className="btn-content">
              <div className="mini-spinner"></div> Analyzing Vectors...
            </span>
          ) : (
            'Parse Text'
          )}
        </button>

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
              <span className="result-label">Extracted Output</span>
              <button className="copy-btn" onClick={() => navigator.clipboard.writeText(prediction)}>
                Copy
              </button>
            </div>
            <div className="prediction-text">{prediction}</div>
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
