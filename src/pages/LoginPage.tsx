import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [passWord, setPassWord] = useState<string>('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('username', userName);
    localStorage.setItem('password', passWord);
    navigate('/main');
  };
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');
  useEffect(() => {
    if (storedUsername && storedPassword) {
      navigate('/main');
    }
  }, [storedUsername, storedPassword]);

  return (
    <div className="login">
      <img
        className="login-img"
        src="/images/login-background.jpg"
        alt="backImg"
      />
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group password-group">
          <input
            className="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassWord(e.target.value)}
            required
          />
        </div>
        <button className="login-btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
