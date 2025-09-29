import React from 'react';

interface PlaceholderScreenProps {
  onBack: () => void;
  screenName: string;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ onBack, screenName }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-4 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{screenName}</h1>
        <p className="text-xl text-gray-600 mb-8">This page is coming soon!</p>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PlaceholderScreen;
