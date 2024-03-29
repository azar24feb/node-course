
const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = () => 'Your Notes...'

const addNote = (title, body) => {
    const notes = loadNotes()

    //filter will return notes with same title as input
    const duplicateNotes = notes.filter(note => note.title === title)
    //find checks for the first match, hence better performance | this can be used to improve the code
    const duplicateNote = notes.find(note => note.title === title)
    /*
    if (!duplicateNote) add
    else title taken
    */

    //if title already exists, it will populate inside duplicateNotes array
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note is added!')
    } else {
        console.log(chalk.red('Note title is already taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(note => note.title !== title)
    
    if (notes.length === notesToKeep.length) {
        console.log(chalk.bgRed('No Notes found!'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen(('Note removed : ' + title)))
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgWhite.red('Your Notes!'))
    notes.forEach(x => console.log(chalk.bold(x.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(x => x.title === title)
    //undefined is false in if condition
    if (note){
        console.log(chalk.bold.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('No Notes Found!'))
    }
}

//Export the methods outside
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}