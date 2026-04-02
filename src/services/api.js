import axios from 'axios';

const API_URL = 'https://angstormy-hindi-ocr-api.hf.space/predict';

export const apiService = {
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },
};
