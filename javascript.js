let nickname = prompt("Welcome to Marvel, What is your name?");
if (nickname != null) {
  document.getElementById("welcome").innerText =
    "Hello " + nickname + ", welcome to the Marvel Search Engine" + "!";
}


logo.addEventListener('mouseenter', () => {
  logo.src = 'images/logo2.jpg';
});

logo.addEventListener('mouseleave', () => {
  logo.src = 'images/logo.jpg';
});

const cards = document.querySelectorAll('.card');
[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});

//

const input = document.querySelector("#input");
const button = document.querySelector("#button");
const section = document.querySelector("#section");

async function getDataFromServer(userInput) {
  var pubkey = "6354ef8d02fe26b9df9dbdef92a700a5";
  var pvtkey = "186e65c0d809345c92077ee004681733548d9cb2";
  var ts = new Date().getTime();
  var message = ts + pvtkey + pubkey;
  var a = CryptoJS.MD5(message);
  const response = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?name=${userInput}&apikey=6354ef8d02fe26b9df9dbdef92a700a5&ts=${ts}&hash=${a.toString()}`,
    {}
  );
  const data = await response.json();
  return data;
}

button.addEventListener("click", async () => {
  let responseFromServer = await getDataFromServer(input.value);
  console.log(responseFromServer);
  const createHeroHtml = (hero, description, image) => `
  <div class="hero-div">
        <div class="left"><h1>${hero}</h1> <p>${description}</p></div>
        <div class ="right""><img src = "${image}" class="herothumbnail"/></div>
      </div> <br>

  <section class="comicslist"> 
 <div class="comicsinfo">
  <img src="https://upload.wikimedia.org/wikipedia/en/a/aa/Hulk_%28circa_2019%29.png"/>
  <h3> Comic Title</h3> <br>
  <p> Lorem ipsum </p>
</div> 

<div class="comicsinfo">
<img src="https://upload.wikimedia.org/wikipedia/en/a/aa/Hulk_%28circa_2019%29.png"/>
<h3> Comic Title</h3> <br>
<p> Lorem ipsum </p>
</div> 

<div class="comicsinfo">
<img src="https://upload.wikimedia.org/wikipedia/en/a/aa/Hulk_%28circa_2019%29.png"/>
<h3> Comic Title</h3> <br>
<p> Lorem ipsum </p>
</div> 

</section>
`;
  const hero = responseFromServer.data.results[0].name;
  const description = responseFromServer.data.results[0].description;
  const image = responseFromServer.data.results[0].thumbnail.path;
  const URL = responseFromServer.data.results[0].thumbnail.extension;
  const imageURL = image + "." + URL;
  const divHtml = createHeroHtml(hero, description, imageURL);
  section.innerHTML = divHtml;
});

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//