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

    const productQuantity = document.createElement('p');
    productQuantity.classList.add('product-quantity');
    productQuantity.textContent = product.quantity_in_stock;

    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = `$${product.unit_price}`;

    productCard.appendChild(productName);
    productCard.appendChild(productQuantity);
    productCard.appendChild(productPrice);

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
