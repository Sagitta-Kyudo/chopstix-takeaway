import React from 'react';
import { FacebookIcon, InstagramIcon, PinterestIcon, TwitterIcon, YoutubeIcon } from './icons/SocialIcons';

interface FooterProps {
    onNavigate: (screen: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const footerLinks = [
    { name: 'Delivery Information', screen: 'Delivery Information' },
    { name: 'Opening Times', screen: 'Opening Times' },
    { name: 'Allergy Information', screen: 'Allergy Information' },
    { name: 'Privacy Policy', screen: 'Privacy Policy' },
    { name: 'Terms of Use', screen: 'Terms of Use' },
    { name: 'About Cookies', screen: 'About Cookies' },
  ];

  return (
    <footer className="bg-gray-200 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-6">
          {footerLinks.map(link => (
            <button key={link.name} onClick={() => onNavigate(link.screen)} className="text-left text-gray-600 hover:text-red-600">
              {link.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <a href="#" aria-label="Get it on Google Play">
            <img src="https://www.chopstixbasingstoke.co.uk/images/google_play.png" alt="Google Play" className="h-12"/>
          </a>
          <a href="#" aria-label="Download on the App Store">
            <img src="https://www.chopstixbasingstoke.co.uk/images/app_store.png" alt="App Store" className="h-12"/>
          </a>
        </div>
        
        <div className="flex justify-center space-x-6 mb-6">
            <a href="#" aria-label="Pinterest"><PinterestIcon className="h-6 w-6 text-gray-600 hover:text-red-600" /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon className="h-6 w-6 text-gray-600 hover:text-red-600" /></a>
            <a href="#" aria-label="Twitter"><TwitterIcon className="h-6 w-6 text-gray-600 hover:text-red-600" /></a>
            <a href="#" aria-label="Facebook"><FacebookIcon className="h-6 w-6 text-gray-600 hover:text-red-600" /></a>
            <a href="#" aria-label="YouTube"><YoutubeIcon className="h-6 w-6 text-gray-600 hover:text-red-600" /></a>
        </div>

        <div className="flex justify-center mb-6">
            <img src="https://www.chopstixbasingstoke.co.uk/images/cards.png" alt="Payment methods" className="h-8"/>
        </div>
        
        <div className="text-center text-xs text-gray-600 space-y-1">
          <p>Chopstix Chinese Takeaway @2022 All Rights Reserved</p>
          <p>4 Queens Parade, New Street, Basingstoke RG21 7DA</p>
          <p>Powered by DolbynEats, <a href="http://www.dolbyncomputers.com" target="_blank" rel="noopener noreferrer" className="underline">www.dolbyncomputers.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
