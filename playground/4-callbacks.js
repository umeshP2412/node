// setTimeout(() => {
//     debugger
//     console.log('Two seconds are up')
// }, 2000)

// const names = ['Andrew', 'Joe', 'Jess']
// const shortNames = names.filter((name) => {
//     return name.length <=4
// })

// console.log(shortNames)
// const geocode = (address, callback) => {
//     setTimeout(() => {
//             const data = {
//             latitude: 0,
//             longitude: 0
//         }
//         callback(data);
//     }, 1999)
// }

// const data = geocode('California', (data)=> {
//     console.log(data)
// });

const add = (x, y, callback) => {
    setTimeout(()=> {
        const sum = x+y
        callback(sum)
    }, 2000);
}

const sumResult = add(1, 4, (sum) => {
    console.log(sum)
})

