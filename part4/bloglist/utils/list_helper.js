var _ = require('lodash')

const dummy = (blogs) =>{
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((total,blog)=> total+blog.likes,0)
}

const favoriteBlog = (blogs) =>{
	return blogs.reduce((favorite,blog)=>{
		if(favorite.likes === undefined || favorite.likes <= blog.likes){
			favorite = {
				title:blog.title,
				author:blog.author,
				likes:blog.likes
			}
		}
		return favorite
	},{})
}

const mostBlog = (blogs) =>{
	let mostAuthorCount = 0
	let mostAuthor = ''
	_.forEach(_.uniqBy(blogs,'author'),(value,key) => {
		if(_.filter(blogs,['author',value.author]).length >= mostAuthorCount){
			mostAuthorCount = _.filter(blogs,['author',value.author]).length
			mostAuthor = value.author
		}
	})
	return {
		author:mostAuthor,
		blogs:mostAuthorCount
	}
}

const mostLikes = (blogs) =>{
	let mostLikesCount = 0
	let mostAuthor = ''
	_.forEach(_.uniqBy(blogs,'author'),(value,key) => {
		if(_.sumBy(_.filter(blogs,['author',value.author]),'likes') >= mostLikesCount){
			mostLikesCount = _.sumBy(_.filter(blogs,['author',value.author]),'likes')
			mostAuthor = value.author
		}
	})
	return {
		author:mostAuthor,
		likes:mostLikesCount
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlog,
	mostLikes
}
