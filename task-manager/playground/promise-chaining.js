require('../src/db/mongoose')
const { update } = require('../src/models/user')
const User = require('../src/models/user')

// User.findByIdAndUpdate('62f4dbf7b14cc52e241b6241', { age: 2}).then((user) => {
//     console.log(user)

//     return User.countDocuments({age: 2})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age})
    const count = await User.countDocuments({age: age})
    return count
}

updateAgeAndCount('62f4dbf7b14cc52e241b6241', 3).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})