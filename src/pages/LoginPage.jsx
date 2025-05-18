import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Logging in with ${provider}`);
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
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Please enter your details to sign in</p>
        </div>

        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <div style={styles.formFooter}>
            <label style={styles.rememberMe}>
              <input type="checkbox" style={styles.checkbox} />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" style={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isLoading && styles.buttonLoading)
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>or continue with</span>
        </div>

        <div style={styles.socialButtons}>
          <button 
            style={styles.socialButton}
            onClick={() => handleSocialLogin('Google')}
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
            onClick={() => handleSocialLogin('Facebook')}
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
          Don't have an account?{' '}
          <Link to="/register" style={styles.link}>
            Sign up
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
  formFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#4b5563',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: '1.5px solid #e5e7eb',
    cursor: 'pointer',
  },
  forgotPassword: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'underline',
    },
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

export default LoginPage;
