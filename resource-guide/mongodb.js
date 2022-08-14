//CRUD opration test

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {ObjectID, MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.toHexString())
// console.log(id.id)

MongoClient.connect(connectionURL, { useNewURLParser : true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to Database : ' + error)
    }

    console.log('Connection Correct!')

    const db = client.db(databaseName)

    // db.collection('users').updateOne({
    //     _id: new ObjectID('62ed50129757b9e38b247525')
    // },
    // {
    //     $inc: {
    //         age: -4
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // },
    // {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        age: 24
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})