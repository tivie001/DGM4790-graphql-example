<script>
  import { query, mutation } from 'svelte-apollo'
  import { gql } from 'apollo-boost'
  import FaTrashAlt from 'svelte-icons/fa/FaTrashAlt.svelte'
  import FaEdit from 'svelte-icons/fa/FaEdit.svelte'
  import FaCheckSquare from 'svelte-icons/fa/FaCheckSquare.svelte'

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
  const GET_WATCHLIST = gql`
    query Watchlist {
      watchList {
        id
        title
        description
        image
        releaseDate
        watched
      }
    }
  `
  const GET_SHOWS = gql`
    query {
      tvShow {
        id
        title
        description
        releaseDate
        image
        voteAverage
      }
    }
  `
  const DELETE_MOVIE = gql`
    mutation deleteMovieWatchlist($id: Int!) {
      deleteMovieWatchlist(id: $id) {
        title
        id
      }
    }
  `
  const UPDATE_MOVIE = gql`
    mutation updateWatchListMovie(
      $id: Int!
      $title: String!
      $watched: Boolean
    ) {
      updateWatchListMovie(
        id: $id
        data: { id: 1, title: $title, watched: $watched }
      ) {
        id
        title
        watched
      }
    }
  `
  const removeMovie = mutation(DELETE_MOVIE)
  const updateMovie = mutation(UPDATE_MOVIE)
  const movies = query(GET_MOVIES)
  const watchlist = query(GET_WATCHLIST)
  const shows = query(GET_SHOWS)

  const deleteMovie = async (movieId, index) => {
    console.log($watchlist.data['watchList'])
    $watchlist.data['watchList'].splice(index, 1)
    console.log(movieId)
    try {
      removeMovie({ variables: { id: movieId } })
    } catch (err) {
      console.error(err)
    }
  }
  const markAsWatched = async (movie, index) => {
    changeCheckbox(index)
    const updatedWatched = !movie.watched
    console.log(movie)
    try {
      updateMovie({
        variables: {
          id: movie.id,
          title: movie.title,
          watched: updatedWatched,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }
  function changeCheckbox(index) {
    const checkboxes = document.querySelectorAll('.check')
    let box = checkboxes.item(index)
    if (box.classList.contains('unchecked-icon')) {
      box.classList.remove('unchecked-icon')
      box.classList.add('check-icon')
    } else {
      box.classList.remove('check-icon')
      box.classList.add('unchecked-icon')
    }
  }
</script>

<style>
  h1 {
    color: white;
    font-family: 'Raleway';
    text-transform: lowercase;
    font-variant: small-caps;
  }
  .graphql-container {
    margin: 0 2rem;
    display: grid;
    grid-column-gap: 5px;
  }
  .card-wrapper {
    border-radius: 5px;
    box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.9);
    background-color: #262626;
    margin: 2rem 0;
  }
  .movie-container {
    grid-row: 1 / 7;
    grid-column: 1 / 3;
  }
  .watchlist-container {
    grid-column: 4 / 6;
  }
  .new-movies-container {
    grid-column: 7 / 8;
  }
  .movie-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    row-gap: 50px;
    grid-auto-rows: minmax(100px, auto);
    padding: 1rem;
  }
  .watchlist-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    row-gap: 50px;
    grid-auto-rows: minmax(100px, auto);
    padding: 1rem;
  }
  /* .movie-item {
    transition: 0.5s ease;
  } */
  /* .movie-item:hover {
    transform: scale(1.08);
    cursor: pointer;
  } */
  .movie-item small {
    color: #fdfffc;
    margin-top: 10px;
    text-transform: uppercase;
  }
  .icon {
    width: 30px;
    height: 30px;
  }
  .img-container img:hover {
    opacity: 0.2;
    transition: 0.3s ease-out;
    cursor: pointer;
  }
  .img-container:hover .trash-icon {
    visibility: visible;
    opacity: initial;
  }
  .img-container:hover .check-icon {
    visibility: visible;
  }
  .img-container:hover .unchecked-icon {
    visibility: visible;
  }
  .trash-icon {
    color: red;
    position: relative;
    top: 60px;
    right: 80px;
    visibility: hidden;
  }
  .check-icon {
    position: relative;
    top: 70px;
    right: 80px;
    visibility: hidden;
    color: #41db2a;
  }
  .unchecked-icon {
    color: white;
    position: relative;
    top: 70px;
    right: 80px;
    visibility: hidden;
  }
  .edit-icon {
    color: white;
  }
  .trash-icon:hover,
  .check-icon:hover {
    cursor: pointer;
  }
  .img-container {
    display: flex;
    flex-direction: row;
  }
  .unchecked-icon:hover {
    color: #41db2a;
    cursor: pointer;
  }
  .check-icon:hover {
    color: #ffffff;
    cursor: pointer;
  }

  @media only screen and (max-width: 639.99px) {
    .movie-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (min-width: 640px) and (max-width: 1099.99px) {
    .movie-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media only screen and (min-width: 1100px) and (max-width: 1340px) {
    .movie-grid {
      grid-template-columns: repeat(6, 1fr);
    }
  }
</style>

<div class="graphql-container">
  <section class="card-wrapper movie-container">
    <h1>My Favorites Movies</h1>
    <div class="movie-grid">
      {#if $movies.loading}
        Loading...
      {:else if $movies.error}
        Error:
        {$movies.error.message}
      {:else}
        {#each $movies.data['allMovies'] as movie}
          <div class="movie-item">
            <div class="img-container">
              <img
                class="fav"
                src="https://image.tmdb.org/t/p/w500{movie.image}"
                height="200"
                alt={movie.title} />
            </div>
            <small>{movie.title}</small>
          </div>
        {/each}
      {/if}
    </div>
  </section>
  <section class="card-wrapper watchlist-container">
    <h1>My Favorite TV Shows</h1>
    <div class="movie-grid">
      {#if $shows.loading}
        Loading...
      {:else if $shows.error}
        Error:
        {$shows.error.message}
      {:else}
        {#each $shows.data['tvShow'] as show}
          <div class="movie-item">
            <div class="img-container">
              <img
                class="fav"
                src="https://image.tmdb.org/t/p/w500{show.image}"
                height="200"
                alt={show.title} />
            </div>
            <small>{show.title}</small>
          </div>
        {/each}
      {/if}
    </div>
  </section>
  <section class="card-wrapper new-movies-container">
    <h1>Watchlist</h1>
    <!-- <div on:click={() => toggleWatchlistEdit()}>
      <div class="icon edit-icon">
        <FaEdit />
      </div>
    </div> -->
    <div class="watchlist-grid">
      {#if $watchlist.loading}
        Loading...
      {:else if $watchlist.error}
        Error:
        {$movies.error.message}
      {:else}
        {#each $watchlist.data['watchList'] as movie, i}
          <div class="movie-item">
            <div class="img-container">
              <img
                class="fav"
                src="https://image.tmdb.org/t/p/w500{movie.image}"
                height="200"
                alt={movie.title} />
              <div class="trash-icon-container">
                <div
                  class="icon trash-icon check"
                  on:click={deleteMovie(movie.id, i)}>
                  <FaTrashAlt />
                </div>
                {#if movie.watched}
                  <div
                    class="icon check-icon check"
                    on:click={() => markAsWatched(movie, i)}>
                    <FaCheckSquare />
                  </div>
                {:else}
                  <div
                    class="icon unchecked-icon check"
                    on:click={() => markAsWatched(movie, i)}>
                    <FaCheckSquare />
                  </div>
                {/if}
              </div>
            </div>
            <small>{movie.title}</small>
          </div>
        {/each}
      {/if}
    </div>
  </section>
</div>
