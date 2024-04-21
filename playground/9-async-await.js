/**
 * async creates an async function and in that function we can use the await feature
 */

// const doWork = () => { // this code will return undefined

// }

// const doWork = async () => { //this funtion will return |Promise {undefined}| - promise fulfilled with undefined

// }

const doWork = async () => { //  this function will return Promise { 'Azar!' }. Hence we can use Promise features like then()
    return 'Azar!' // calls the resolve method and then is executed
    // throw new Error('Fucked Up!!') // calls the reject method and catch is executed
}

doWork().then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err.message)
})

//AWAIT example
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0){
                return reject('Numbers must be positive!')
            }
            resolve(a + b)
        }, 1000)
    })
}

const doSomething = async () => {
    const sum = await add(5, 5) //await works with Promises, and then is not needed
    const sum2 = await add(sum, 10)
    const sum3 = await add(sum2, -10) // using await we don't need to Promise chain multiple times
    return sum3
}

doSomething().then((res) => {
    console.log('async-await: ' + res)
}).catch((err) => {
    console.log(err) 
})