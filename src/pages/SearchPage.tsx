import React, { useEffect, useState, useRef } from 'react';
import './SearchPage.css';
import axios from '../api/axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { useDebounce } from '../hooks/useDebounce';

interface SearchResult {
  id: number;
  backdrop_path: string;
}

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q');
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (debounceSearchTerm) {
      fetchData(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);
  const fetchData = async (searchTerm: string) => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );

      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (searchResults.length > 0) {
    return (
      <div className="search">
        <ImageGrid>
          {searchResults.map((result) => {
            if (!result.backdrop_path) return null;
            return (
              <div key={result.id}>
                <div
                  className="movie-poster"
                  onClick={() => navigate(`/${result.id}`)}
                >
                  <Img
                    src={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
                  />
                </div>
              </div>
            );
          })}
        </ImageGrid>
      </div>
    );
  } else {
    return (
      <section>
        {
          <Span>
            찾고자하는 검색어 "{debounceSearchTerm}" 에 맞는 영화가 없습니다
          </Span>
        }
      </section>
    );
  }
};

export default SearchPage;
const Span = styled.span`
  position: relative;
  top: 350px;
  left: 600px;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  margin-top: 80px;
`;

const Img = styled.img`
  width: 400px;
  height: auto;

  &:hover {
    width: 500px;
  }
`;
