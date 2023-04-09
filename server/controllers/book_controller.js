'use strict';

const {Book, BookAuthor, BookGenre} = require('../models/Book');
const {Genre} = require('../models/Genre');
const { Author, Pseudonym } = require('../models/Author');

const addBook = async (req, res) => {
    await Book.sync();
    await BookAuthor.sync();
    await BookGenre.sync();
    let book = await Book.create({
        title: req.body.title,
        isbn: req.body.isbn || null,
        annotation: req.body.annotation,
        coverPath: req.body.filepath,
        hasCover: req.body.hasimage,
    })
    for(let genre of req.body.genre) {
        await BookGenre.create({
            BookId: book.id,
            GenreId: parseInt(genre)
        })
    }
    for(let author of req.body.authors) {
        await BookAuthor.create({
            BookId: book.id,
            AuthorId: parseInt(author)
        })
    }
    res.json(req.body);
};

const getAllBooks = async (req, res) => {
    try {
        await Book.sync();
        await BookAuthor.sync();
        await BookGenre.sync();

        await Book.findAll({
            include: [{
                model: Author,
                through: {
                    attributes: []
                },
                include: [{
                    model: Pseudonym,
                    attributes: ['pseudonym']

                }]
            }, {
                model: Genre,
                through: {
                    attributes: []
                }
            }]
        })
        .then((resp)=> {
            res.json(resp);
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const deleteBook = async (req, res) => {
    try {
        await Book.sync();
        await BookAuthor.sync();
        await BookGenre.sync();

        await Book.destroy({
            where: {
                id: parseInt(req.params.id),
            }
        })
        res.json(req.body);
    } catch (err) {
        res.sendStatus(500);
    }
};

const updateBook = async (req, res) => {
    try {
        await Book.update({
            title: req.body.title,
            isbn: req.body.isbn || null,
            annotation: req.body.annotation,
            coverPath: req.body.filepath,
            hasCover: req.body.hasimage,
        }, {
            where: {
                id: parseInt(req.params.id)
            }
        });

        await BookAuthor.destroy({
            where: {
                BookId: parseInt(req.params.id)
            }
        })

        await BookGenre.destroy({
            where: {
                BookId: parseInt(req.params.id)
            }
        })

        for(let genre of req.body.genre) {
            await BookGenre.create({
                BookId: parseInt(req.params.id),
                GenreId: parseInt(genre)
            })
        }
        for(let author of req.body.authors) {
            await BookAuthor.create({
                BookId: parseInt(req.params.id),
                AuthorId: parseInt(author)
            })
        }
        res.json(req.body);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

const getBook = async (req, res) => {
    try {
        let book = await Book.findOne({
            where: {
                id: parseInt(req.params.id)
            },
            include: [{
                model: Author,
                through: {
                    attributes: []
                },
                include: [{
                    model: Pseudonym,
                    attributes: ['pseudonym']

                }]
            }, {
                model: Genre,
                through: {
                    attributes: []
                },
            }]
        })
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