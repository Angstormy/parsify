const teamMembers = [
  {
    name: 'Atharva',
    role: 'Hindi ML Specialist',
    description: 'Architected and trained the Hindi language OCR model using transformer-based approaches. Fine-tuned the model on Devanagari script datasets to achieve high accuracy in recognizing complex Hindi characters and ligatures.',
    image: null
  },
  {
    name: 'Omkar',
    role: 'Frontend Developer',
    description: 'Designed and built the entire user interface for Parsify, creating an intuitive document upload system and real-time text visualization. Implemented responsive design patterns ensuring seamless experience across all devices.',
    image: null
  },
  {
    name: 'Shirish',
    role: 'Backend & DevOps Engineer',
    description: 'Developed the robust API infrastructure powering Parsify and managed cloud deployments. Built scalable microservices architecture and established CI/CD pipelines for reliable model serving and application delivery.',
    image: null
  },
  {
    name: 'Shivansh',
    role: 'English ML Specialist',
    description: 'Led the English language OCR model training, implementing state-of-the-art text recognition algorithms. Optimized the model for handling diverse document formats including printed text and handwritten annotations.',
    image: null
  }
];

export default function TeamMembers() {
  return (
    <div className="h-screen flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Meet Our Team</h1>
        <p className="text-gray-500 mt-1">
          The brilliant minds powering Parsify's intelligent document recognition
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map((member) => (
          <div 
            key={member.name}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-all h-auto"
          >
            <div className="flex items-start gap-4">
              {/* Profile Photo */}
              <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center overflow-hidden border-2 border-primary-50">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl md:text-2xl font-bold text-primary-600">{member.name[0]}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-xs md:text-sm font-semibold text-primary-600 mb-2">
                  {member.role}
                </p>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
