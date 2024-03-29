
const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = function () {
    return 'Your Notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()

    //filter will return notes with same title as input
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

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

const removeNote = function (title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })
    if (notes.length === notesToKeep.length) {
        console.log(chalk.bgRed('No Notes found!'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen(('Note removed : ' + title)))
    }

}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

//Export the methods outside
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}