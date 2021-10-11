const { ApolloServer, gql } = require('apollo-server');
const { argv } = require('process');
const {v1: uuid} = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genre: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genre: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genre: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genre: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genre: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genre: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genre: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  
type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
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
  }

  type Book {
    title: String!
    published: Int
    author: String!
    id: ID!
    genre: [String]
  }
  type Query {
      authorCount: Int!
      bookCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
  }

  `;

const resolvers = {
  Query: {
    bookCount: ()=>books.length,
    authorCount: ()=>authors.length,

    allBooks:(root, argv)=>{
      let result=books
      console.log(argv)
      if (argv.author) result=result.filter((book) => book.author === argv.author)
      if (argv.genre) result=result.filter((book) => book.genre.includes(argv.genre))

      return result
    },

    allAuthors:()=> authors
  },

  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
  },
  Mutation: {
    addBook: (root,argv)=>{
      if(authors.find((author)=>author.name===argv.name)==undefined){
        const author={
          name: argv.author,
          id: uuid(),
          born:null,
        }
        authors=authors.concat(author)
      }
      const book = { ...argv, id: uuid() }
      books = books.concat(book)
      return book
    },

    editAuthor:(root,argv) => {
      if(authors.find((author)=>author.name===argv.name)==undefined) return null
      authors=authors.map((author)=>{
        return author.name===argv.name ? {...author,born:argv.setBornTo}: author
      })
      return {
        name: argv.name,
        born: argv.setBornTo
      }
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