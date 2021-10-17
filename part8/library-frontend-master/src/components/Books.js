import React, {useState, useEffect} from 'react'
import Genres from './Genres'

const Books = (props) => {

  const result = props.books
  var genres=[];
  //const [genres, setGenres] = useState([])
  //const [books,setBooks]=useState(null)
  var books=[]
  const [booksSorted,setBooksSorted]=useState(result)
  useEffect(() => {
    console.log("check")
    //var genres = []
    console.log(books)
    books.forEach((book) => {
      console.log("gen book",book.genre)
      if (book.genre) {
        console.log("here")
        book.genre.forEach((genre) => {
          console.log("each",genre)
          genres=genres.concat(genre)
        })
      }
    })
    console.log(genres)
  }, [booksSorted])


  if (!props.show) {
    return null
  }
  if (booksSorted.loading) return <div>loading...</div> 
  console.log("carica")
  console.log(booksSorted)
  //setBooksSorted(result.data.allBooks)
  


  const setGenres_fun = (val) =>{
    if(val!==null){
      console.log("val",val)
      console.log(books[0].genre)
      setBooksSorted(books.filter((book) => book.genre.includes(val)))
    }
}

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksSorted.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Genres genres={genres} setGenres_fun={setGenres_fun}/>
    </div>
    
  )
}

export default Books