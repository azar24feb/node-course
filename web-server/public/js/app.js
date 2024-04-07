console.log('Client Side JS is Loaded!!')


// fetch('http://reqres.in/api/users?page=2').then((response) => {
//     response.json().then((data) => {
//          console.log(data.data)
//     })
// })

fetch('http://localhost:3000/products').then((response) => {
    response.json().then((data) => {
        if (!data.error) {
            console.log(data)
        }
    })
})

//Work with the input form
const weatherForm = document.querySelector('form')

console.log(weatherForm)
