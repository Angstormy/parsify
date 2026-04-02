import { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import PDFViewer from './components/features/PDFViewer';
import ExtractedText from './components/features/ExtractedText';
import UploadSection from './components/features/UploadSection';
import ComingSoon from './components/features/ComingSoon';
import { useOCR } from './hooks/useOCR';
import './styles/globals.css';

function App() {
  const [activeSection, setActiveSection] = useState('ocr');
  const {
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
  } = useOCR();

  const renderSection = () => {
    switch (activeSection) {
      case 'ocr':
        return (
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Hindi OCR Engine</h1>
              <p className="text-gray-500 mt-1">
                Extract text from Hindi documents with ultra-precision
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 h-[500px]">
              <PDFViewer
                file={file}
                preview={preview}
                onFileChange={handleFileChange}
                onDrop={handleDrop}
                onDragOver={() => {}}
                onClear={handleClear}
                fileInputRef={fileInputRef}
              />
              <ExtractedText text={prediction} debugImage={debugImage} />
            </div>

            <UploadSection
              file={file}
              loading={loading}
              onUpload={handlePredict}
              error={error}
            />
          </div>
        );
      case 'sentiment':
        return <ComingSoon title="Sentiment Analysis" description="Analyze sentiment from Hindi text with AI-powered precision." />;
      case 'mepotina':
        return <ComingSoon title="MepotinaTone" description="Advanced tone detection and analysis for Hindi content." />;
      case 'advanced':
        return <ComingSoon title="Advanced Features" description="Premium AI tools for professional Hindi document processing." />;
      case 'adanias':
        return <ComingSoon title="Adanias Settings" description="Configure your Parsify experience." />;
      default:
        return <ComingSoon title="Coming Soon" />;
    }
  };

  return (
    <MainLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </MainLayout>
  );
}

export default App;
