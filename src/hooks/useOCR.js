import { useState, useRef, useCallback } from 'react';
import { apiService } from '../services/api';

export function useOCR(lang) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [debugImage, setDebugImage] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback((selectedFile) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setPrediction('');
    setDebugImage(null);
    setError('');
  }, []);

  const handleDrop = useCallback((droppedFile) => {
    setFile(droppedFile);
    setPreview(URL.createObjectURL(droppedFile));
    setPrediction('');
    setDebugImage(null);
    setError('');
  }, []);

  const handleClear = useCallback(() => {
    setFile(null);
    setPreview(null);
    setPrediction('');
    setDebugImage(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handlePredict = useCallback(async () => {
    if (!file) return;

    setLoading(true);
    setPrediction('');
    setDebugImage(null);
    setError('');

    try {
      const data = await apiService.uploadFile(file, lang);
      setPrediction(data.prediction);
      setDebugImage(data.engine_view);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to process image');
    } finally {
      setLoading(false);
    }
  }, [file, lang]);

  return {
    file,
    preview,
    loading,
    prediction,
    debugImage,
    error,
    fileInputRef,
    handleFileChange,
    handleDrop,
    handleClear,
    handlePredict,
  };
}
