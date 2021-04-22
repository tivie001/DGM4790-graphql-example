const { ApolloServer } = require('apollo-server')
const { schema } = require('./schema')
const { context } = require('./context')
const path = require('path')

const server = new ApolloServer({
  schema: schema,
  context: context,
  introspection: true
})
app.use(express.static('public'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
server.listen(process.env.PORT || 4000).then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/js/graphql#using-the-graphql-api
  `)
})
