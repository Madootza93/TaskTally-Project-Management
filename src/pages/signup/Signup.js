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
  const [isFormVisible, setIsFormVisible] = useState(true); 
  const { signup, isPending, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormVisible(false);
  };
  
  useEffect(() => {
    const handleSignup = async () => {
      try {
        await signup(email, password, displayName, thumbnail);
        navigate('/', { state: { message: 'Successfully created account!' } });
      } catch (error) {
        setIsFormVisible(true);
      }
    };

    if (!isFormVisible) {
      handleSignup();
    }
  }, [email, password, displayName, thumbnail, signup, navigate, isFormVisible]);

 

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