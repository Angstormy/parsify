import { Upload, Loader2 } from 'lucide-react';

export default function UploadSection({ file, loading, onUpload, error }) {
  return (
    <div className="flex flex-col items-center gap-4">
      {error && (
        <div className="w-full max-w-md px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <button
        onClick={onUpload}
        disabled={!file || loading}
        className={`
          flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all
          ${!file 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : loading
              ? 'bg-primary-400 text-white cursor-wait'
              : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5'
          }
        `}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Upload Image
          </>
        )}
      </button>
      
      {file && !loading && (
        <p className="text-sm text-gray-500">
          Ready to process: <span className="font-medium text-gray-700">{file.name}</span>
        </p>
      )}
    </div>
  );
}
