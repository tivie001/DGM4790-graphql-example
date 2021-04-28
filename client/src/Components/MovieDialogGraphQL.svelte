<script>
  export let movie
  export let reQuery = () => {}
  import { query, mutation } from 'svelte-apollo'
  import { getContext } from 'svelte'
  import MovieDialog from './MovieDialog.svelte'
  import FaStar from 'svelte-icons/fa/FaStar.svelte'
  import { gql } from 'apollo-boost'
  import { getNotificationsContext } from 'svelte-notifications'
  const { addNotification } = getNotificationsContext()

  const { close } = getContext('simple-modal')

  const closeDialog = () => {
    close(MovieDialog)
  }

  function _reQuery() {
    reQuery()
  }

  const ADD_MOVIE = gql`
    mutation addMovieToWatchlist(
      $id: Int!
      $title: String!
      $description: String
      $releaseDate: DateTime
      $image: String
      $watched: Boolean
    ) {
      addMovieToWatchlist(
        data: {
          id: $id
          title: $title
          description: $description
          releaseDate: $releaseDate
          image: $image
          watched: $watched
        }
      ) {
        id
        title
        description
        releaseDate
        watched
      }
    }
  `
  const GET_MOVIES = gql`
    query Movie {
      allMovies {
        id
        title
        description
        image
        releaseDate
      }
    }
  `
  const addMovieToWatchlist = mutation(ADD_MOVIE)
  const addToWatchList = async (movie) => {
    try {
      addMovieToWatchlist({
        variables: {
          id: 1,
          title: movie.title,
          description: movie.description,
          releaseDate: movie.releaseDate,
          image: movie.image,
          watched: movie.watched,
        },
      })
    } catch (err) {
      console.error(err)
    } finally {
      addNotification({
        text: `${movie.title} successfully added to watchlist!`,
        position: 'top-center',
        type: 'success',
        removeAfter: 3000,
      })
      closeDialog()
      _reQuery()
    }
  }
</script>

<style>
  .dialog-container {
    display: flex;
    justify-content: flex-start;
  }
  .movie-details {
    padding-left: 2rem;
    text-align: left;
  }
  .movie-details button {
    font-variant: small-caps;
    color: #ffffff;
    background-color: #2ec4b6;
    border-radius: 5px;
    border: 2px solid #011627;
  }
  .movie-details button:hover {
    color: #ffffff;
    background-color: #011627;
    border: 2px solid #2ec4b6;
  }
  .rating-row {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    text-align: left;
    align-items: center;
  }
  .gold-star {
    height: 30px;
    color: #ffd700;
    width: 30px;
    padding-left: 8px;
  }
</style>

<section class="dialog-container">
  <div class="img-container">
    <img
      class="fav"
      src="https://image.tmdb.org/t/p/w500{movie.image}"
      height="400"
      alt={movie.title} />
  </div>
  <div class="movie-details">
    <h2>{movie.title}</h2>
    <p style="font-size: 12px"><i>{movie.description}</i></p>
    <p>{movie.releaseDate}</p>
    <div class="rating-row">
      {#if movie.voteAverage}
        <p>{movie.voteAverage}/10</p>
        <div class="gold-star">
          <FaStar />
        </div>
      {/if}
    </div>
    <button on:click={addToWatchList(movie)}>add to watchlist</button>
  </div>
</section>
