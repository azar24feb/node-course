// const square = function(x) {
//     return x*x
// }

//Like Lambda expression of Java
// const square = x => x*x
// const square = (x) => {
//     return x*x
// }

// console.log(square(3))

//Arrow functions do not bind with their own "this" keyword, in the below example this.name is undefined
//but if we use function(){} then this.name is printed
const event = {
    name: 'Birthday Party',

    //here in this arrow function, this.name is undefined
    // printGuest: () => {
    //     console.log('Guest list for ' + this.name)
    // }

    guestList:  ['Asmita', 'Somnath', 'Soumya'],
    //this is an alternate syntax which has access to "this" keyword
    printGuest() {
        console.log('Guest list for ' + this.name)
        this.guestList.forEach(
            x => console.log(x + ' is attending ' + this.name)
        )
    }
}

event.printGuest()