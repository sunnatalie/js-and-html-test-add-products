
const PRODUCT_KEY = 'products';

loadProducts();

function loadProducts(){

    const products = getProductsFromStorage();
    displayProducts(products);
    itemBox.focus();
}

function addProducts(){

    // validate

    const isValid = validate();
    if(!isValid) return;

    // create object

    const product = getProducts();
    const products = getProductsFromStorage();

    // add object to array

    products.push(product);

    // display new array
    displayProducts(products);

    // save ingredients to storage
    saveProductstoStorage(products);

    // clear form
    clearForm();
}

function getProducts(){

    const item = itemBox.value;
    const price = priceBox.value;
    const category = categorySelect.value;
    const link = linkBox.value;

    return {item,price,category,link};

}

function displayProducts(products){

    tableBody.innerHTML = '';

    for(let i = 0; i < products.length; i++){

        const row = `
        <tr>
            <td>${products[i].item}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td><img src="${products[i].link}" width=20%></td>

            <td>
                <button id="${i}" class="button" value="delete" onclick="deleteRow(this)">Delete</button>
            </td>
        </tr>
        `;

        tableBody.innerHTML += row;
    }
}

function deleteRow(button) {
    const index = button.id;
    const products = getProductsFromStorage();
    products.splice(index,1);
    displayProducts(products);
    saveProductstoStorage(products);
    }

function validate(){

    const item = itemBox.value;
    const price = priceBox.value;
    const category = categorySelect.value;
    const link = linkBox.value;

    if(item === ''){
        alert('Please enter an item');
        return false;
    }
    if(price === ''){
        alert('Please enter a number');
        return false;
    }
    if(category === ''){
        alert('Please enter a category');
        return false;
    }
    if(link === ''){
        alert('Please enter a link');
        return false;
    }

    return true;
}


function getProductsFromStorage(){

    const str = localStorage.getItem(PRODUCT_KEY);
    const products = ( str === null) ? [] : JSON.parse(str);

    return products;

}


function saveProductstoStorage(allProducts){

    const str = JSON.stringify(allProducts);

    localStorage.setItem(PRODUCT_KEY,str);
}


function clearForm(){

    itemBox.value = '';
    priceBox.value = '';
    categorySelect.value = '';
    linkBox.value = '';
    itemBox.focus();
}