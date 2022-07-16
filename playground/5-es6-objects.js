//object property shorthand

const name = "Umesh";
const userAge = 23;

const user = {
    name,
    age: userAge,
    location: 'Ahmedabad'
}

console.log(user);

//object destructuring

const product = {
    label: 'Red notebook',
    price: 78,
    stock: 278,
    salesPrice: undefined,
    rating: 3.5
}

// const label = product.label
// const stock = product.stock

const {label:productLabel, salesPrice, rating = 5} = product
//console.log(label)  //it will give error as label:productLabel is destructer label to productlabel
console.log(productLabel) //this will work as now label-->productLabel
console.log(salesPrice)
console.log(rating) //default value is given and that will be used only if value is not given in object above


//destructuring object at argument place while function

const transaction = (type, {label, price}) => {
    console.log(type, label, price)
}

transaction('order', product);