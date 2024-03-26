

// the function is executed when the user clicked on "sign up":
const goSignUp = () => {
    location.href = '/signup';
}

// the function is executed when the user clicked on "sign in" after insert email and password:
//the function is checking if the user exist on db.
const goSignIn = () => {

    let userEmail = document.getElementById('email').value;
    let userPassword = document.getElementById('password').value;


    fetch('/checkUserExistence', {

        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            userEmail: userEmail,
            userPassword: userPassword
        })
    })
        .then(res => res.json())
        .then((data) => {
            if (data == false || userEmail == '' || userPassword == '') {
                alert('user not found, go signup!')

            } else {
                location.href = '/products';


            }
        })

        .catch((err) => console.log('err'));

}



let nameOnPage;
let priceOnPage;
let productsFromDB = [];


let div;
let allDivsSortByData = [];
let allDivsSortByPrice = [];
let allDivsSortByName = [];
let totalProduct = 0;
let totalPrice = 0;
let selectedProducts = [];


// the function is executed when the page 'products' is load.
// the function is creating div's and insert the products and their prices from db to each div.
// the function is listening if the user clicked a product and then -
//sum all the products he choose, sum the total price, insert into a variable all the chosen products
//  and save all that at the localStorage.
const showListOfProducts = () => {

    let mainDiv = document.getElementById('maimDiv');

    fetch('/showProductsOnWeb', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            productName: nameOnPage,
            price: priceOnPage
        })
    })

        .then(res => res.json())
        .then((data) => {
            mainDiv.innerHTML = '';
            productsFromDB = [];

            for (i = 0; i < data.length; i++) {
                productsFromDB.push(data[i]);
                div = document.createElement('div');
                nameOnPage = document.createElement('h6');
                let spaceBetween = document.createElement('h6');
                priceOnPage = document.createElement('h6');
                div.append(nameOnPage, spaceBetween, priceOnPage);
                mainDiv.append(div);
                allDivsSortByData.push(div);

                nameOnPage.innerHTML = data[i].productName;
                nameOnPage = data[i].productName;
                spaceBetween.innerHTML = '        ';
                priceOnPage.innerHTML = parseInt(data[i].price);
                priceOnPage = parseInt(data[i].price);
            }

            allDivsSortByData.forEach((val) => {
                val.addEventListener('click', () => {
                    totalProduct++;
                    totalPrice += parseInt(val.lastChild.textContent);

                    localStorage.setItem('totalProduct', totalProduct);
                    localStorage.setItem('totalPrice', totalPrice);
                    selectedProducts.push(val.firstChild.textContent);
                    localStorage.setItem('selectedProducts', selectedProducts);
                })
            })
        })
        .catch((err) => console.log('err'));

}

// the function is executed when the user click on 'sort'.
// the function is sorting the displaying products refer to the option the user choose(by price / by name).
// the function is listening if the user clicked a product and then -
//sum all the products he choose, sum the total price, insert into a variable all the chosen products
//  and save all that at the localStorage.
const clickSort = () => {
    let selectedIndex = document.getElementById('select').selectedIndex;
    let options = document.getElementsByTagName('option')[selectedIndex].value;
    let mainDiv = document.getElementById('maimDiv');
    let productsByPrice = [];
    let productsByName = [];


    if (options == 'ByPrice') {
        productsByPrice = productsFromDB.sort((a, b) => a.price - b.price);
        mainDiv.innerHTML = '';
        for (j = 0; j < productsByPrice.length; j++) {
            div = document.createElement('div');
            nameOnPage = document.createElement('h6');
            let spaceBetween = document.createElement('h6');
            priceOnPage = document.createElement('h6');
            div.append(nameOnPage, spaceBetween, priceOnPage);
            mainDiv.append(div);
            allDivsSortByPrice.push(div);

            nameOnPage.innerHTML = productsByPrice[j].productName;
            spaceBetween.innerHTML = '        ';
            priceOnPage.innerHTML = productsByPrice[j].price;

        }

        allDivsSortByPrice.forEach((val) => {
            val.addEventListener('click', () => {
                totalProduct++;
                totalPrice += parseInt(val.lastChild.textContent);
                localStorage.setItem('totalProduct', totalProduct);
                localStorage.setItem('totalPrice', totalPrice);
                selectedProducts.push(val.firstChild.textContent);
                localStorage.setItem('selectedProducts', selectedProducts);

            })

        })

    } else if (options == 'ByName') {

        productsByName = productsFromDB.sort((a, b) =>
            (a.productName < b.productName) ? -1 : (a.productName > b.productName) ? 1 : 0);
        mainDiv.innerHTML = '';

        for (k = 0; k < productsByName.length; k++) {

            div = document.createElement('div');
            nameOnPage = document.createElement('h6');
            let spaceBetween = document.createElement('h6');
            priceOnPage = document.createElement('h6');
            div.append(nameOnPage, spaceBetween, priceOnPage);
            mainDiv.append(div);
            allDivsSortByName.push(div);


            nameOnPage.innerHTML = productsByName[k].productName;
            spaceBetween.innerHTML = '        ';
            priceOnPage.innerHTML = productsByName[k].price;

        }

        allDivsSortByName.forEach((val) => {
            val.addEventListener('click', () => {
                totalProduct++;
                totalPrice += parseInt(val.lastChild.textContent);
                localStorage.setItem('totalProduct', totalProduct);
                localStorage.setItem('totalPrice', totalPrice);
                selectedProducts.push(val.firstChild.textContent);
                localStorage.setItem('selectedProducts', selectedProducts);


            })

        })

    }
}

// the function is executed when the page 'buy' is load.
// the function is displaying the saved data at the localStorage-
// Total product and Total price.
const showTotal = () => {

    let totalProductOnPage = document.getElementById('totalProductOnPage');
    let totalPriceOnPage = document.getElementById('totalPriceOnPage');
    let totalProductFromStorage = localStorage.getItem('totalProduct');
    let totalPriceFromStorage = localStorage.getItem('totalPrice');

    totalProductOnPage.innerHTML = `Total product: ${totalProductFromStorage}`;
    totalPriceOnPage.innerHTML = `Total price: ${totalPriceFromStorage}`;
}


// the function is executed when the user fill in the fields and clicked on signup page. 
// the function is checking if all the fields are fill in and if the userEmail is already exist on db.

const checkEmail = () => {
    let userName = document.getElementById('userName').value;
    let userEmail = document.getElementById('userEmail').value;
    let userPassword = document.getElementById('userPassword').value;


    fetch('/userDetails', {

        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword
        })
    })
        .then(res => res.json())
        .then((data) => {

            if (userName == '' || userEmail == '' || userPassword == '') {
                alert('please fill in all the fields!');
            } else if (data != null && userName != '' && userPassword != '') {
                alert('email is already exist, insert new email!')
            } else if (data == null && userName != '' && userPassword != '') {
                location.href = '/';
                localStorage.setItem('userName', userName);
            }

        })

        .catch((err) => console.log('err'));

}


// the function is executed when the user finished choosing products and clicked the button.
const goBuyProduct = () => {
    location.href = '/buy';


}


// the function is executed when the user clicked on the approve button-
// to approve the displaying number of products and total price.
//  the function is sending the information of the invitation to the right collection on db
const approveButton = () => {

    location.href = '/';
    let userNameInvitation = localStorage.getItem('userName');
    let userProductsInvitation = localStorage.getItem('selectedProducts');

    fetch('/insertInvitation', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            fullName: userNameInvitation,
            products: userProductsInvitation

        })
    })
        .then(res => res.json())
        .then((data) => {

        })
        .catch((err) => console.log(err));

}






