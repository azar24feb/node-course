const yargs = require('yargs')
const fs = require('fs')
const notesUtil = require('./notes.js')

//customize yargs version
yargs.version('1.1.0')

//add, remove, read, list notes

//create Add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    //options for our add command, --title, --body
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note!',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.removeNote(argv.title)
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note!',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.readNote(argv.title)
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'List all notes!',
    handler() {
        notesUtil.listNotes()
    }
})

// console.log(yargs.argv);
yargs.parse()





















/*

//using command line arguments
const command = process.argv[2]

if (command === 'add') {
    console.log('Adding Note!');
} else if (command === 'remove') {
    console.log('Removing Note!');
}

//using validator
const validator = require('validator')
console.log(validator.isEmail('abc@cde.fgh'))

const chalk = require('chalk')
const notes = require('./notes')

console.log(notes())
console.log(chalk.green.bgRed.bold('Success!'))
console.log(chalk.green('Success!'))

console.log(process.argv)
*/