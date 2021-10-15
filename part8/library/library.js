const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { argv } = require('process')
const mongoose = require('mongoose')
const Book = require("./model/Books")
const jwt = require('jsonwebtoken')
const User = require('./model/User_library')
const Author = require("./model/Author")
const {v1: uuid} = require('uuid')
const {MONGO_URI} = require("./config");

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'


console.log("URL",MONGO_URI)
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
      return context.currentUser
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
      console.log("listing books---")
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
  //no work
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
      const user = await User.findOne({ username: args.username })
  
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
      console.log("here")
      //console.log("Context",context)
      /*if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }*/
      let aut=await Author.findOne({ name: argv.author })
      if(aut == undefined){
        const author =new Author({
          name: argv.author,
          id: uuid(),
          born:null,
        })
        try{
          await author.save()
          
        }catch(error){
          throw new UserInputError(error.message, {
            invalidArgs: argv,
          })
        }
      }
      const book = new Book({ ...argv, author: aut.id , id: uuid() })
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

      //book = await Book.populate('author').execPopulate()
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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    //console.log("req",req.headers.authorization )
    const auth = req ? req.headers.authorization : null
    //console.log("auth",auth)
    if (auth) {
      const decodedToken = jwt.verify(auth, JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      console.log("user",currentUser)
      return currentUser 
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})