const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { argv } = require('process')
const mongoose = require('mongoose')
const Book = require("./model/Books")
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const Author = require("./model/Author")
const {v1: uuid} = require('uuid')
const {MONGO_URI} = require("./config");

//MONGO_URI="mongodb+srv://fullstackpart8:fullstackpart8@cluster0.f9mfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
console.log("URL",MONGO_URI)
mongoose
  .connect(MONGO_URI, {
//    useNewUrlParser: true,
 //   useUnifiedTopology: true,
 //   useFindAndModify: false,
 //   useCreateIndex: true,
  })
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
    name: String!
    id: ID!
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
      let author = null
      if (args.author) author = await Author.findOne({ name: args.author })
      if(!author && args.author) return null
      let result=Book.find({})
      if (args.author) result=await Book.find({author: author.id})
      if (args.genre) result=await Book.find({ genre: { $in: { $eq: args.genre }}} )
      //if (argv.genre) result=result.filter((book) => book.genre.includes(argv.genre))

      return result
    },

    allAuthors:async()=> {

     return Author.find({})
    }
  },

  Author: {
    bookCount: async(root) =>
      await Book.find({ author: root.id }).countDocuments(),
  },
  //no work
  Mutation: {
    addBook: async (root,argv)=>{
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
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})