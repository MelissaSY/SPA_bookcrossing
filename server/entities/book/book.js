class Book {
    constructor(id, title, genre=[],  isbn='', annotation ='', filepath='', hasImage = false, authors=[]) {
        this.title = title;
        this.authors = authors;
        this.isbn = isbn;
        this.id = id;
        this.annotation = annotation;
        this.genre = genre;
        this.filepath = filepath;
        this.hasimage = hasImage;
    }
}

module.exports = Book;