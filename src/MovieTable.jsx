
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

export default MovieTable;
