const button = document.getElementsByClassName("submit")[0]
let input = {
    name: document.getElementById("name"),
    surname: document.getElementById("surname"),
    address: document.getElementById("address"),
    tel: document.getElementById("tel"),
}
let table = {
    osoba: document.getElementsByClassName("osoba")[0],
    dane: document.getElementsByClassName("dane")[0]
}


function update() {
    if (input.name.value == "" || input.surname.value == "" || input.address.value == "" || input.tel.value == "") return alert("Nie można dodać niczego!")
    let osobatd = document.createElement("td")
    osobatd.textContent = input.name.value + " " + input.surname.value
    let danetd = document.createElement("td")
    danetd.textContent = `Adres: ${input.address.value}, Telefon: ${input.tel.value}`
    table.osoba.appendChild(osobatd)
    table.dane.appendChild(danetd)
}
button.addEventListener("click", () => {
    update()
})

document.addEventListener("keypress", (key) => {
    if (key.keyCode == 13) {
        update()
    }
})