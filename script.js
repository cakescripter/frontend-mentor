// Function to filter images based on selected tags
function filterImages(selectedTags) {
    const gridItems = document.querySelectorAll('.grid > div');

    gridItems.forEach(item => {
        const itemTags = item.getAttribute('data-tags').split(' ');

        // If the item contains all the selected tags, show it; otherwise, apply the filter
        if (selectedTags.every(tag => itemTags.includes(tag))) {
            item.style.opacity = 1;
            item.style.filter = 'none'; // Remove the black and white filter
        } else {
            item.style.opacity = 0.5; // Set lower opacity for non-matching items
            item.style.filter = 'grayscale(100%)'; // Apply black and white filter to non-matching items
        }
    });
}

// Function to handle checkbox change and call filterImages()
function handleCheckboxChange(event) {
    event.preventDefault(); // Prevent the default behavior of the checkboxes refreshing the page

    // Get all the selected checkboxes
    const checkboxes = document.querySelectorAll('.filter-bar input[type="checkbox"]');
    const selectedTags = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.getAttribute('id').split('-')[0]);

    filterImages(selectedTags); // Call the filterImages() function with the selected tags
}

// Add event listeners to checkboxes when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.filter-bar input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange); // Call handleCheckboxChange() when any checkbox is changed
    });
});