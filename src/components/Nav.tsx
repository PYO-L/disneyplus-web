import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav: React.FC = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pathname === '/search') {
      if (searchInputRef.current) searchInputRef.current.focus();
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    setSearchValue(newValue);
    navigate(`/search?q=${newValue}`);
  };

  const username = localStorage.getItem('username') || '';
  return (
    <NavWrapper show={show}>
      <Logo
        onClick={() => {
          setSearchValue('');
          navigate('/main');
        }}
      >
        <img alt="Disney Plus Logo" src="/images/logo.svg" />
      </Logo>
      {pathname === '/' ? (
        <Login>Login</Login>
      ) : (
        <Input
          ref={searchInputRef}
          value={searchValue}
          onChange={searchOnChange}
          className="nav-input"
          type="text"
          placeholder="검색"
        />
      )}
      <Profile>{username}</Profile>
    </NavWrapper>
  );
};
export default Nav;

const Profile = styled.span`
  letter-spacing: 2px;
  border: 1px solid #f9f9f9;
  padding: 8px;
`;
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;
const NavWrapper = styled.nav<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? '#090b13' : 'transparent')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 1000;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;
