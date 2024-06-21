
let sortDirection = {
    name: 'asc',
    rating: 'asc'
};

// sorts depending on which col index
function sortTable(column) {
    const columnIndex = {
        name: 0,
        rating: 1
    }[column];

    
    const table = document.getElementById('movieTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // toggles between asc / desc
    sortDirection[column] = sortDirection[column] === 'asc' ? 'desc' : 'asc';

    resetSortIcons();
    updateSortIcon(column, sortDirection[column]);

    // sorts based on value 
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim().toLowerCase();
        const cellB = rowB.cells[columnIndex].textContent.trim().toLowerCase();

        if (column === 'name') {
            return sortDirection[column] === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        } else if (column === 'rating') {
            return sortDirection[column] === 'asc' ? parseFloat(cellA) - parseFloat(cellB) : parseFloat(cellB) - parseFloat(cellA);
        }
    });

    rows.forEach(row => tbody.appendChild(row));
}

// resets the icon
function resetSortIcons() {
    document.getElementById('nameSortIcon').innerHTML = '&uHar;';
    document.getElementById('ratingSortIcon').innerHTML = '&uHar;';
}

//switches the arrow icon depending on asc/desc
function updateSortIcon(column, direction) {
    const iconId = column === 'name' ? 'nameSortIcon' : 'ratingSortIcon';
    const icon = document.getElementById(iconId);
    icon.innerHTML = direction === 'asc' ? '&uHar;' : '&dHar;';
}
