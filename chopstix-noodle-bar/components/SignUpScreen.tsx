import React, { useState } from 'react';

interface SignUpScreenProps {
  onSignUpSuccess: () => void;
  onBackToLogin: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUpSuccess, onBackToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    setError('');
    // In a real app, you would make an API call here.
    onSignUpSuccess();
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
            <img src="../chopstix-noodle-bar/components/icons/chopstix_logo_01.png" alt="Chopstix Logo" className="mx-auto h-16 mb-4"/>
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
        </div>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm text-center">{error}</p>}

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email-signup">
              Email Address
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
              id="email-signup"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
           <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-signup">
              Password
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
              id="password-signup"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
              id="confirm-password"
              type="password"
              placeholder="******************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-4">
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
              type="submit"
            >
              Create Account
            </button>
            <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button type="button" className="font-bold text-red-600 hover:text-red-800" onClick={onBackToLogin}>
                    Sign in
                </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpScreen;