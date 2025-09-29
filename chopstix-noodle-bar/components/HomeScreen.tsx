import React, { useState, useEffect } from 'react';
import { Screen } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: Screen | string) => void;
}

const carouselImages = [
    "https://images.unsplash.com/photo-1523294587484-bae6cc872010?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563245372-f2172403856d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1557688204-206f45eacd2e?q=80&w=2070&auto=format&fit=crop",
];

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

  return (
    <div className="bg-white">
      {/* Welcome Message */}
      <div className="bg-teal-50 border-b border-teal-200 text-center py-2">
        <p className="text-sm text-teal-800">to Chopstix online ordering website 😄🥢🍺</p>
      </div>

      {/* Hero Carousel */}
      <div className="relative w-full h-64 md:h-96 bg-gray-200 overflow-hidden">
        {carouselImages.map((src, index) => (
             <img 
                key={src}
                src={src} 
                alt="Delicious Chinese food" 
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            />
        ))}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <button onClick={() => onNavigate('menu')} className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-md shadow-lg transform hover:scale-105 transition-transform">
            ORDER YOUR FOOD NOW
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, index) => (
                <div key={index} className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
            ))}
        </div>
      </div>

      {/* Promo Section */}
      <div className="bg-red-800 text-white p-6 my-8 mx-4 rounded-lg shadow-xl text-center">
        <img src="../chopstix-noodle-bar/components/icons/chopstix_logo_01.png" alt="Chopstix Logo" className="mx-auto mb-4 w-48"/>
        <p className="text-2xl font-bold tracking-wider">01256 477770 / 0777 1681688</p>
        <div className="bg-yellow-400 text-black text-sm font-semibold p-2 rounded-md my-4 max-w-sm mx-auto">
            4 QUEENS PARADE, NEW STREET, BASINGSTOKE RG21 7DA
        </div>
        <button onClick={() => onNavigate('menu')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transform hover:scale-105 transition-transform">
            ORDER ONLINE
        </button>
      </div>

      <img src="https://images.unsplash.com/photo-1596560544243-e31998c0de6b?q=80&w=1974&auto=format&fit=crop" alt="Fried rice dish" className="w-full h-auto"/>

      {/* Allergy Advice */}
      <div className="bg-red-800 text-white p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">ALLERGY ADVICE</h2>
        <p className="max-w-2xl mx-auto mb-4 text-sm">
            Most of our dishes contain garlic, soya, gluten, cooking wine, sesame oil if you have any allergies to these products, please inform us before before ordering.
        </p>
        <p className="max-w-2xl mx-auto mb-6 text-sm">
            Please press the button below to find out allergy alerts of each of our dishes!! If you have further enquiries, please talk to a member of our staff. Your health is our paramount importance
        </p>
        <button onClick={() => onNavigate('Allergy Information')} className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-md shadow-lg transform hover:scale-105 transition-transform">
            ALLERGY DETAILS
        </button>
      </div>

      <img src="https://images.unsplash.com/photo-1626700051185-3f4a91228969?q=80&w=1974&auto=format&fit=crop" alt="Takeaway containers" className="w-full h-auto"/>

       {/* About Text */}
      <div className="bg-gray-100 p-6 text-sm text-gray-700">
        <div className="max-w-3xl mx-auto space-y-4">
          <p>
            Chopstix Chinese Takeaway serves variety of delicious Chinese dishes. We're passionate about delivering hot, great tasting, freshly prepared Chinese food to our customers.
          </p>
          <p>
            We are proud to be the leading local Chinese Takeaway agreed by many customers. We hope that you will enjoy the perfect authentic Chinese cuisine and we welcome any feedback that you wish to make.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;