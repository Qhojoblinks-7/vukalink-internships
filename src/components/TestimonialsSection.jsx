// src/components/TestimonialsSection.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import star icon for ratings

function TestimonialsSection() {
  // Placeholder data for testimonials and company logos
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Ndlovu',
      title: 'Computer Science Graduate',
      quote: 'After months of frustrating job searches, VukaLink connected me to my dream internship at a tech startup within just two weeks. The platform was incredibly easy to use!',
      rating: 5,
      image: '/avatar-sarah.png', // Placeholder for Sarah's image
    },
    {
      id: 2,
      name: 'David Moyo',
      title: 'Engineering Student',
      quote: 'The personalized recommendations were spot-on! I secured an industrial attachment that perfectly matched my skills and career aspirations. VukaLink made the entire process stress-free.',
      rating: 5,
      image: '/avatar-david.png', // Placeholder for David's image
    },
    {
      id: 3,
      name: 'Tanaka Mhere',
      title: 'Business Administration Graduate',
      quote: 'The resources and interview preparation guides gave me the confidence I needed. I\'m now working at one of the top financial institutions thanks to VukaLink\'s platform.',
      rating: 5,
      image: '/avatar-tanaka.png', // Placeholder for Tanaka's image
    },
  ];

  const companyLogos = [
    '/logo-microsoft.png', // Placeholder for Microsoft-like logo
    '/logo-google.png',    // Placeholder for Google-like logo
    '/logo-apple.png',     // Placeholder for Apple-like logo
    '/logo-ibm.png',       // Placeholder for IBM-like logo
    '/logo-slack.png',     // Placeholder for Slack-like logo
    // Add more logos as needed
  ];

  return (
    <section className="bg-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from students who have successfully launched their careers with VukaLink.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-blue-500"
              />
              <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-blue-600 text-sm mb-3">{testimonial.title}</p>
              <div className="flex text-yellow-400 mb-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <FaStar key={i} className="h-5 w-5" />
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>

        {/* Trusted by Companies Logos */}
        <div className="text-center mb-8 bg-white w-full py-8 px-4 rounded-lg shadow-md">
          <p className="text-lg text-gray-00 mb-8">Trusted by leading companies across industries</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-75">
            {companyLogos.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Company Logo ${index + 1}`}
                className="h-8 md:h-10 lg:h-12 object-contain filter grayscale hover:grayscale-0 transition-filter duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;