document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display all items when the page loads
    fetchAndDisplayItems();
});

async function fetchAndDisplayItems() {
    try {
        // Fetch items from the server
        const response = await fetch('https://medical-api-dev-mqpb.2.ie-1.fl0.io/items');
        const items = await response.json();
        console.log(items)
        // Display items in the HTML
        displayItems(items);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

function displayItems(items) {
    // Clear previous results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Loop through each item and create HTML elements
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        itemDiv.innerHTML = `
            <div id="itemName">${item.nombre}</div>
            <div id="itemCode">Codigo: ${item.codigo}</div>
            <div id="tags"></div>
            <button>Edit</button>
        `;

        resultsDiv.appendChild(itemDiv);
    });
}
