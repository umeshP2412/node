require('../src/db/mongoose')
const Task = require('../src/models/task')
const { countDocuments } = require('../src/models/user')

// Task.findByIdAndDelete('62f4dcbca4583b11a735112a').then((query) => {
//     console.log(query)
//     return Task.countDocuments({ comepleted: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('62f52afb94515bc5776c2008').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})