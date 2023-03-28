'use strict';

const book_list = require('../entities/book/book_list');

const addBook = (req, res) => {
    book_list.addBook(
        req.body.title,
        req.body.genre,
        req.body.isbn,
        req.body.annotation,
        req.body.filepath,
        req.body.hasImage,
        req.body.authors,
    );
    res.json(req.body);
};

const getAllBooks = async (req, res) => {
    try {
        book_list.getAllBooks()
        .then((books) => {
            res.json(books);
        })
    } catch (err) {
        res.sendStatus(500);
    }
};

const deleteBook = (req, res) => {
    try {
        book_list.deleteBook(parseInt(req.params.id));
        res.json(req.body);
    } catch (err) {
        res.sendStatus(500);
    }
};

const updateBook = (req, res) => {
    try {
        book_list.updateBook(parseInt(req.params.id), req.body);
        res.json(req.body);
    } catch(err) {
        res.sendStatus(500);
    }
}

const getBook = (req, res) => {
    try {
        let book = book_list.searchBook('id', parseInt(req.params.id));
        res.json(book);
    } catch(err) {
        res.sendStatus(500);
    }
}


module.exports = {
    addBook,
    getAllBooks,
    deleteBook,
    updateBook,
    getBook,
};