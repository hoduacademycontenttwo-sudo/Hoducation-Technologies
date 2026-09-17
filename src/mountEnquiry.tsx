import React from 'react';
import { createRoot } from 'react-dom/client';
import AcadChatbot from './components/AcadChatbot';
import ProcessSection from './components/process/ProcessSection';

const chatbotContainer = document.getElementById('chatbot-root');

if (chatbotContainer) {
  createRoot(chatbotContainer).render(
    <React.StrictMode>
      <AcadChatbot />
    </React.StrictMode>
  );
}

const processContainer = document.getElementById('process-root');

if (processContainer) {
  createRoot(processContainer).render(
    <React.StrictMode>
      <ProcessSection />
    </React.StrictMode>
  );
}

