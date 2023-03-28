const express = require('express')
const about = require('./routes/about')
const books = require('./routes/books')
const main = require('./routes/main_page')
const touring_books = require('./routes/touring_books')
const hunt = require('./routes/hunt')
const authors = require('./routes/authors')
const places = require('./routes/places')
const genres = require('./routes/genres')
const users = require('./routes/authentication')
var cookieParser = require('cookie-parser');


const mysql_manager = require('./storage/mysql_manager')


const uploader = require('./middleware/upload_image_middleware')


const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser());

app.use(express.static('static'));

app.use('/api', main())
   .use('/about', about())
   .use('/books', books())
   .use('/touring_books', touring_books())
   .use('/hunt', hunt())
   .use('/places', places())
   .use('/authors', authors())
   .use('/genres', genres())
   .use('/users', users())

   console.log(app.listen(5000, ()=>{console.log('')}).address())