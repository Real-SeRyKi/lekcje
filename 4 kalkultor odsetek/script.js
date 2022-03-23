const kwota = document.getElementById("deposited")
const time = document.getElementById("time")
const oprocentownie = document.getElementById("oprocentowanie")

const output = document.getElementById("wynik")

const btn = document.querySelector("button")

Number.prototype.round = function (places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
}

btn.addEventListener("click", () => {
    output.value = ((((kwota.value * (time.value * 30) * oprocentownie.value) / 365) / 100) * 0.81).round(2)
})