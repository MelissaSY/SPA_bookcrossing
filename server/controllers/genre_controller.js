'use strict';
const {Genre} = require('../models/Genre');

const addGenre = async (req, res) => {
    try {
        await Genre.create({name: req.body.name})
        res.json(req.body);
    } catch (err) {
        res.sendStatus(500);
    }
};

const getAllGenres = async (req, res) => {
    await Genre.findAll()
    .then((allGenre)=> {
        res.json(allGenre);
    })
    .catch((err)=>{
        res.sendStatus(404);
    })
};

const deleteGenre = async (req, res) => {
    try {
        await Genre.destroy({
            where : {
                id: parseInt(req.params.id)
            }
        });
        res.json(req.body);
    } catch(err) {
        res.sendStatus(204);
    }
};

const updateGenre = async (req, res) => {
    try {
        await Genre.update({
            name: req.body.name
        }, {
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.json(req.body);
    } catch(err) {
        res.sendStatus(500);
    }
}

const getGenre = async (req, res) => {
    try {
        let genre = await Genre.findByPk(parseInt(req.params.id));
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