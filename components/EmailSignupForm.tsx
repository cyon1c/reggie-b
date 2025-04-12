'use client';

import { useState } from 'react';

export default function EmailSignupForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <p className="text-white text-xl mb-4">Thanks for subscribing!</p>
        <p className="text-white/80">You'll receive updates about Bloodletter and exclusive content.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-grow px-4 py-3 bg-black/30 border border-primary/50 text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="neon-button text-xl py-3 px-8 whitespace-nowrap"
        >
          {isSubmitting ? 'Subscribing...' : 'Follow Along'}
        </button>
      </div>
      {error && (
        <p className="text-red-500 mt-2 text-center">{error}</p>
      )}
    </form>
  );
} 