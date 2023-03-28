'use strict';

const author_list = require('../entities/author/author_list');

const addAuthor = (req, res) => {
    author_list.addAuthor(
        req.body.pseudonyms,
         req.body.name,
          req.body.surname,
           req.body.patronymic
        );
    res.json(req.body);
};

const getAllAuthors = (req, res) => {
    try {
        author_list.getAllAuthors()
        .then((authors) => {
            res.json(authors);
        })
    } catch (err) {
        res.sendStatus(500);
    }
};

const deleteAuthor = (req, res) => {
    try {
        author_list.deleteAuthor(parseInt(req.params.id));
        res.json(req.body);
    } catch (err) {
        res.sendStatus(500);
    }
};

const updateAuthor = (req, res) => {
    try {
        author_list.updateAuthor(parseInt(req.params.id), req.body);
        res.json(req.body);
    } catch(err) {
        res.sendStatus(500);
    }
}

const getAuthor = (req, res) => {
    try { 
        let author = author_list.searchAuthor('id', parseInt(req.params.id));
        res.json(author);
    } catch(err) {
        res.sendStatus(500);
    }   
}

module.exports = {
    addAuthor,
    getAllAuthors,
    deleteAuthor,
    updateAuthor,
    getAuthor,
};