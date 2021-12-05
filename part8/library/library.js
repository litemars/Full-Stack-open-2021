const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const mongoose = require('mongoose')
const Book = require("./model/Books")
const jwt = require('jsonwebtoken')
const User = require('./model/User_library')
const Author = require("./model/Author")
const {v1: uuid} = require('uuid')
const {MONGO_URI} = require("./config");
const pubsub = new PubSub()
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}
type Subscription {
    bookAdded: Book!
  }
type Token {
  value: String!
}
  
type Author {
    name: String
    id: ID
    born: Int
   bookCount: Int
  }
  type Mutation{
    addBook(
      title: String!
      published: Int!
      author: String!
      genre: [String!]!
    ): Book
    editAuthor(
      name:String!
      setBornTo: Int!
    ): Author
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genre: [String!]!
  }
  type Query {
      me: User
      authorCount: Int!
      bookCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
  }

  `;

const resolvers = {
  Query: {

    me: async (root, args, context) => {
      return context
    },

    bookCount: ()=>{
      let check1=Book.collection.countDocuments()
      return check1
    },
    authorCount: ()=>{
      let check2=Author.collection.countDocuments()
      return check2
    },
    
    //no works
    allBooks: async(root, args)=>{
      let author = null
      if (args.author) author = await Author.findOne({ name: args.author })
      if(!author && args.author) return null
      let result=Book.find({}).populate('author')
      /*  
        path: 'author',
        select: 'name'
      })*/
      if (args.author) result=await Book.find({author: author.id}).populate('author')
      if (args.genre) result=await Book.find({ genre: { $in: { $eq: args.genre }}} ).populate('author')
      //if (argv.genre) result=result.filter((book) => book.genre.includes(argv.genre))
      return result
    },
    allAuthors:async()=> {
     //console.log(Author.find({}).data.allAuthors)
     let res =Author.find({})
     return res
    }
  },

  Author: {
    bookCount: async(root) =>
      await Book.find({ author: root.id }).countDocuments(),
  },
  Mutation: {

    createUser: (root, args) => {
      console.log("create",args)
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      console.log("user")
      const user = await User.findOne({ username: args.username })
      console.log("user",user)
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

    addBook: async (root,argv)=>{
      console.log("adding...")
      console.log(argv)
      let aut=await Author.findOne({ name: argv.author })
      if(aut == undefined){
        const author =new Author({
          name: argv.author,
          id: uuid(),
          born:null,
        })
        console.log("new author book",author)
        try{
          await author.save()
          
        }catch(error){
          throw new UserInputError(error.message, {
            invalidArgs: argv,
          })
        }
      }
      console.log("author saved done")
      console.log("construnction book:")
      const book = new Book({ ...argv, author: aut.id , id: uuid() })
      console.log("book done",book)
      try{
        await book.save()

        const bookCount = await Book.find({
          author: aut.id,
        }).countDocuments()
        await Author.findOneAndUpdate(
          { name: aut.name },
          { bookCount: bookCount }
        )
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: argv,
        })
      }
      console.log("book adding...",book)
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      //book = await Book.populate('author').execPopulate()
      console.log("book publushed")
      return book
    },

    editAuthor: async(root,argv) => {
    
    if (!context.currentUser) {
      throw new AuthenticationError('not authenticated')
    }

    if(Author.findOne({ name: argv.name })==undefined) return null
    
    const author = await Author.findOneAndUpdate(
      { name: argv.name },
      { born: argv.setBornTo }
    )
    return author
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    // why the null?
    if (auth && auth!=="null") {
      const decodedToken = jwt.verify(auth, JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      //console.log("user",currentUser)
      return currentUser 
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})