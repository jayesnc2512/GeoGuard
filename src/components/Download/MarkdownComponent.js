// MarkdownComponent.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownComponent = ({ markdownContent }) => {
  return (
    <div className="markdown-container">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;
