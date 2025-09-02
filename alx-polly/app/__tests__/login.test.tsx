import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../auth/login/page';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('LoginPage', () => {
  it('renders the login form', () => {
    render(<LoginPage />);
    
    expect(screen.getByRole('heading', { name: /sign in to your account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('updates email and password state when inputs change', () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('calls handleSubmit when form is submitted', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));
    
    expect(consoleSpy).toHaveBeenCalledWith('Login attempt with:', {
      email: 'test@example.com',
      password: 'password123',
    });
    
    consoleSpy.mockRestore();
  });

  it('has links to register and reset password pages', () => {
    render(<LoginPage />);
    
    const registerLink = screen.getByRole('link', { name: /create a new account/i });
    const resetPasswordLink = screen.getByRole('link', { name: /forgot your password/i });
    
    expect(registerLink).toHaveAttribute('href', '/auth/register');
    expect(resetPasswordLink).toHaveAttribute('href', '/auth/reset-password');
  });
});