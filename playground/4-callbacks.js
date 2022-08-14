const doWorkCallBack = (callback) => {
    setTimeout(() => {
        // callback('An error occured!', undefined)
        callback(undefined, ['Success!', 4, 5, true, {fruit: 'apple'}])
    }, 2000)
}

doWorkCallBack((error, result) => {
    if(error){
        return console.log(error)
    }

    console.log(result);

})