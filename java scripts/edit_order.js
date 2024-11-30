// Assuming you have a function that handles item selection
function selectItem(itemName) {
    // Get existing items from local storage
    const existingItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    
    // Add the new item to the array
    existingItems.push(itemName);
    
    // Save back to local storage
    localStorage.setItem('selectedItems', JSON.stringify(existingItems));
}