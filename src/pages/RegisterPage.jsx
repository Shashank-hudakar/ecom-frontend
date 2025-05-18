import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      navigate('/login', { 
        state: { message: 'Registration successful! Please login to continue.' }
      });
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    // Implement social registration logic here
    console.log(`Registering with ${provider}`);
  };

  // Add animation keyframes once on mount
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes =
      `@keyframes fadeIn {
         from { opacity: 0; transform: translateY(-20px); }
         to { opacity: 1; transform: translateY(0); }
       }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, []);

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Please fill in your details to sign up</p>
        </div>

        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your full name"
              required
              minLength={2}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Create a password"
              required
              minLength={8}
            />
            <p style={styles.passwordHint}>
              Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character
            </p>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div style={styles.termsCheckbox}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" required style={styles.checkbox} />
              <span>
                I agree to the{' '}
                <Link to="/terms" style={styles.link}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" style={styles.link}>
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isLoading && styles.buttonLoading)
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>or sign up with</span>
        </div>

        <div style={styles.socialButtons}>
          <button 
            style={styles.socialButton}
            onClick={() => handleSocialRegister('Google')}
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              style={styles.socialIcon}
            />
            Google
          </button>
          <button 
            style={styles.socialButton}
            onClick={() => handleSocialRegister('Facebook')}
          >
            <img 
              src="https://www.facebook.com/favicon.ico" 
              alt="Facebook" 
              style={styles.socialIcon}
            />
            Facebook
          </button>
        </div>

        <div style={styles.switchLink}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageBackground: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  container: {
    width: '100%',
    maxWidth: '420px',
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 0.5s ease-out',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
  },
  errorMessage: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1.5px solid #e5e7eb',
    fontSize: '15px',
    transition: 'all 0.2s',
    outline: 'none',
    '&:focus': {
      borderColor: '#667eea',
      boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.1)',
    },
  },
  passwordHint: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '4px',
  },
  termsCheckbox: {
    marginTop: '8px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '14px',
    color: '#4b5563',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: '1.5px solid #e5e7eb',
    cursor: 'pointer',
    marginTop: '2px',
  },
  button: {
    background: '#667eea',
    color: 'white',
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      background: '#5a6fd6',
    },
    '&:disabled': {
      background: '#a5b4f3',
      cursor: 'not-allowed',
    },
  },
  buttonLoading: {
    opacity: 0.7,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    '&::before, &::after': {
      content: '""',
      flex: 1,
      borderBottom: '1px solid #e5e7eb',
    },
  },
  dividerText: {
    padding: '0 10px',
    color: '#6b7280',
    fontSize: '14px',
  },
  socialButtons: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  socialButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    borderRadius: '10px',
    border: '1.5px solid #e5e7eb',
    background: 'white',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      background: '#f9fafb',
      borderColor: '#d1d5db',
    },
  },
  socialIcon: {
    width: '20px',
    height: '20px',
  },
  switchLink: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#4b5563',
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default RegisterPage;
