'use strict';

const {Author, Pseudonym} = require('../models/Author');

const addAuthor = async (req, res) => {
    await Author.sync();
    await Pseudonym.sync();
    const author = await Author.create({
        name: req.body.name,
        surname: req.body.surname,
        patronymic: req.body.patronymic
    })
    req.body.pseudonyms.forEach(async element => {
        await Pseudonym.create({
            authorId: author.id,
            pseudonym: element,
        })
    });
    res.json(req.body);
};

const getAllAuthors = async (req, res) => {
    try {
        let authors = await Author.findAll();
        let authorlist = [];
        for(let element of authors) {
            let pseudonyms = await Pseudonym.findAll({
                attributes: ['pseudonym'],
                where: {
                    authorId: parseInt(element.id)
                }
            });
            let formPseudonyms = [];
            for(let pseudonym of pseudonyms) {
                formPseudonyms.push(pseudonym['pseudonym']);
            }
            let formAuthor = element;
            formAuthor.dataValues.pseudonyms = formPseudonyms;
            authorlist.push(
                formAuthor
            )
        }
        res.json(authorlist);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const deleteAuthor = async (req, res) => {
    try {
        await Author.destroy({
            where: {
                id: parseInt(req.params.id),
            }
        });
        res.json(req.body);
    } catch (err) {
        res.sendStatus(500);
    }
};

const getAuthor = async (req, res) => {
    try {
        let author = await Author.findByPk(parseInt(req.params.id));

        let pseudonyms = await Pseudonym.findAll({
            attributes: ['pseudonym'],
            where: {
                authorId: parseInt(req.params.id)
            }
        });
        let formPseudonyms = [];
        for(let pseudonym of pseudonyms) {
            formPseudonyms.push(pseudonym['pseudonym']);
        }
        let formAuthor = author;
        formAuthor.dataValues.pseudonyms = formPseudonyms;

        res.json(formAuthor);
    } catch(err) {
        res.sendStatus(500);
    }   
}

const updateAuthor = async (req, res) => {
    try {
        await Author.update({
            name: req.body.name,
            surname: req.body.surname,
            patronymic: req.body.patronymic
        }, {
            where: {
                id: parseInt(req.params.id)
            }
        })
        await Pseudonym.destroy({
            where: {
                authorId: parseInt(req.params.id)
            }
        })
        req.body.pseudonyms.forEach(async element => {
            await Pseudonym.create({
                authorId: parseInt(req.params.id),
                pseudonym: element,
            })
        });
        res.json(req.body);
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