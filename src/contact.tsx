import React from 'react';
import ReactDOM from 'react-dom/client';
import ContactPage from './components/contact/ContactPage';
import './index.css';

const rootEl = document.getElementById('contact-root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <ContactPage />
    </React.StrictMode>
  );
}
