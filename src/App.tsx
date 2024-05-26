import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Nav from './components/Nav';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import React from 'react';

const Layout: React.FC = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
