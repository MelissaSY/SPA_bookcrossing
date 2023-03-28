let Author = require("./author.js");
const storage = require("../../services/storage/mysql_manager");

let authors = [];

const getNextId = () => {
    let maxId = -1;
    for(let author of authors) {
        if(author.id > maxId) {
            maxId = author.id;
        }
    }
    maxId++;
    return maxId;
}

const getAllAuthors = async () => {
    authors.length = 0;
    let author_pseudonyms = (await storage.getAllPseudonyms())[0];
    await storage.getAllAuthors()
    .then((dbAuthors) => {
        for(let dbAuthor of dbAuthors[0]) {
            let pseudonyms = [];
            let dbPseudonyms = author_pseudonyms.filter(element => element.id_author === dbAuthor.id_author);
            dbPseudonyms.forEach(element => {
                pseudonyms = [...pseudonyms, element.pseudonym]
            }); 
            authors.push(
                new Author(
                    dbAuthor.id_author,
                    pseudonyms,
                    dbAuthor.name,
                    dbAuthor.surname,
                    dbAuthor.patronymic
                )
            )
        }
    })
    .catch((err) => {
        throw err;
    })
    return authors;
}

const searchAuthor = (propName, value) => {
    let author = null;
    let i = 0;
    while(i < authors.length && authors[i][propName] !== value) {
        i++;
    }
    if(i < authors.length) {
        author = authors[i];
    }
    return author;
}

const addAuthor = (pseudonyms, name='', surname='', patronymic='') => {
    let id = getNextId();
    let newAuthor = new Author(id, pseudonyms, name, surname, patronymic);
    authors.push(newAuthor);
    try {
        storage.addAuthor(newAuthor);
    } catch(err) {
        throw err;
    }
}

const deleteAuthor = (id) => {
    let i = 0;
    while(i < authors.length && authors[i].id !== id) {
        i++;
    }

    if(i < authors.length) {
        authors.splice(i, 1);
        try {
            storage.deleteAuthor(id);
        } catch(err) {
            throw err;
        }
    }
}

const updateAuthor = (id, author) => {
    let i = 0;
    while(i < authors.length && authors[i].id !== id) {
        i++;
    }
    if(i < authors.length) {
        authors[i] = author;
        storage.editAuthor(author);
    }
}

module.exports = {
    addAuthor,
    getAllAuthors,
    deleteAuthor,
    updateAuthor,
    searchAuthor,
};
