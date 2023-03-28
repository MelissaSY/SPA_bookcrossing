'use strict';

const genre_list = require('../entities/genre/genre_list');

const addGenre = (req, res) => {
    try {
        genre_list.addToList(req.body.name);
        res.json(req.body);
    } catch (err) {
        res.sendStatus(500);
    }
};

const getAllGenres = async (req, res) => {
    try {
        genre_list.getAllGenres()
        .then((genre) => {
            res.json(genre);
        })

    } catch(err) {
        res.sendStatus(500);
    }
};

const deleteGenre = (req, res) => {
    try {
        genre_list.deleteGenre(parseInt(req.params.id));
        res.json(req.body);
    } catch(err) {
        res.sendStatus(500);
    }
};

const updateGenre = (req, res) => {
    try {
        genre_list.updateGenre(parseInt(req.params.id), req.body);
        res.json(req.body);
    } catch(err) {
        res.sendStatus(500);
    }
}

const getGenre = (req, res) => {
    try {
        let genre = genre_list.searchGenre('id', parseInt(req.params.id));
        res.json(genre);
    } catch(err) {
        res.sendStatus(500);
    }
}

module.exports = {
    addGenre,
    getAllGenres,
    deleteGenre,
    updateGenre,
    getGenre,
};