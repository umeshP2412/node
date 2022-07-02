const chalk = require('chalk');
const { string, argv } = require('yargs');
//const { string } = require('yargs');
const yargs = require('yargs')
const notes = require('./notes.js');


// console.log(process.argv);
yargs.version('1.0.0');
// console.log(yargs.argv);


//create a add command
yargs.command({
    command: 'add',
    describe: 'It will add note to Notes',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove note from Notes',
    builder: {
        title: {
            description: 'Provide title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.deleteNote(argv.title);
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'List out all notes',
    handler(){
        notes.listNotes();
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'Read your notes',
    builder:{
        title:{
            description: 'provide title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(){
        notes.getNotes(argv.title);
    }
})

yargs.parse()
