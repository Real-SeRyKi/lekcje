const slowa = [
    "test",
    "śliwka",
    "gruszka"
]

class Wisielec {
    /**
     * Klasa do gry w wisielca
     * @param {String} haslo 
     * @param {Array} litery 
     */
    constructor(haslo = "test", litery = []) {
        this.haslo = haslo.toLowerCase()
        this.pokazanehaslo = haslo.split("").map(a => "_")
        this.litery = litery
        this.koniec = false
        this.zycia = 11
    }

    guess(litera) {
        if (!this.haslo.includes(litera.toLowerCase())) return false
        let arr = this.pokazanehaslo
        this.haslo.split("").forEach((letter, index) => {
            if (letter.toLowerCase() === litera.toLowerCase()) arr[index] = letter.toLowerCase()
        })
        this.pokazanehaslo = arr
        if (!this.pokazanehaslo.includes("_")) {this.koniec = true; return true}
        
        return arr
    }
    
}

let gra = new Wisielec(slowa[Math.floor(Math.random() * slowa.length)])

$(".literki").text(gra.pokazanehaslo.join(" "))
$(".key").on("click", (event) => {
    //console.log(gra.koniec)
    if (gra.koniec) return
    if ($(event.target).hasClass("green") || $(event.target).hasClass("gray")) return
    let result = gra.guess($(event.target).text())
    //console.log(result)
    if (result === false) {
        if (--gra.zycia === 0) {
            gra.koniec = true
            $(".wisielec").attr("src", `./zdjecia/wisielec${gra.zycia}.png`)
            return $(".literki").text(gra.haslo)
        }
        $(".wisielec").attr("src", `./zdjecia/wisielec${gra.zycia}.png`)
        return $(event.target).addClass("gray")
    }
    $(event.target).addClass("green")
    if (result === true) {
        return $(".literki").text(gra.haslo)
    }
    return $(".literki").text(result.join(" "))
})

$(".nowagra").on("click", () => {
    gra = new Wisielec(slowa[Math.floor(Math.random() * slowa.length)], [])
    $(".wisielec").attr("src", `./zdjecia/wisielec11.png`)
    $("button").each((i, event) => {
        $(event).removeClass("gray")
        $(event).removeClass("green")
    })
    $(".literki").text(gra.pokazanehaslo.join(" "))
})