import React, { useState, useEffect } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

// Import styles
import './Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true); 
  const { signup, isPending, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsFormVisible(false);

    if (!isPasswordValid(password)) {
      setPasswordError('Password must be 8-20 characters, containing at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    try {
      await signup(email, password, displayName, thumbnail);
      navigate('/', { state: { message: 'Successfully created account!' } });
    } catch (error) {
      setIsFormVisible(true);
    }
  };

  useEffect(() => {
    if (!isFormVisible) {
      setIsFormVisible(true);
    }
  }, [isFormVisible]);

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError('Please select a file!');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image.');
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb.');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log('Thumbnail updated!');
  };

  // Password validation function
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,20}$/;
    return passwordRegex.test(password);
  };

  return (
    <>
      {isFormVisible && (
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <label>
            <span>Email:</span>
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>

          <label>
            <span>Password:</span>
            <input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {passwordError && <div className="error">{passwordError}</div>}
          </label>

          <label>
            <span>Display name:</span>
            <input
              required
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </label>

          <label>
            <span>Profile thumbnail:</span>
            <input
              required
              type="file"
              onChange={handleFileChange}
            />
            {thumbnailError && <div className="error">{thumbnailError}</div>}
          </label>
          {!isPending && (
            <button type="submit" className="btn">
              Sign up
            </button>
          )}
          {isPending && (
            <button disabled className="btn">
              Loading...
            </button>
          )}
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </>
  );
}
