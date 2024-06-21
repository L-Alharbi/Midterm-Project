document.addEventListener('DOMContentLoaded', function() {
    const addMovieForm = document.getElementById('addMovieForm');
    const movieTable = document.getElementById('movieTable');
    const tbody = movieTable.querySelector('tbody');
    const suggestionsList = document.getElementById('suggestionsList');

    let movies = [];
    const apiKey = '420f4cc7d9189cb0caa8d0aea3d77e85' ; 

    // deals with the submitton
    addMovieForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const movieName = document.getElementById('movieName').value.trim();
        const movieRate = document.getElementById('movieRate').value.trim();
        movies.push({ name: movieName, rating: movieRate });
        addMovieForm.reset();
        renderTable();
    });

    // add movie to the table
    function renderTable() {
        tbody.innerHTML = '';
        movies.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-column="name" contenteditable="false">${item.name}</td>
                <td data-column="rate" contenteditable="false">${item.rating}</td>
                <td>
                    <button type="button" class="btn btn-success btn-sm" onclick="editItem(${index}, this)">Edit</button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // deletion button 
    window.deleteItem = function(index) {
        movies.splice(index, 1);
        renderTable();
    };

    // editing button
    window.editItem = function(index, button) {
        const row = tbody.children[index];
        const cells = row.querySelectorAll('td[data-column]');

        if (button.textContent === 'Edit') {
            cells.forEach(cell => {
                cell.setAttribute('contenteditable', 'true');
            });
            
            button.textContent = 'Save';
        } else {

            const updatedName = cells[0].textContent.trim();
            const updatedRate = cells[1].textContent.trim();

            movies[index] = { name: updatedName, rating: updatedRate };

            cells.forEach(cell => {
                cell.setAttribute('contenteditable', 'false');
            });
            button.textContent = 'Edit';
        }
    };
    

    // fetches the movie name from the db 
    $('#movieName').on('input', function() {
        const query = $(this).val().trim();
        if (query === '') {
            $('#suggestionsList').empty();
            return;
        }

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                $('#suggestionsList').empty();
                data.results.slice(0, 5).forEach(movie => {
                    const li = $('<li></li>').text(movie.title);
                    li.on('click', function() {
                        $('#movieName').val(movie.title);
                        $('#suggestionsList').empty();
                    });
                    $('#suggestionsList').append(li);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch movie suggestions. Please try again later.');
            });
    });


    
});
