setTimeout(() => {
    console.log('2 sec up!')
}, 2000)

//method inside fitler is a callback function, but it is not asynchronous
const names = ['Andrew', 'Jen', 'Jess']
const shortNames = names.filter(x => x.length <= 4)
// console.log(shortNames)

//geoCode is a function which takes a callback function as an argument

//Implementation with callback
const geoCode = (address, callback) => {
    //setTimeout is used as a dummy for HTTP, or DB calls
    setTimeout(() => {
        const data = {
            lat: 0,
            long: 0
        }
        //**calling the callback function, it will execute once the setTimeout executes
        callback(data)
    }, 2000)
}

geoCode('Bangalore', (data) => {
    console.log(data)
})

//Challenge
//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (a,b,callback) => {
    setTimeout(() => {
        callback(a+b) 
    }, 2000) 
}

add(1, 4, (sum) => {
    console.log('Sum is : ' + sum) // Should print: 5
})
console.log('hey log' + encodeURIComponent('azar 34'))

//Implementation without callback
/*
const geoCode1 = (address) => {
    const data = {
        lat: 0,
        long: 0
    }
    return data
}

const data = geoCode1('Bangalore')
console.log(data)
*/