'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state-management/redux/store';
import { handleLogin } from '@/features/auth/auth.api';
import { buttonStyles, formStyles, inputStyles, linkStyles } from '@/styles/constants';
import { Register } from '@/types/auth';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const values: Register = {
      email: formData.get('email') as string, 
      password: formData.get('password') as string,
    };

    handleLogin({ setLoading, values, push, dispatch });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h1 className="gradient-text">SIGN IN</h1>

      <div className="mb-6">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          style={inputStyles}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          style={inputStyles}
          required
        />
      </div>

      <div className="flex items-center justify-between space-x-4">
        <button type="submit" style={buttonStyles} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <Link href="/register" style={linkStyles}>
          <h1 className="gradient-text">Create account</h1>
        </Link>
      </div>
    </form>
  );
};

export default Login;
