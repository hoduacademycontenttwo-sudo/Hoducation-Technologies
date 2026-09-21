import React from 'react';
import ReactDOM from 'react-dom/client';
import BlogIndexPage from './components/blog/BlogIndexPage';
import './index.css';
import '../styles.css';

const rootEl = document.getElementById('blog-root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <BlogIndexPage />
    </React.StrictMode>
  );
}
