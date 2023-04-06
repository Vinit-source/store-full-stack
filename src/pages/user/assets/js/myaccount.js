// Header generation code - Refer header.js
const title = document.querySelector('.store-title');

title.addEventListener('click', () => {
    window.location.href = '../../../index.html';
});

const userId = JSON.parse(window.localStorage.getItem("userId"));
const profile = document.querySelector('.profile');

if (userId) {
    profile.innerHTML = `<i class="fa-solid fa-user fa-xl"></i>`;

    const userIcon = document.querySelector('.fa-xl');

    userIcon.addEventListener('click', () => {
        const dropdownContent = document.querySelector('.menu');
        dropdownContent.style.display = 'flex';
    });

    userIcon.addEventListener('mouseout', () => {
        const dropdownContent = document.querySelector('.menu');
        dropdownContent.style.display = 'none';
    });

    const dropdownContent = document.querySelector('.menu');
    dropdownContent.addEventListener('mouseover', () => {
        dropdownContent.style.display = 'flex';
    });

    dropdownContent.addEventListener('mouseout', () => {
        dropdownContent.style.display = 'none';
    })


    const logout = document.getElementById("logout");
    logout.addEventListener('click', () => {
        window.localStorage.removeItem("userId");
        window.location.reload();
    });


    const myAccount = document.getElementById("my-account");
    myAccount.addEventListener('click', () => {
        window.location.href = "./myaccount.html";
    });

} else {
    profile.innerHTML = `<button class="login-btn" onclick="window.location.href = './login.html'">Login</button>`;
}

// Main section code
// Fetch and Render User's Orders 
const ordersContainer = document.getElementById("user-orders");

renderOrder = (order) => {
    const orderCard = document.createElement('div');
    orderCard.classList.add('order-card');

    const productName = document.createElement('h2');
    productName.classList.add('product-name');
    productName.textContent = order.name;


    const orderDateDiv = document.createElement('div');
    orderDateDiv.classList.add('order-details-div');
    const orderDateLabel = document.createElement('p');
    orderDateLabel.textContent = "Order Date: ";
    const orderDate = document.createElement('p');
    orderDate.classList.add('order-date');
    const date = new Date(order.order_date);
    const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    console.log(formattedDate); // Output: "04/06/2023"
    orderDate.textContent = formattedDate;
    orderDateDiv.appendChild(orderDateLabel);
    orderDateDiv.appendChild(orderDate);

    const orderQuantityDiv = document.createElement('div');
    orderQuantityDiv.classList.add('order-details-div');
    const orderQuantityLabel = document.createElement('p');
    orderQuantityLabel.textContent = "Quantity Ordered: ";
    const orderQuantity = document.createElement('p');
    orderQuantity.classList.add('order-quantity');
    orderQuantity.textContent = order.quantity;
    orderQuantityDiv.appendChild(orderQuantityLabel);
    orderQuantityDiv.appendChild(orderQuantity);

    const orderPriceDiv = document.createElement('div');
    orderPriceDiv.classList.add('order-details-div');
    const orderPriceLabel = document.createElement('p');
    orderPriceLabel.textContent = "Unit Price: ";
    const orderPrice = document.createElement('p');
    orderPrice.classList.add('order-price');
    orderPrice.textContent = `$${order.unit_price}`;
    orderPriceDiv.appendChild(orderPriceLabel);
    orderPriceDiv.appendChild(orderPrice);

    orderCard.appendChild(productName);
    orderCard.appendChild(orderDateDiv);
    orderCard.appendChild(orderQuantityDiv);
    orderCard.appendChild(orderPriceDiv);


    ordersContainer.appendChild(orderCard);

}

document.addEventListener('DOMContentLoaded', () => {
    const baseURL = "http://localhost:3000"
    fetch(`${baseURL}/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            // if (res.ok) {
            //     alert('Success!');

            // } else {
            //     alert('Failed.');
            // }
            return res.json();
        })
        .then(data => {
            console.log(data);
            data.result.forEach(renderOrder);
        })
        .catch(error => {
            console.error(error);
        });
});