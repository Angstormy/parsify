export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">About Parsify</h1>
        <p className="text-gray-500 mt-2">
          The Ultra-Precision Visual AI Engine
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Project Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            Parsify is a cutting-edge Optical Character Recognition (OCR) platform specifically designed 
            for handwritten Hindi and English text. Built on advanced transformer architectures, 
            our system achieves unprecedented accuracy in recognizing Devanagari script and Latin 
            characters, even in challenging handwriting conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Technology Stack</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Backend:</strong> Python with FastAPI, PyTorch for deep learning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Frontend:</strong> React 19 with TailwindCSS v4 for modern UI</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Model:</strong> Custom transformer-based architecture for sequence prediction</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong>Deployment:</strong> Hugging Face Spaces with Vercel frontend</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Language Support</h3>
              <p className="text-sm text-gray-600">Seamlessly handles both Hindi (Devanagari) and English text in a single document.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Vector Diagnostic Matrix</h3>
              <p className="text-sm text-gray-600">Visualize the inference process with step-by-step character recognition analysis.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Debug Vision</h3>
              <p className="text-sm text-gray-600">See exactly how the AI "sees" your document with engine vision output.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">High Accuracy</h3>
              <p className="text-sm text-gray-600">Achieves &gt;95% accuracy on handwritten Hindi text through ensemble voting.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We believe in breaking language barriers through AI. Our mission is to make document 
            digitization accessible to everyone, regardless of the language they write in. By 
            focusing on Indic languages like Hindi, we're building technology that serves 
            billions of people who have been underserved by traditional OCR solutions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Future Roadmap</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Support for additional Indic languages (Marathi, Sanskrit, Nepali)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Real-time handwriting recognition via camera input</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Document layout analysis and table extraction</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Mobile application for on-the-go scanning</span>
            </li>
          </ul>
        </section>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center">
            © 2026 Parsify Intelligence. Built with passion for language technology.
          </p>
        </div>
      </div>
    </div>
  );
}
