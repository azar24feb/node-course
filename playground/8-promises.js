//Example with Callback

const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('Callback error!', undefined) 
        callback(undefined, 'Callback success!!')
    }, 1500)
}

doWorkCallback((error, result) => {
     if(error){
        return console.log(error)
     }
     console.log(result)
})


//**************************************** */
// Example with Promise

/** resolve is called when no error, reject is called when there is error
    you can only call resolve or reject, can't call both, or can't call one method twice
    A promise is PENDING until resolve/reject is called
    If resolve is called, promise is FULFILLED
    if reject is called promise is REJECTED
*/
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Promise Success!!')
        reject('Promise Error!!')
    }, 1500)
})

//then calls the resolve method, i.e when it is success
//catch calls the reject method, i.e when it is error
doWorkPromise.then((result) => {
    console.log(result) 
}).catch((error) => {
     console.log(error)
})