const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('mongoose');
const url = 'mongodb+srv://narkisburla:narkisis@cluster0.g1lbfun.mongodb.net/svshop';
const port = 4001;
db.connect(url).then(() => console.log('db is on'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('pages'));


app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/signup.html');
})


app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/pages/products.html');
})

app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/pages/buy.html');
})




// creating schema:
const userSchema = new db.Schema({
    userName: String,
    userEmail: String,
    userPassword: String
})

// creating model:
const userModel = db.model('users', userSchema);


// receiving data from html
// checking if userEmail is already exist on db and if the other fields are empty -
//  if not - insert userDetails to db
app.post('/userDetails', async (req, res) => {
    let userToAdd = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword

    }


    let userEmailFound = await userModel.findOne({ userEmail: req.body.userEmail });
    res.json(userEmailFound);
    if (userEmailFound == null && userToAdd.userName != '' && userToAdd.userPassword != '') {
        await userModel.insertMany(userToAdd);
    }

})

// receiving data from html
// checking if user email and password already exist on db
app.post('/checkUserExistence', async (req, res) => {
    let userToAdd = {
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword
    }


    let existenceOfUserEmail = await userModel.findOne({ userEmail: req.body.userEmail });
    let existenceOfUserPassword = await userModel.findOne({ userPassword: req.body.userPassword });
    let existentDetails = false;
    if (existenceOfUserEmail != null && existenceOfUserPassword != null) {
        existentDetails = true;
    }

    res.json(existentDetails);

})



// creating schema:
const productSchema = new db.Schema({
    productName: String,
    price: Number
})

// creating model:
const productModel = db.model('products', productSchema);

// insert a list of products to db:
const addProducts = async () => {

    let productsArr = [
        { productName: 'Bread', price: 15 },
        { productName: 'Milk', price: 7 },
        { productName: 'Butter', price: 11 },
        { productName: 'Honey', price: 30 },
        { productName: 'White cheese', price: 13 },
        { productName: 'Yellow cheese', price: 32 },
        { productName: 'Oil', price: 14 }
    ]

    // to avoid a situation the list duplicate itself every time the server is on,
    // there is a validation to find if one of the objects already exist on db and if not -
    // insert the list to db:
    let existOfProduct = await productModel.find({ productName: 'Bread' });
    if (existOfProduct == null) {
        await productModel.insertMany(productsArr);
    }
}

addProducts();


//sending all the data exist on the 'products' collection
app.post('/showProductsOnWeb', async (req, res) => {

    let productNameFromDB = await productModel.find();
    res.json(productNameFromDB);
})


// creating schema:
const invitationSchema = new db.Schema({
    fullName: String,
    products: String

})

// creating model:
const invitationModel = db.model('invitations', invitationSchema);


// insert the user selected products and his name to the 'invitations' collection.
app.post('/insertInvitation', async (req, res) => {

    let temp = {
        fullName: req.body.fullName,
        products: req.body.products
    }
    await invitationModel.insertMany(temp);

})






app.listen(port, () => console.log(`server work on ${port}`));