import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '2a64fb47216f1c0d6e8b596caf1daba8',
    language: 'ko-KR',
  },
});

export default instance;
