document.addEventListener('DOMContentLoaded', function() {
    
    //variables to be captured and added
    const addMovieForm = document.getElementById('addMovieForm'); 
    const movieTable = document.getElementById('movieTable');
    const tbody = movieTable.querySelector('tbody');

    let movies= []; //empty array to store the movies


    // this handles the submissions from the form
    addMovieForm.addEventListener('submit',function(event) {
        event.preventDefault();

        const movieName = document.getElementById('movieName').value.trim();
        const movieRate = document.getElementById('movieRate').value.trim();

        //add the movie to the array
        movies.push({name: movieName, rating: movieRate});

        //clears the inputs
        addMovieForm.reset();

        //refreshes the table
        renderTable();
    });


    // functions that deals with entering the movies to the table
    function renderTable() {
        
        tbody.innerHTML = ''; // clears the rows first

     
        movies.forEach((item, index) => {   // adds to the rows
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.rating}</td>
            <td>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
        });
    }

    // the delete button 
    window.deleteItem = function(index) {
        movies.splice(index, 1);
        renderTable();
    };
  





    
});


  