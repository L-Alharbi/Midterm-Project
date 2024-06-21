document.addEventListener("DOMContentLoaded", function() {

    const darkModeSwitch = document.getElementById('btnSwitch');
    const darkMode = localStorage.getItem('darkMode') === 'true';

    if (darkMode) { //checks if dark mode was enabled on a previous page
        document.documentElement.setAttribute('data-bs-theme','dark');
        darkModeSwitch.checked = true;
      }
    
    document.getElementById('btnSwitch').addEventListener('click',()=>{
        if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
            document.documentElement.setAttribute('data-bs-theme','light')
            localStorage.setItem('darkMode', 'false');
        }
        else {
            document.documentElement.setAttribute('data-bs-theme','dark')
            localStorage.setItem('darkMode', 'true');
        }
    })
});
