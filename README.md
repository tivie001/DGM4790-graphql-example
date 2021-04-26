# GraphQL Server Example

Created By: Tyler Ivie

## Prisma as your data modeling tool

- [Prisma Schema](https://github.com/tivie001/DGM4790-graphql-example/blob/main/prisma/schema.prisma)
- [Schema.js](https://github.com/tivie001/DGM4790-graphql-example/blob/main/prisma/seed.js)

## Docker-based PostgreSQL or MySQL as your data store

- I used PostgresQL

## At least 3 Query resolvers allowing users to get data from your server

<span style="color:red">**\*\*\*\*** To run the graphql endpoints go to: http://localhost:4000/ **\*\*\*\***</span>

- To see it in action on the Watchly App first, run the following commands:

  `npm install`
  `npm run dev`

- Next, navigate to: [https://docker-watchly-app.herokuapp.com/graphql](https://docker-watchly-app.herokuapp.com/graphql)
- The following graphql commands get the following data and display them each said "section":

## My Favorite Movies Section

### 1. Get all popular movies

```graphql
query {
  allMovies {
    id
    title
    description
    releaseDate
    image
  }
}
```

## My Favorite TV Shows Section

### 2. Get all popular TV Shows

```graphql
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
```

## Watchlist Section

### 3. Get all TV Shows & Movies on Watchlist

```graphql
query {
  watchList {
    id
    title
    description
    releaseDate
    image
    watched
  }
}
```

## At least 2 Mutation resolvers allowing users to create, update, or upsert an item.

### 1. Add a movie/TV show to watchlist

```graphql
mutation addMovieToWatchlist {
  addMovieToWatchlist(
    data: {
      id: 1
      title: "Mortal Kombat"
      description: "Washed-up MMA fighter Cole Young, unaware of his heritage, and hunted by Emperor Shang Tsung's best warrior, Sub-Zero, seeks out and trains with Earth's greatest champions as he prepares to stand against the enemies of Outworld in a high stakes battle for the universe."
      releaseDate: "2010-03-24T00:00:00.000Z"
      watched: false
    }
  ) {
    id
    title
    description
    releaseDate
    watched
  }
}
```

### 2. Update a movie/TV show on watchlist to "Watched"

```graphql
mutation updateWatchListMovie {
  updateWatchListMovie(
    id: 1
    data: { id: 1, title: "Godzilla vs. Kong", watched: false }
  ) {
    id
    watched
  }
}
```

## At least 1 Mutation resolver allowing users to delete an item.

### 2. Delete a movie/TV show from watchlist

```graphql
mutation deleteMovieWatchlist {
  deleteMovieWatchlist(id: 2) {
    title
    id
  }
}
```

## Your datastore will contain at least 25 items

- Movies database has 10 items
- Watchlist database has 5 items
- TV Show database has 10 items

## Your app will be deployable locally using Docker and will have seed data entered into the datastore.

- App running in a docker container and deployed to Heroku
