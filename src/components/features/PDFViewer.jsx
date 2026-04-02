import { Upload, FileImage, X } from 'lucide-react';

export default function PDFViewer({ file, preview, onFileChange, onDrop, onDragOver, onClear, fileInputRef }) {
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onDrop(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragOver();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-lg font-semibold text-gray-900">Original</h2>
        <p className="text-sm text-gray-500 mt-0.5">Upload or drag your document</p>
      </div>

      <div className="flex-1 p-6">
        {!preview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="h-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              hidden
              accept="image/*,.pdf"
            />
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
              <Upload className="w-8 h-8 text-primary-500" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">
              Drop your file here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Supports PDF, JPG, PNG, WEBP up to 10MB
            </p>
          </div>
        ) : (
          <div className="relative h-full">
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <button
                onClick={onClear}
                className="w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            {file?.type?.startsWith('image/') ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain rounded-xl border border-gray-100"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
                  <FileImage className="w-10 h-10 text-red-500" />
                </div>
                <p className="text-sm font-medium text-gray-900">{file?.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {(file?.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
