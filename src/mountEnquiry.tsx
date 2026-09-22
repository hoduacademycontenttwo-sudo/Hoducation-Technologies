import React from 'react';
import { createRoot } from 'react-dom/client';
import AcadChatbot from './components/AcadChatbot';
import ProcessSection from './components/process/ProcessSection';
import Galaxy from './components/Galaxy';
import { Loader } from './components/common/Loader';
import { AcadOSShowcase } from './components/acados/AcadOSShowcase';
import TestimonialsSection from './components/testimonials/TestimonialsSection';

// 0. Smooth 3D Cube Preloader (Exact React Component from Blog & Contact)
const preloaderContainer = document.getElementById('site-preloader-root');
if (preloaderContainer) {
  const PreloaderApp: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999999,
        }}
      >
        <Loader variant="black" fullscreen maskBg="#ffffff" />
      </div>
    );
  };

  createRoot(preloaderContainer).render(<PreloaderApp />);
}

// 1. Interactive WebGL Galaxy Hero Background
const galaxyContainer = document.getElementById('galaxy-root');

if (galaxyContainer) {
  createRoot(galaxyContainer).render(
    <React.StrictMode>
      <Galaxy
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.1}
        glowIntensity={0.25}
        saturation={0.0}
        hueShift={0}
        starScale={0.55}
        twinkleIntensity={0.3}
        starSpeed={0.4}
        speed={1.0}
        transparent={false}
      />
    </React.StrictMode>
  );
}

// 2. Chatbot Floating Widget
const chatbotContainer = document.getElementById('chatbot-root');

if (chatbotContainer) {
  createRoot(chatbotContainer).render(
    <React.StrictMode>
      <AcadChatbot />
    </React.StrictMode>
  );
}

// 3. AcadOS Product Ecosystem Showcase
const acadosContainer = document.getElementById('acados-root');

if (acadosContainer) {
  createRoot(acadosContainer).render(
    <React.StrictMode>
      <AcadOSShowcase />
    </React.StrictMode>
  );
}

// 4. Process Section Infographic
const processContainer = document.getElementById('process-root');

if (processContainer) {
  createRoot(processContainer).render(
    <React.StrictMode>
      <ProcessSection />
    </React.StrictMode>
  );
}

// 5. Testimonials Section (Trusted By Organizations)
const testimonialsContainer = document.getElementById('testimonials-root');

if (testimonialsContainer) {
  createRoot(testimonialsContainer).render(
    <React.StrictMode>
      <TestimonialsSection />
    </React.StrictMode>
  );
}

