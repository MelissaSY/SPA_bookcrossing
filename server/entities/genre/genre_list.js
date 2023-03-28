const Genre = require('./genre');
const storage = require('../../storage/mysql_manager')

let genres = [];

const searchGenre = (propName, value) => {
    let genre = null;
    let i = 0;
    while(i < genres.length && genres[i][propName] !== value) {
        i++;
    }
    if(i < genres.length) {
        genre = genres[i];
    }
    return genre;
}

const addToList = (name) => {
    let id = getNextId();
    let newGenre = new Genre(id, name);
    genres.push(newGenre);
    try {
        storage.addGenre(newGenre);
    } catch(err) {
        throw err;
    }
}

const getAllGenres = async () => {
    genres.length = 0;
    await storage.getAllGenre()
    .then((dbGenres) => {
        for(let dbGenre of dbGenres[0]) {
            genres.push(
                new Genre(
                    dbGenre.id_genre, 
                    dbGenre.name_genre
                )
            )
        }
    })
    .catch((err) => {
        throw  err;
    });
    return genres;
}

const deleteGenre = (id) => {
    let i = 0;
    while(i < genres.length && genres[i].id !== id) {
        i++;
    }

    if(i < genres.length) {
        genres.splice(i, 1);
        try {
            storage.deleteGenre(id);
        } catch(err) {
            throw err;
        }
    }
}

const getNextId = () => {
  let maxId = -1;
  for(let genre of genres) {
      if(genre.id > maxId) {
          maxId = genre.id;
      }
  }
  maxId++;
  return maxId;
}

const updateGenre = (id, genre) => {
    let i = 0;
    while(i < genres.length && genres[i].id !== id) {
        i++;
    }
    if(i < genres.length) {
        genres[i] = genre;
        try {
            storage.editGenre(genre);
        } catch(err) {
            throw err;
        }
    }
}

module.exports = {
    addToList,
    getAllGenres,
    deleteGenre,
    updateGenre,
    searchGenre,
};