import React from 'react';

// Simple Spinner Loading
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
