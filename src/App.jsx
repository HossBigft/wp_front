import { useState } from 'react';
import axios from 'axios';

// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:8000';

const ShowSearchFilter = ({ filter, setFilter, setMovies }) => {
  const [title, setTitle] = useState(filter.title || '');
  const [director, setDirector] = useState(filter.director || []);
  const [rating, setRating] = useState(filter.rating || '');
  const [cast, setCast] = useState(filter.cast || []);
  const [country, setCountry] = useState(filter.country || []);
  const [releaseYear, setReleaseYear] = useState(filter.release_year || null);
  const [duration, setDuration] = useState(filter.duration || '');
  const [listedIn, setListedIn] = useState(filter.listed_in || []);
  const [description, setDescription] = useState(filter.description || '');

  const buildFilter = () => {
    const newFilter = {};
    if (title) newFilter.title = title;
    if (director.length > 0 && director.some(d => d.length > 0)) newFilter.director = director;
    if (rating) newFilter.rating = rating;
    if (cast.length > 0 && cast.some(c => c.length > 0)) newFilter.cast = cast;
    if (country.length > 0 && country.some(c => c.length > 0)) newFilter.country = country;
    if (releaseYear) newFilter.releaseYear = releaseYear;
    if (duration) newFilter.duration = duration;
    if (listedIn.length > 0 && listedIn.some(l => l.length > 0)) newFilter.listedIn = listedIn;
    if (description) newFilter.description = description;
    return newFilter;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFilter = buildFilter();
    setFilter(newFilter);
    try {
      const response = await axios.post('/movies', newFilter);
      console.log(response.data);
      setMovies(response.data); // Set the movies state directly with the response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="director">Director(s):</label>
      <input type="text" id="director" value={director.join(', ')} onChange={(e) => setDirector(e.target.value.split(', '))} />
      <label htmlFor="rating">Rating:</label>
      <input type="text" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
      <label htmlFor="cast">Cast:</label>
      <input type="text" id="cast" value={cast.join(', ')} onChange={(e) => setCast(e.target.value.split(', '))} />
      <label htmlFor="country">Country:</label>
      <input type="text" id="country" value={country.join(', ')} onChange={(e) => setCountry(e.target.value.split(', '))} />
      <label htmlFor="releaseYear">Release Year:</label>
      <input type="number" id="releaseYear" value={releaseYear} onChange={(e) => setReleaseYear(parseInt(e.target.value))} />
      <label htmlFor="duration">Duration:</label>
      <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
      <label htmlFor="listedIn">Listed In:</label>
      <input type="text" id="listedIn" value={listedIn.join(', ')} onChange={(e) => setListedIn(e.target.value.split(', '))} />
      <label htmlFor="description">Description:</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
};

const MovieTable = ({ movies }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Director(s)</th>
          <th>Rating</th>
          <th>Cast</th>
          <th>Country</th>
          <th>Release Year</th>
          <th>Duration</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, index) => (
          <tr key={index}>
            <td>{movie.title}</td>
            <td>{movie.director.join(', ')}</td>
            <td>{movie.rating}</td>
            <td>{movie.cast.join(', ')}</td>
            <td>{movie.country.join(', ')}</td>
            <td>{movie.release_year}</td>
            <td>{movie.duration}</td>
            <td>{movie.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [filter, setFilter] = useState({});
  const [movies, setMovies] = useState([]);

  return (
    <div>
      <h1>Movie Search</h1>
      <ShowSearchFilter filter={filter} setFilter={setFilter} setMovies={setMovies} />
      <MovieTable movies={movies} />
    </div>
  );
};

export default App;
