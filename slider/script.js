function fadeOutSliderWithtimeout(slider, timeout) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            $(slider).fadeOut(500);
            resolve();
        }, timeout);
    })
}
function fadeInSliderWithTimeout(slider, timeout) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            $(slider).fadeIn(500);
            resolve();
        }, timeout);
    });
}
async function nextRandomSlide(slider) {
    await fadeInSliderWithTimeout(slider, 500);
    slider.innerHTML = `<img src="./cdn/${Math.ceil(Math.random() * 10)}.png">`;

    setTimeout(async () => {
        await fadeOutSliderWithtimeout(slider, 500);
        nextRandomSlide(slider);
    }, 4000)
}

nextRandomSlide(document.getElementById("slider"));