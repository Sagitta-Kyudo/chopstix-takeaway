import React, { useState } from 'react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onForgotPassword: () => void;
  onNavigateToSignUp: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onForgotPassword, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation - for demonstration purposes
    if (email === 'test@example.com' && password === 'password') {
      setError('');
      alert('Login successful!');
      onLoginSuccess();
    } else {
      setError('Invalid email or password. (Hint: test@example.com / password)');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
            <img src="https://drive.google.com/uc?export=view&id=15qfqz9QmkalRbHFAUFsGuP3D-tHNriyJ" alt="Chopstix Logo" className="mx-auto h-16 mb-4"/>
            <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
        </div>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-baseline">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <button
                    type="button"
                    onClick={onForgotPassword}
                    className="inline-block align-baseline font-bold text-sm text-red-600 hover:text-red-800"
                >
                    Forgot Password?
                </button>
            </div>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-4">
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
              type="submit"
            >
              Sign In
            </button>
            <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button type="button" className="font-bold text-red-600 hover:text-red-800" onClick={onNavigateToSignUp}>
                    Sign up
                </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;