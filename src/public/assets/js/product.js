const productsContainer = document.querySelector('#products');
const baseURL = 'http://localhost:3000'
// const fetchProducts = async () => {
//     const response = await fetch(`${baseURL}/api/products`);
//     const products = await response.json();
//     return products;
// };

const renderProduct = async (product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productName = document.createElement('h2');
    productName.classList.add('product-name');
    productName.textContent = product.name;

    const productQuantityDiv = document.createElement('div');
    productQuantityDiv.classList.add('product-details-div');
    const productQuantityLabel = document.createElement('p');
    productQuantityLabel.textContent = "Quantity in Stock: ";
    const productQuantity = document.createElement('p');
    productQuantity.classList.add('product-quantity');
    productQuantity.textContent = product.quantity_in_stock;
    productQuantityDiv.appendChild(productQuantityLabel);
    productQuantityDiv.appendChild(productQuantity);

    const productPriceDiv = document.createElement('div');
    productPriceDiv.classList.add('product-details-div');
    const productPriceLabel = document.createElement('p');
    productPriceLabel.textContent = "Unit Price: ";
    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = `$${product.unit_price}`;
    productPriceDiv.appendChild(productPriceLabel);
    productPriceDiv.appendChild(productPrice);

    productCard.appendChild(productName);
    productCard.appendChild(productQuantityDiv);
    productCard.appendChild(productPriceDiv);

    productsContainer.appendChild(productCard);
};

const init = () => {
    // const products = await fetchProducts();
    // console.log(products);
    // products.forEach(renderProduct);
    fetch(`${baseURL}/api/products`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(renderProduct);
        })
        .catch(error => console.error(error));
};

init();
