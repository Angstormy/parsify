import { useState } from 'react';
import { BookOpen, Code, Terminal, FileText, Zap, Database, Brain, Cpu } from 'lucide-react';

const docSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: BookOpen,
    content: `Welcome to Parsify - the Ultra-Precision Visual AI Engine.

Parsify is a cutting-edge Optical Character Recognition (OCR) platform specifically designed for handwritten Hindi and English text. Built on advanced transformer architectures, our system achieves unprecedented accuracy in recognizing Devanagari script and Latin characters.

Quick Start:
1. Upload an image of handwritten text
2. Select your language (English or Hindi)
3. Click "Upload Image" to process
4. View the extracted text and diagnostic matrix`
  },
  {
    id: 'architecture',
    title: 'Architecture Overview',
    icon: Cpu,
    content: `Parsify employs a sophisticated three-tier architecture:

1. The React Edge Client
   - Hyper-optimized presentation layer
   - Serializes raw visual data into secure payloads
   - Acts as frictionless bridge between human intent and machine execution

2. The Synaptic Core
   - Lightweight FastAPI microservice
   - Orchestrates PyTorch inference
   - Returns deterministic JSON responses

3. The Knowledge Vault
   - Deep learning models exceeding 2.5GB
   - Stored in Hugging Face LFS
   - Dynamically streamed into volatile memory`
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    icon: Code,
    content: `REST API Endpoints:

POST /predict
- Purpose: Extract text from uploaded image
- Parameters: file (image), lang (english|hindi)
- Response: prediction, detected_lang, engine_view, inference_steps

GET /health
- Purpose: Check system status
- Response: status, timestamp

The API supports both English and Hindi language detection with automatic script identification.`
  },
  {
    id: 'models',
    title: 'ML Models',
    icon: Brain,
    content: `Hindi OCR Engine:
- Architecture: ResNet 50 feature extraction + Transformer decoder
- Training Data: Curated Devanagari datasets
- Accuracy: >98% on benchmark tests
- Optimization: Custom beam search decoding

English OCR Engine:
- Architecture: ResNet 50 + Attention mechanism
- Training Data: IAM Handwriting Database
- Accuracy: >95% on ICDAR benchmarks
- Features: Handling of degraded documents`
  },
  {
    id: 'features',
    title: 'Key Features',
    icon: Zap,
    content: `Multi-Language Support:
- Seamlessly handles Hindi (Devanagari) and English
- Automatic language detection
- Mixed script support

Vector Diagnostic Matrix:
- Step-by-step character recognition analysis
- Confidence scores for each prediction
- Visual attention heatmaps

Engine Vision:
- Debug view showing how AI "sees" documents
- Preprocessing visualization
- Region detection overlays

High Accuracy:
- >95% accuracy on handwritten text
- Ensemble voting for robust predictions
- Continuous model improvement`
  },
  {
    id: 'deployment',
    title: 'Deployment',
    icon: Database,
    content: `Production Infrastructure:

Frontend:
- Platform: Vercel Edge Network
- Framework: React 19 with TailwindCSS v4
- Deployment: Automatic on git push

Backend:
- Platform: Hugging Face Spaces
- Runtime: Docker with GPU support
- API: FastAPI with async handlers

Model Serving:
- Storage: Hugging Face LFS
- Loading: Dynamic on-demand streaming
- Caching: In-memory with LRU eviction`
  }
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState(docSections[0].id);
  const activeDoc = docSections.find(s => s.id === activeSection);

  return (
    <div className="max-w-6xl mx-auto" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
      {/* Sidebar */}
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: '16px',
        padding: '16px',
        border: '1px solid var(--border-subtle)',
        height: 'fit-content'
      }}>
        <h2 style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: 'var(--text-secondary)',
          marginBottom: '12px',
          padding: '0 8px'
        }}>
          Documentation
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {docSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: isActive ? 'var(--accent-glow)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  borderLeft: isActive ? `3px solid var(--accent-primary)` : '3px solid transparent'
                }}
              >
                <Icon size={18} />
                {section.title}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: '16px',
        padding: '32px',
        border: '1px solid var(--border-subtle)',
        minHeight: '500px'
      }}>
        {activeDoc && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <activeDoc.icon size={28} style={{ color: 'var(--accent-primary)' }} />
              <h1 style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)'
              }}>
                {activeDoc.title}
              </h1>
            </div>
            <div style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
              fontSize: '0.95rem'
            }}>
              {activeDoc.content}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
