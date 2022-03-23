const input = document.getElementsByClassName("input")[0]
const output = document.getElementsByClassName("output")[0]
/**
 * Oblicza wartos z inputa
 * @param {String} input 
 * @returns Integer
 */
let oblicz = (input) => {
    input.split("").forEach(letter => {
        if (isNaN(letter) && !["+", "-", "*", "/", " "].includes(letter)) return alert("Input przyjmuję tylko symbole i cyfry")
    })
    return eval(input) //! Zmien to
}

document.addEventListener("keypress", (e) => {
    //console.log(e.keyCode)
    if (e.keyCode == 13) {
        if (input.value == "") return
        try {
            let wynik = oblicz(input.value)
            
            if (wynik.toString().split("").length >= 5) {
                output.style.fontSize = "20vm"
            } else if (wynik.toString().split("").length >= 7) {
                output.style.fontSize = "10vm"
            }
            output.textContent = wynik
        } catch (err) {
            alert(err)
        }

    }
})