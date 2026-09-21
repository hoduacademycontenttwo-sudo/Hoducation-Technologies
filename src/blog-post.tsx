import React from 'react';
import ReactDOM from 'react-dom/client';
import BlogPostPage from './components/blog/BlogPostPage';
import './index.css';
import '../styles.css';

const rootEl = document.getElementById('blog-post-root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <BlogPostPage />
    </React.StrictMode>
  );
}
