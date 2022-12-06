let nickname = prompt("Welcome to Marvel, What is your name?");
if (nickname != null) {
  document.getElementById("welcome").innerText =
    "Hello " + nickname + ", welcome to the Marvel Search Engine" + "!";
}

logo.addEventListener("mouseenter", () => {
  logo.src = "images/logo2.jpg";
});

logo.addEventListener("mouseleave", () => {
  logo.src = "images/logo.jpg";
});

const cards = document.querySelectorAll(".card");
[...cards].forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("is-flipped");
  });
});

//

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

const input = document.querySelector("#input");
const button = document.querySelector("#button");
const section = document.querySelector("#section");

async function getDataFromServer(userInput) {
  var pubkey = "6354ef8d02fe26b9df9dbdef92a700a5";
  var pvtkey = "186e65c0d809345c92077ee004681733548d9cb2";
  var ts = new Date().getTime();
  var message = ts + pvtkey + pubkey;
  var a = CryptoJS.MD5(message);
  const generalresponse = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?name=${userInput}&apikey=6354ef8d02fe26b9df9dbdef92a700a5&ts=${ts}&hash=${a.toString()}`,
    {}
  );
  const generaldata = await generalresponse.json();
  const comicresponse = await fetch(
    `https://gateway.marvel.com:443/v1/public/comics?characters=${
      generaldata.data.results[0].id
    }&apikey=6354ef8d02fe26b9df9dbdef92a700a5&ts=${ts}&hash=${a.toString()}`,
    {}
  );
  const comicdata = await comicresponse.json();
  console.log(comicdata);
  return {
    api1: generaldata,
    api2: comicdata,
  };
}

button.addEventListener("click", async () => {
  let responseFromServer = await getDataFromServer(input.value);
  console.log(responseFromServer);
  const createHeroHtml = (hero, description, image) => `
  <div class="hero-div">
        <div class="left"><h1>${hero}</h1> <p>${description}</p></div>
        <div class ="right""><img src = "${image}" class="herothumbnail"/></div>
    
      </div>
      <center><h2> Featured Comics </h2></center>
`;
  const createComicHtml = (comicTitle, comicDescription, imageSource) => `
<section class="comicssection"> 
<div class="comicscard">
 <img src="${imageSource}"/>
 <h3>${comicTitle}</h3> <br>
 <p>${comicDescription}</p>
</div> 
</section>
`;
  const hero = responseFromServer.api1.data.results[0].name;
  const description = responseFromServer.api1.data.results[0].description;
  const image = responseFromServer.api1.data.results[0].thumbnail.path;
  const URL = responseFromServer.api1.data.results[0].thumbnail.extension;
  const imageURL = image + "." + URL;
  const divHtml = createHeroHtml(hero, description, imageURL);

  const comicArray = responseFromServer.api2.data.results;
  let comicHtml = "";
  comicArray.forEach((item) => {
    const comicTitle = item.title;
    const comicDescription = item.description;
    const imageSource = item.thumbnail.path;
    const imageExtension = item.thumbnail.extension;
    const imageURLtwo = imageSource + "." + imageExtension;
    comicHtml =
      comicHtml + createComicHtml(comicTitle, comicDescription, imageURLtwo);
  });

  section.innerHTML = divHtml + comicHtml;
});
