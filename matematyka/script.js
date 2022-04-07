// Create event listener for click in button id = "btn-check"
document.getElementById("btn-check").addEventListener("click", function() {
    // Check if number is negative, a zero or a positive number
    // The input id = "a" convert to string
    if (document.getElementById("a").value < 0) {
        // If number is negative, show alert
        alert("Liczba jest ujemna");
    }
    else if (document.getElementById("a").value == 0) {
        // If number is zero, show alert
        alert("Liczba jest równa zero");
    }
    else {
        // If number is positive, show alert
        alert("Liczba jest dodatnia");
    }
})