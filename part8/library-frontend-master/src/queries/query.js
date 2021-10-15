import { gql } from '@apollo/client'

export const AUTHORS = gql`
    query {
        allAuthors {
            id
            name
            born
            bookCount
        }
    }
    `
export const BOOKS = gql`
    query {
        allBooks {
            title
            published
            author{
                name
            }
        }
    }
    `

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
      }
    }
  `;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genre: $genres
        ){
            title
            author
            published
            genre
        }
    }
`