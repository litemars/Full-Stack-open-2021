const _ = require('lodash')
const blog = require('../models/blog')
const Blog = require('../models/blog')

const dummy = () => {
  return 1
}
const totalLikes = (blogs) => {
  var sum = 0
  blogs.forEach(e => {
      sum = sum + e.likes
  });
  return sum
}

const favoriteBlog = (blogs) => {
  let fav = blogs[0]
  blogs.forEach(e => {
      if(fav.likes < e.likes){
          fav = e
      }
  })
  re ={
    author:fav.author,
    likes:fav.likes,
    title:fav.title
  }
  return re
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return null
  }

  let authorsByBlogs = _.countBy(blogs, "author")
  const value = _.sortBy(authorsByBlogs).reverse()[0];
  var man=_.keys(authorsByBlogs).find(key => authorsByBlogs[key] === value)

  const ret = { 
    author: man,
    blogs: value
  }
  return ret
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const sumFunction =(accumulator, currentItem) =>{
    // look up if the current item is of a category that is already in our end result.
    index = accumulator.findIndex((item) => item.author === currentItem.author)
    if (index < 0) {
        accumulator.push(currentItem); // now item added to the array
    } else {
        accumulator[index].likes += currentItem.likes // update the sum of already existing item
    }
    return accumulator;
}
results = blogs.reduce(sumFunction,[])

const value = _.sortBy(results).reverse()[0];

  const ret = {
    author: value.author,
    likes: value.likes,
  };
  return ret;
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
  }