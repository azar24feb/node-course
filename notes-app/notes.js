
const fs = require('fs')

const getNotes = function(){
    return 'Your Notes...'
}

const addNote = function(title, body) {
    const notes = loadNotes()

    //filter will return notes with same title as input
    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

    //if title already exists, it will populate inside duplicateNotes array
    if (duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note is added!')
    } else {
        console.log('Note title is already taken!')
    }    
}

const removeNote = function() {
    
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = function () {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote
}