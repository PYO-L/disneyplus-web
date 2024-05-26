import './MainPage.css';
import React from 'react';
import Nav from '../components/Nav';

import Banner from '../components/Banner';
import Category from '../components/Category';
import Row from '../components/Row';
import requests from '../api/requests';
import styled from 'styled-components';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row
        title="Romance Movie"
        id="RM"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row title="Action Movie" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movie" id="CM" fetchUrl={requests.fetchComedyMovies} />
    </Container>
  );
};
export default MainPage;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url('/images/home-background.png') center center / cover
      no-repeat fixed;
    content: '';
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
