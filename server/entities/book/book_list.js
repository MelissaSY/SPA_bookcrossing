let Book = require("./book.js");
const fs = require('fs');
const storage = require("../../services/storage/mysql_manager");

let books = [];

const getNextId = () => {
    let maxId = -1;
    for(let book of books) {
        if(book.id > maxId) {
            maxId = book.id;
        }
    }
    maxId++;
    return maxId;
}

const getAllBooks = async () => {
    books.length = 0;
    let books_genres = (await storage.getBookGenre())[0];
    let books_authors = (await storage.getBookAuthor())[0];
    await storage.getAllBooks()
    .then((dbBooks) => {
        for(let dbBook of dbBooks[0]) {
            let genres = [];
            let dbGenres = books_genres.filter(element => element.id_book === dbBook.id);
            dbGenres.forEach(element => {
                genres = [...genres, element.id_genre]
            });
            
            let authors = [];
            let dbAuthors = books_authors.filter(element => element.id_book === dbBook.id);
            dbAuthors.forEach(element => {
                authors = [...authors, element.id_author]
            });

            let hasCover = dbBook.has_cover > 0;

            if(!fs.existsSync('../server/static/images/'+dbBook.cover_path)) {
                hasCover = false;
            }

            let newBook = new Book(
                dbBook.id,
                dbBook.title,
                genres,
                dbBook.isbn,
                dbBook.annotation,
                dbBook.cover_path,
                hasCover,
                authors,
            )

            books.push(
                newBook
            )
            if((dbBook.has_cover > 0) !== hasCover) {
                storage.editBook(newBook)
            }
        }
    })
    .catch((err) => {
        throw err;
    });
    return books;
}

const searchBook = (propName, value) => {
    let book = null;
    let i = 0;
    while(i < books.length && books[i][propName] !== value) {
        i++;
    }
    if(i < books.length) {
        book = books[i];
    }
    return book;
}

const addBook = (title, genre=[],  isbn='', annotation ='', filepath='', hasImage = false, authors=[]) => {
    let id = getNextId();
    let newBook = new Book(id, title, genre, isbn, annotation, filepath, hasImage, authors);
    books.push(newBook);
    try {
        storage.addBook(newBook);
    } catch(err) {
        throw err;
    }
}

const deleteBook = (id) => {
    let i = 0;
    while(i < books.length && books[i].id !== id) {
        i++;
    }

    if(i < books.length) {
        books.splice(i, 1);
        try {
            storage.deleteBook(id);
        } catch(err) {
            throw err;
        }
    }
}

const updateBook = (id, book) => {
    let i = 0;
    while(i < books.length && books[i].id !== id) {
        i++;
    }
    if(i < books.length) {
        books[i] = book;
        storage.editBook(book);
    }
}

module.exports = {
    addBook,
    getAllBooks,
    deleteBook,
    updateBook,
    searchBook,
};
