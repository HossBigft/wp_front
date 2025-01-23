import { useState, useEffect } from 'react';
import axios from 'axios'; 
import ShowSearchFilter from './ShowSearchFilter'; // Adjust the import based on your project structure
import MovieTable from './MovieTable'; // Adjust the import based on your project structure
import AuthWrapper from './AuthWrapper'; 
const App = () => {
  const [auth, setAuth] = useState(false); // State to manage authentication
  const [filter, setFilter] = useState({});
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Optionally, here you can add more validation for the token, such as checking its expiration
      setAuth(true); // Set auth state to true if token exists in local storage
    } else {
      setAuth(false); // Ensure auth state is false if no token exists
    }
  }, []);

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <AuthWrapper>
      <div>
        <h1>Movie Search</h1>

          <>
            <ShowSearchFilter filter={filter} setFilter={setFilter} setMovies={setMovies} />
            <MovieTable movies={movies} />
          </>
      </div>
    </AuthWrapper>
  );
};

export default App;
