import { useState } from 'react';
import Login from './Login'; 
import ShowSearchFilter from './ShowSearchFilter'; 
import MovieTable from './MovieTable'; 

const App = () => {
  const [auth, setAuth] = useState(null); 
  const [filter, setFilter] = useState({});
  const [movies, setMovies] = useState([]);

  return (
    <div>
      <h1>Movie Search</h1>
      {auth ? (
        <>
          <ShowSearchFilter filter={filter} setFilter={setFilter} setMovies={setMovies} />
          <MovieTable movies={movies} />
        </>
      ) : (
        <Login setAuth={setAuth} />
      )}
    </div>
  );
};

export default App;