/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { getMovies } from '../../services/fakeMovieService';

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: getMovies(),
    };
  }

  handleDelete = (movie) => {
    const { movies } = this.state;
    const filteredMovies = movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: filteredMovies });
  };

  renderMovies(movies) {
    return movies.map((movie) => (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <button
            type="button"
            onClick={() => this.handleDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    const { movies } = this.state;
    const { length: count } = movies;

    if (!count) {
      return <p>There are no movies in the database</p>;
    }

    return (
      <>
        <p>{`Showing ${count} movies in the database.`}</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>{this.renderMovies(movies)}</tbody>
        </table>
      </>
    );
  }
}
