class Author {
    constructor(id, pseudonyms=[], name='', surname='', patronymic='') {
        this.id = id;
        this.name = name;
        this.surname= surname;
        this.pseudonyms = pseudonyms;
        this.patronymic = patronymic;
    }
}
module.exports = Author;