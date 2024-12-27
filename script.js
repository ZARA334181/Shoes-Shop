let btnShop = document.querySelector('#shop');
let order = document.querySelector('.box_order');
let btnclose = document.querySelector('#btnclose');
let btnCancel = document.querySelector('#btnCancel');

btnShop.addEventListener('click', function() {
    order.style.display = 'block';
});
btnclose.addEventListener('click', function() {
    order.style.display = 'none';
});
btnCancel.addEventListener('click', function() {
    order.style.display = 'none';
});

// Product data
let product = [
    { image: './image/shoes1.png', title: 'NIKE1', price: 900.00 },
    { image: './image/shoes2.png', title: 'NIKE2', price: 300.00 },
    { image: './image/shoes3.png', title: 'NIKE3', price: 700.00 },
    { image: './image/shoes4.png', title: 'NIKE4', price: 600.00 },
    { image: './image/shoes5.png', title: 'NIKE5', price: 470.00 },
    { image: './image/shoes6.png', title: 'NIKE6', price: 500.00 },
    { image: './image/shoes7.png', title: 'NIKE7', price: 140.00 },
    { image: './image/shoes8.png', title: 'NIKE8', price: 350.00 },
    { image: './image/shoes23.png', title: 'NIKE9', price: 300.00 },
    { image: './image/shoes17.png', title: 'NIKE10', price: 250.00 },
    { image: './image/shoes19.png', title: 'NIKE11', price: 110.00 },
    { image: './image/shoes20.png', title: 'NIKE12', price: 330.00 },
    { image: './image/shoes24.png', title: 'NIKE13', price: 450.00 },
    { image: './image/shoes14.png', title: 'NIKE14', price: 200.00 },
    { image: './image/shoes15.png', title: 'NIKE15', price: 130.00 },
    { image: './image/shoes16.png', title: 'NIKE16', price: 50.00 },
    
    
];

// Render products
function showProduct() {
    let getItem = '';
    product.forEach(el => {
        getItem += `
            <div class="col-xl-3 col-lg-4 col-md-6 col-12 g-5">
                <div class="card" style="box-shadow: 0 0 8px #c72092;">
                    <div class="card-img-top image p-2" style="display: flex; justify-content: center;">
                        <img src="${el.image}" alt="" style="object-fit: cover; width: 150px; margin: 15px 0; transition: 0.3s;">
                    </div>
                    <div class="card-body text-center">
                        <h2>${el.title}</h2>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <h3>${el.price}.00$</h3>
                        <p style="color: orange;">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </p>
                        <div>
                            <button type="button" class="btn btn-success add-to-cart" style="background: linear-gradient(to right, #c72092, #6c14d0);">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    document.querySelector('#itempro').innerHTML = getItem;
}

showProduct();

const searchInput = document.getElementById('searchInput');
const resultsList = document.getElementById('resultsList');

// Search function
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    resultsList.innerHTML = ''; // Clear previous results

    if (query) {
        const filteredProducts = product.filter(product =>
            product.title.toLowerCase().includes(query)
        );

        filteredProducts.forEach(product => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px;object-fit: cover;" class="img-thumbnail">
                <span>${product.title}</span>
                <span>$${product.price.toFixed(2)}</span>
            `;
            resultsList.appendChild(listItem);
        });

        if (filteredProducts.length === 0) {
            resultsList.innerHTML = '<li>No products found</li>';
        }
    }
});

// Cart functionality
let cart = [];
let totalAmount = 0;

function updateCartDisplay() {
    const cartContainer = document.querySelector('#row_card');
    cartContainer.innerHTML = '';
    cart.forEach((item, index) => {
        cartContainer.innerHTML += `
            <div class="col-10">
                <div class="row d-flex align-items-center border-2 border-dark">
                    <div class="col-4">
                        <img src="${item.image}" alt="" class="w-100 img-thumbnail">
                    </div>
                    <div class="col-5">
                        <h6 class="text-start" style="color: white;">${item.title}</h6>
                    </div>
                    <div class="col-3" style="color: white;">
                        <h6>${item.price} .00$</h6>
                    </div>
                </div>
            </div>
            <div class="col-2 d-flex align-items-center">
                <button type="button" class="btn delete-item" data-index="${index}" style="color: white;">
                    <i class="fa-solid fa-trash-can fs-5"></i>
                </button>
            </div>
        `;
    });
    document.querySelector('.amount').innerHTML = `<h5 style="color: white;">Total:</h5><h5 style="color: white;">${totalAmount}.00$</h5>`;
    addDeleteEventListeners();
}

function addToCart(index) {
    const item = product[index];
    cart.push(item);
    totalAmount += item.price;
    updateCartDisplay();
}

function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-item');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            totalAmount -= cart[index].price;
            cart.splice(index, 1);
            updateCartDisplay();
        });
    });
}

// Add to cart event listeners
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => addToCart(index));
});
