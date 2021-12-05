import React from 'react'

const Genres = ({ genres, setGenres_fun }) => {
  console.log(genres)
  return (
    <div>
      <button key="all genres" onClick={() => setGenres_fun(null)}>
        All genres
      </button>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenres_fun(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Genres