import React from 'react';
import { createRoot } from 'react-dom/client';
import AcadChatbot from './components/AcadChatbot';
import ProcessSection from './components/process/ProcessSection';
import Galaxy from './components/Galaxy';

// 1. Interactive WebGL Galaxy Hero Background
const galaxyContainer = document.getElementById('galaxy-root');

if (galaxyContainer) {
  createRoot(galaxyContainer).render(
    <React.StrictMode>
      <Galaxy
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.5}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={240}
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

// 3. Process Section Infographic
const processContainer = document.getElementById('process-root');

if (processContainer) {
  createRoot(processContainer).render(
    <React.StrictMode>
      <ProcessSection />
    </React.StrictMode>
  );
}


