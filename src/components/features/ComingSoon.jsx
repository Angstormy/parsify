import { Clock, Construction } from 'lucide-react';

export default function ComingSoon({ title, description }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Construction className="w-10 h-10 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title || 'Coming Soon'}</h2>
        <p className="text-gray-500 mb-6">
          {description || 'This feature is under development. Stay tuned for updates!'}
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Expected launch: Q2 2026</span>
        </div>
      </div>
    </div>
  );
}
