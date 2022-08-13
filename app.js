const button = document.querySelector('button');
console.log(button);

button.addEventListener('click', teste);

function teste () {
    responsiveVoice.speak("Teste", "Brazilian Portuguese Female");
}