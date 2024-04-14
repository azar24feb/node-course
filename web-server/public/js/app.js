console.log('Client Side JS is Loaded!!')


// fetch('http://reqres.in/api/users?page=2').then((response) => {
//     response.json().then((data) => {
//          console.log(data.data)
//     })
// })



//Work with the input form
const weatherForm = document.querySelector('form') // this is the first form
const search = document.querySelector('input') // this is the first input, means it checks one by one
// const message1 = document.querySelector('p') //this is the first p, this won't work, so use ID in p
const message1 = document.querySelector('#message1') //# is used to select id, . is used for class
const message2 = document.querySelector('#message2')

// message1.textContent = 'From Client Side JS'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() // default behaviour of browser is to refresh page after submit. this code prevents it
    const input = search.value
    console.log(input)

    //Http call after taking the input
    fetch('http://localhost:3000/products').then((response) => {
        response.json().then((data) => {
            if (!data.error) {
                console.log(data)
                console.log(input)
                message1.textContent = data[0].email
            }
        })
    })

    
})

// console.log(weatherForm)
