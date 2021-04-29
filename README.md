# :tv: Watchly: A Movie & TV Show App

## Created By: Tyler Ivie

### Created in and with tools like: Node.js, Express.js, Mongoose, MongoDB, Prisma, Apollo, Docker & GraphQL on the backend. Svelte, JS, HTML, CSS on the frontend. This app will help you browse trending movies and add them to your watchlist.

[Watchly App URL](https://docker-watchly-app.herokuapp.com)

---

# RESTful API Node Server Backend

## :truck: Routes

### GET

1. As a user I can see all my movies (after adding at least one movie) in my watchlist. (api/movies).

```javascript
router.get('/movies', async (req, res) => {
  const watchList = await WatchList.find()
  res.status(200).json({
    message: 'Watchlist fetched!',
    watchList: watchList,
  })
})
```

2. As a user I can see all my favorite movies. (api/favorites)

```javascript
router.get('/favorites', async (req, res) => {
  const favorites = await FavList.find()
  res.status(200).json({
    message: 'All favorite movies fetched!',
    favorites: favorites,
  })
})
```

- This can be seen in the UI at the url: [https://docker-watchly-app.herokuapp.com](https://docker-watchly-app.herokuapp.com).
- Then click on 'My Movies' in the navbar.
- Here you can see all the movies you have added to your watch or favorites lists. \*

3. As a user I can see all my favorite movies. (api/movies)
4. As a user when navigated to the home screen, it is populated with currently trending movies for me to interact with. (https://docker-watchly-app.herokuapp.com)

### PUT

1. As a user I can check off a movie if I have watched it (api/updateList/:id)
2. As a user I can check off a movie if I have watched it (api/updateFavList/:id)

```javascript
router.put('/updateList/:id', (req, res) => {
  WatchList.findById(req.params.id, (err, list) => {
    if (err) console.log(handleError(err))
    list.update(req.body, (err) => {
      if (err) console.log(err)
      WatchList.find((err, list) => {
        if (err) console.log(handleError(err))
        res.json(list)
      })
    })
  })
})
router.put('/updateFavList/:id', (req, res) => {
  FavList.findById(req.params.id, (err, list) => {
    if (err) console.log(handleError(err))
    list.update(req.body, (err) => {
      if (err) console.log(err)
      FavList.find((err, list) => {
        if (err) console.log(handleError(err))
        res.json(list)
      })
    })
  })
})
```

### POST

1. As a user I can click on any trending movie and click by going to **ADD TO WATCHLIST**. This will add the following movie to my watchlist here (click on my Movies). (api/addList)

```javascript
router.post('/addList', async (req, res) => {
  WatchList.create(
    {
      title: req.body.title,
      moviePoster: req.body.img,
      dateReleased: req.body.dateReleased,
      watched: req.body.watched,
    },
    (err) => {
      if (err) console.log(err)
      WatchList.find((err, lists) => {
        if (err) console.log(handleError(err))
        res.status(200).json({
          message: 'Movie added to watchlist!',
          lists: lists,
        })
      })
    },
  )
})
```

2. As a user I can click on any trending movie and click by going to the **HEART ICON**. This will add the following movie to my favorites list here (click on my Movies). (api/addFavorite)

```javascript
router.post('/addFavorite', async (req, res) => {
  FavList.create(
    {
      title: req.body.title,
      moviePoster: req.body.img,
      dateReleased: req.body.dateReleased,
      watched: req.body.watched,
    },
    (err) => {
      if (err) console.log(err)
      FavList.find((err, lists) => {
        if (err) console.log(handleError(err))
        res.status(200).json({
          message: 'Movie added to your favorites!',
          lists: lists,
        })
      })
    },
  )
})
```

### DELETE

1. As a user I can remove a movie from my watchlist or favorites by clicking on the **TRASH ICON**. (api/deleteList/:id)

```javascript
router.delete('/deleteList/:id', (req, res) => {
  WatchList.remove(
    {
      _id: req.params.id,
    },
    (err) => {
      if (err) console.log(handleError(err))
      WatchList.find((err, list) => {
        if (err) console.log(handleError(err))
        res.status(200).json({
          message: 'Movie removed from your watchlist!',
          list: list,
        })
      })
    },
  )
})
```

---

# GraphQL Server Backend

## Prisma as your data modeling tool

- [Prisma Schema](https://github.com/tivie001/DGM4790-graphql-example/blob/main/prisma/schema.prisma)
- [Schema.js](https://github.com/tivie001/DGM4790-graphql-example/blob/main/prisma/seed.js)

## Docker-based PostgreSQL or MySQL as your data store

- I used PostgresQL

## At least 3 Query resolvers allowing users to get data from your server

- To see it in action on the Watchly App do the following:

1. Clone the repo
2. run script `npm install`
3. run script `npm start`

<span style="color:red">**\*\*\*\*** To run the graphql endpoints go to: http://localhost:4000/ **\*\*\*\***</span>

- Next, navigate to: [https://docker-watchly-app.herokuapp.com](https://docker-watchly-app.herokuapp.com)
- Click Graphql at the top
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
