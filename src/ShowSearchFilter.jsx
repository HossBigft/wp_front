import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ShowSearchFilter = ({ filter, setFilter, setMovies }) => {
  const [type, setType] = useState(filter.type || "");
  const [title, setTitle] = useState(filter.title || "");
  const [director, setDirector] = useState(filter.director || []);
  const [rating, setRating] = useState(filter.rating || "");
  const [cast, setCast] = useState(filter.cast || []);
  const [country, setCountry] = useState(filter.country || []);
  const [dateAdded, setDateAdded] = useState(filter.date_added || "");
  const [releaseYear, setReleaseYear] = useState(filter.release_year || "");
  const [duration, setDuration] = useState(filter.duration || "");
  const [listedIn, setListedIn] = useState(filter.listed_in || []);
  const [description, setDescription] = useState(filter.description || "");

  const buildFilter = () => {
    const newFilter = {};
    if (type) newFilter.type = type;
    if (title) newFilter.title = title;
    if (director.length > 0 && director.some((d) => d.length > 0))
      newFilter.director = director;
    if (rating) newFilter.rating = rating;
    if (cast.length > 0 && cast.some((c) => c.length > 0))
      newFilter.cast = cast;
    if (country.length > 0 && country.some((c) => c.length > 0))
      newFilter.country = country;
    if (dateAdded) newFilter.date_added = dateAdded;
    if (releaseYear) newFilter.release_year = parseInt(releaseYear);
    if (duration) newFilter.duration = duration;
    if (listedIn.length > 0 && listedIn.some((l) => l.length > 0))
      newFilter.listed_in = listedIn;
    if (description) newFilter.description = description;
    return newFilter;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFilter = buildFilter();
    setFilter(newFilter);
    try {
      const response = await axios.post("/movies", newFilter);
      console.log(response.data);
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="type">Type:</label>
      <select
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Select Type</option>
        <option value="Movie">Movie</option>
        <option value="TV Show">TV Show</option>
      </select>

      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        minLength={3}
        maxLength={50}
      />

      <label htmlFor="director">Director(s):</label>
      <input
        type="text"
        id="director"
        value={director.join(", ")}
        onChange={(e) => setDirector(e.target.value.split(", "))}
      />

      <label htmlFor="rating">Rating:</label>
      <input
        type="text"
        id="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        minLength={1}
        maxLength={10}
      />

      <label htmlFor="cast">Cast:</label>
      <input
        type="text"
        id="cast"
        value={cast.join(", ")}
        onChange={(e) => setCast(e.target.value.split(", "))}
      />

      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        value={country.join(", ")}
        onChange={(e) => setCountry(e.target.value.split(", "))}
      />

      <label htmlFor="dateAdded">Date Added:</label>
      <input
        type="date"
        id="dateAdded"
        value={dateAdded}
        onChange={(e) => setDateAdded(e.target.value)}
      />

      <label htmlFor="releaseYear">Release Year:</label>
      <input
        type="number"
        id="releaseYear"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        min={1900}
        max={2025}
      />

      <label htmlFor="duration">Duration:</label>
      <input
        type="text"
        id="duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        minLength={3}
        maxLength={10}
      />

      <label htmlFor="listedIn">Listed In:</label>
      <input
        type="text"
        id="listedIn"
        value={listedIn.join(", ")}
        onChange={(e) => setListedIn(e.target.value.split(", "))}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        minLength={3}
        maxLength={50}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default ShowSearchFilter;