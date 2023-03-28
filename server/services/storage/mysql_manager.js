'use strict';
const mysql = require('mysql2');
const util = require('util');
const dbName = 'bookcrossing'

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "bookcrossing",
    password: "0852369QSC(",
}).promise();

const addBook= async (book, added_by=null) => {
    let sql=`INSERT INTO ${dbName}.books(id, title, isbn, annotation, has_cover, cover_path, added_by)
    VALUES (${book.id}, "${book.title}", '${book.isbn}', '${book.annotation}', ${book.hasimage ? 1 : 0}, '${book.filepath}', ${added_by})`;
    return await pool.execute(sql)
    .then(async (res) => {
        if(book.genre.length > 0) {
            sql = `INSERT INTO ${dbName}.genre_book(id_genre, id_book) VALUES `;
            for(let genre of book.genre) {
                await pool.execute(sql.concat(`(${genre}, ${book.id})`))
            }
        }
        if(book.authors.length > 0) {
            sql = `INSERT INTO ${dbName}.author_book(id_author, id_book) VALUES `;
            for(let author of book.authors) {
                await pool.execute(sql.concat(`(${author}, ${book.id})`))
            }
        }
    })
    .catch((err) => {
        console.log(err);
    });
};


const addGenre = async (genre) => {
    let sql =`INSERT INTO genres(id_genre, name_genre) VALUES (${genre.id}, '${genre.name}')`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }
};

const addAuthor = async (author) => {
    let sql =`INSERT INTO authors(id_author, name, surname, patronymic)
     VALUES (${author.id}, '${author.name}', '${author.surname}', '${author.patronymic}')`;
    try {
        await pool.execute(sql);
        sql = `INSERT INTO pseudonyms (id_author, pseudonym) VALUES`;
        for(let pseudonym of author.pseudonyms) {
            await pool.execute(sql.concat(`(${author.id}, '${pseudonym}')`));
        }
    } catch(err) {
        throw err;
    }
};

const deleteBook = async (id)=> {
    let sql =`DELETE FROM books WHERE id = ${id}`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }
};

const deleteGenre = async (id)=> {
    let sql =`DELETE FROM genres WHERE id_genre = ${id}`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }
};


const deleteAuthor = async (id)=> {
    let sql =`DELETE FROM authors WHERE id_author = ${id}`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }
};

const deletePseudonym = async (id, pseudonym)=> {
    let sql =`DELETE FROM authors WHERE id_author = ${id} AND pseudonym = ${pseudonym}`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }
};


const editBook= async (book)=>{
    let sql =`UPDATE books SET title = "${book.title}", isbn = '${book.isbn}', annotation = '${book.annotation}',
    has_cover = ${book.hasimage ? 1 : 0}, cover_path = '${book.filepath}' WHERE id = ${book.id}`;
    try {
        await pool.execute(sql)
        sql = `DELETE FROM genre_book WHERE id_book = ${book.id}`;
        await pool.execute(sql)
        .then(async () => {
            if(book.genre.length > 0) {
                sql = `INSERT INTO ${dbName}.genre_book(id_genre, id_book) VALUES `;
                for(let genre of book.genre) {
                    await pool.execute(sql.concat(`(${genre}, ${book.id})`))
                }
            }
        })
        sql = `DELETE FROM author_book WHERE id_book = ${book.id}`;
        await pool.execute(sql)
        .then(async () => {
            if(book.authors.length > 0) {
                sql = `INSERT INTO ${dbName}.author_book(id_author, id_book) VALUES `;
                for(let author of book.authors) {
                    await pool.execute(sql.concat(`(${author}, ${book.id})`))
                }
            }
        })
        return;
    } catch(err) {
        throw err;
    }
};

const editAuthor = async (author) => {
    let sql =`UPDATE authors SET name = '${author.name}', surname = '${author.surname}',
     patronymic = '${author.patronymic}' WHERE id_author = ${author.id}`;
    try { 
        await pool.execute(sql)
        .then(async ()=>{
            sql = `DELETE FROM pseudonyms WHERE id_author = ${author.id}`;
            await pool.execute(sql);
            sql = `INSERT INTO pseudonyms (id_author, pseudonym) VALUES`;
            for(let pseudonym of author.pseudonyms) {
                await pool.execute(sql.concat(`(${author.id}, '${pseudonym}')`));
            }
        })
    } catch(err) {
        throw err;
    }
}

const editGenre = async (genre)=>{
    let sql =`UPDATE genres SET name_genre = '${genre.name}' WHERE id_genre = ${genre.id}`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }
};

const getAllBooks = async () => {
    let sql = `SELECT * FROM books`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }
};

const getAllAuthors = async () => {
    let sql = `SELECT * FROM authors`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }

}

const getAllGenre = async () => {
    let sql = `SELECT * FROM genres`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }
};


const getBookGenre = async () => {
    let sql = `SELECT * FROM genre_book`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }
};

const getBookAuthor = async () => {
    let sql = `SELECT * FROM author_book`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }
};

const getAllPseudonyms = async () => {
    let sql = `SELECT * FROM pseudonyms`;
    try {
        return await pool.execute(sql)
    } catch(err) {
        throw err;
    }
} 

module.exports = {
    addBook, addGenre, addAuthor,
    getAllBooks, getAllGenre, getAllAuthors, getAllPseudonyms,
    getBookGenre, getBookAuthor,
    editGenre, editBook, editAuthor,
    deleteBook, deleteGenre, deleteAuthor,
    deletePseudonym,
};

