export default function FilterAuthors (author, inputString) {
    return (
        (author.surname+' '+ author.name).toLowerCase().includes(inputString.toLowerCase()) ||
        (author.name+' '+ author.surname).toLowerCase().includes(inputString.toLowerCase()) ||
        author.pseudonyms.some((element) => element.toLowerCase().includes(inputString.toLowerCase()))
    )
}
