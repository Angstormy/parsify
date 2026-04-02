import axios from 'axios';

const API_URL = 'https://angstormy-hindi-ocr-api.hf.space/predict';

export const apiService = {
  uploadFile: async (file, lang = 'auto') => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(
      `https://angstormy-hindi-ocr-api.hf.space/predict?lang=${lang}`, 
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    
    return response.data;
  }
};
