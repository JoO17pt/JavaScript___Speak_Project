import languageOptions from "./data.js";

let favoriteArray = [];

window.addEventListener("load", (e) => {
  JSON.parse(localStorage.getItem("SpeakApp")).forEach((entry) => {
    save(entry[0], entry[1]);
  });
});

// Build the "Select" form with the available voices

const languageSelect = document.querySelector("select");
languageSelect.innerHTML += languageOptions;

const initialButtons = document.querySelector("#initialButtons");
const helpMessage = document.querySelector("#helpMessage");

initialButtons.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName !== "DIV") {
    if (
      document.querySelector("input").value.trim() === "" ||
      document.querySelector("select").value === "Select the voice"
    ) {
      helpMessage.classList.remove("displayNone");
    } else {
      helpMessage.classList.add("displayNone");
      if (e.target.innerText === "Speak") {
        speak(
          document.querySelector("input").value.trim(),
          document.querySelector("select").value
        );
      } else
        save(
          document.querySelector("input").value.trim(),
          document.querySelector("select").value
        );
    }
  }
});

function speak(text, voice) {
  let recentSection = document.querySelector("#recent");
  responsiveVoice.speak(text, voice);
  if (recentSection.classList.contains("displayNone") === true)
    recentSection.classList.remove("displayNone");
  recentSection.innerHTML += `

    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${text}</h5>
            <p class="card-text">
                ${voice}
            </p>
            <div id="recentButtons">
                <button class="btn btn-primary">Speak</button>
                <button class="btn btn-primary">Save</button>
          </div>
        </div>
    </div>
    `;
}

function save(text, voice) {
  let favoriteSection = document.querySelector("#favorites");
  if (favoriteSection.classList.contains("displayNone") === true)
    favoriteSection.classList.remove("displayNone");
  favoriteArray.push([text, voice]);
  localStorage.setItem("SpeakApp", JSON.stringify(favoriteArray));
  favoriteSection.innerHTML += `

    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${text}</h5>
            <p class="card-text">${voice}</p>
            <div id="favoriteButtons">
                <button class="btn btn-primary">Speak</button>
                <button class="btn btn-primary">Remove</button>
          </div>
        </div>
    </div>
    
    `;
}

const main = document.querySelector("main");
main.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (e.target.innerText === "Speak") {
      speak(
        e.target.parentElement.parentElement.children.item(0).innerText,
        e.target.parentElement.parentElement.children.item(1).innerText
      );
    } else if (e.target.innerText === "Save") {
      save(
        e.target.parentElement.parentElement.children.item(0).innerText,
        e.target.parentElement.parentElement.children.item(1).innerText
      );
    } else if (e.target.innerText === "Remove") {
      let i = 0;
      while (i < favoriteArray.length) {
        if (
          favoriteArray[i][0] ===
            e.target.parentElement.parentElement.children.item(0).innerText &&
          favoriteArray[i][1] ===
            e.target.parentElement.parentElement.children.item(1).innerText
        ) {
          favoriteArray.splice(i, 1);
          localStorage.setItem("SpeakApp", JSON.stringify(favoriteArray));
          break;
        } else i++;
      }

      e.target.parentElement.parentElement.parentElement.remove();

      if(document.querySelector("#favorites").lastElementChild.innerText==="Favorites") document.querySelector("#favorites").classList.add('displayNone');
    }
  }
});
