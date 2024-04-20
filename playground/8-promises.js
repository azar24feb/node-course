//Example with Callback

const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('Callback error!', undefined) 
        callback(undefined, 'Callback success!!')
    }, 1500)
}

doWorkCallback((error, result) => {
    if (error) {
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

/** 888888888888888888888888888888888888888888888888888888888888
 * PROMISE CHAINING
 */

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 1500)
    })
}

// This is nested Promise 
add(5, 6).then((sum) => {
    console.log('Nested Promise: ' + sum)

    add(sum, 10).then((sum2) => {
        console.log('Nested Promise: ' + sum2)
    }).catch((err) => {
        console.log(err)
    })
}).catch((err) => {
    console.log(err)
})

//Promise chaining
add(5, 6).then((sum) => {
    console.log('Promise Chaining: ' + sum)
    return add(sum, 10) // this is returning a promise
}).then((sum2) => {
    console.log('Promise Chaining: ' + sum2)
}).catch((err) => {
    console.log(err)
})