import languageOptions from "./data.js";

// console.log(languageOptions);
console.log("Teste");

const button = document.querySelector('button');
console.log(button);

const languageSelect = document.querySelector('select')
languageSelect.innerHTML += languageOptions;

button.addEventListener('click', teste);

function teste () {
    responsiveVoice.speak("Teste", "Brazilian Portuguese Female");
    console.log("Fui clicado")
}

document.querySelector('h1').innerText = "Muda o texto"