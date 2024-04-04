// Object property shorthand
const name = 'Azar'
const userAge = 30
const user = {
    name, //shorthand for name: name, this only works if property name and variable name are same
    age: userAge,
    location: 'Bangalore'
}

console.log(user)

//Object destructuring
const product = {
    label: 'Red Notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    costPrice: undefined
}

// *************IMPORTANT SYNTAX*************

// const label = product.label
// const stock = product.stock

const { label, stock:productStock, costPrice=5 } = product // alternate way to initialize variables from object, variable and property name MUST MATCH
// stock:productStock is equivalent to productStock = product.stock
//costPrice = 5 -> means default value is 5 if property is not present or property is undefined

console.log('label: ' + label)
console.log('stock: ' + productStock)
console.log('costPrice: ' + costPrice)

/*
const transaction = (type, myProduct) => {
    const{} = myProduct 
}

transaction('order', product)
*/
//the above code can be minimized
const transaction = (type, {label,stock:myStock,costPrice=7}) => {
    console.log('mylabel: ' + label)
    console.log('mystock: ' + myStock)
    console.log('mycostPrice: ' + costPrice)
}

transaction('order', product)