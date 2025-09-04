'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

// Constants for styling to reduce duplication
const INPUT_CLASSES = "relative block w-full border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6";
const BUTTON_CLASSES = "group relative flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

interface FormData {
  email: string;
  password: string;
}

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  className = INPUT_CLASSES
}) => (
  <>
    <label htmlFor={id} className="sr-only">{placeholder}</label>
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </>
);

const Header: React.FC = () => (
  <div className="w-full max-w-md space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
        Sign in to your account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or{' '}
        <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
          create a new account
        </Link>
      </p>
    </div>
  </div>
);

const FormActions: React.FC = () => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
      />
      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
        Remember me
      </label>
    </div>

    <div className="text-sm">
      <Link href="/auth/reset-password" className="font-medium text-blue-600 hover:text-blue-500">
        Forgot your password?
      </Link>
    </div>
  </div>
);

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleFieldChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // TODO: Implement login functionality
    console.log('Login attempt with:', formData);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Header />
      <form className="mt-8 space-y-6 w-full max-w-md" onSubmit={handleSubmit}>
        <div className="-space-y-px rounded-md shadow-sm">
          <InputField
            id="email-address"
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleFieldChange('email')}
            autoComplete="email"
            className={`${INPUT_CLASSES} rounded-t-md`}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleFieldChange('password')}
            autoComplete="current-password"
            className={`${INPUT_CLASSES} rounded-b-md`}
          />
        </div>

        <FormActions />
        
        <button type="submit" className={BUTTON_CLASSES}>
          Sign in
        </button>
      </form>
    </div>
  );
}