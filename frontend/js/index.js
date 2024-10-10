document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productGrid = document.getElementById('product-grid');
            productGrid.innerHTML = ''; // Clear previous products

            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: Ksh.${product.price}</p>
                    <button>View Details</button>
                `;
                productGrid.appendChild(productItem);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});

// Fetch products and display them
fetch('/get-products')
    .then(response => response.json())
    .then(products => {
        const productGrid = document.getElementById('product-grid');
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            
            productItem.innerHTML = `
                <img src="/uploads/${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Description: ${product.description}</p>
                <p>Price: Ksh.${product.price}</p>
                <button onclick="viewDetails(${product.id})">View Details</button>
            `;
            
            productGrid.appendChild(productItem);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

// Redirect to product-details.html
function viewDetails(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

AOS.init({
    duration: 1200, // Duration of animations
});
