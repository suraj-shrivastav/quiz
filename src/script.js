document.getElementById('toggleButton').onclick = function() {
    const sidebar = document.getElementById('sidebar');
    
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        document.getElementById('main').style.marginLeft = '0'; // Reset main margin
    } else {
        sidebar.classList.add('open');
        document.getElementById('main').style.marginLeft = '250px'; // Adjust main margin
    }
};
