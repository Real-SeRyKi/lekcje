const input = document.getElementsByClassName("input")[0]
const output = document.getElementsByClassName("user")[0]
const button = document.getElementsByClassName("login")[0]

input.addEventListener("change", () => {
    output.textContent = input.value
})

button.addEventListener("click", () => {
    output.textContent = input.value
})
// input.addEventListener("input", () => {
//     output.textContent = input.value
// })