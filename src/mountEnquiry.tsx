import React from 'react';
import { createRoot } from 'react-dom/client';
import AcadChatbot from './components/AcadChatbot';
import ProcessSection from './components/process/ProcessSection';
import Galaxy from './components/Galaxy';

import { AcadOSShowcase } from './components/acados/AcadOSShowcase';

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
