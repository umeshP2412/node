const fs = require('fs');
const chalk = require('chalk');

const getNotes = (title) => {
    const notes = loadNotes();
    RequestedNote = notes.filter((note) => note.title.toLowerCase() === title.toLowerCase());
    if(RequestedNote.length)
    {
        console.log(chalk.blue.bold.inverse(RequestedNote[0].title));
        console.log(chalk.blue(RequestedNote[0].body));
    }
    else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const listNotes = () =>{
    const notes = loadNotes()
    notes.forEach(element => {
        console.log(element.title);
    });
}

function addNote(title, body){
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note)=>{
        return note.title === title;
    })
    const duplicateNote = notes.find(note => {return note.title === title})

    if(duplicateNotes.length === 0){

        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New Note Added!')
    }
    else{
        console.log('Note title taken!')
    }
}

function saveNotes(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON);
}

function loadNotes(){

    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    }
    catch{
        return [];
    }

}

function deleteNote(title){
    const notes = loadNotes();
    const notesToKeep = notes.filter((note)=>{
        return note.title !== title;
    })
    if(notes.length !== notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.green.bold.inverse('Note removed'))
    }
    else{
        console.log(chalk.red.bold.inverse('Note Doesn\'t exist'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    deleteNote: deleteNote,
    listNotes: listNotes
}