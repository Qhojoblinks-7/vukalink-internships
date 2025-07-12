import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'orange', 
  text = 'Loading...',
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    orange: 'border-orange-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    gray: 'border-gray-500',
    white: 'border-white'
  };

  const spinner = (
    <div className="flex flex-col items-center space-y-4">
      <div className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}></div>
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;