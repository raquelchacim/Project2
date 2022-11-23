let nickname = prompt("Welcome to Marvel, What is your name?");
if (nickname != null) {
  document.getElementById("welcome").innerText =
    "Hello " + nickname + ", welcome to the Marvel Search Engine" + "!";
}
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
  (section.innerHTML = responseFromServer.data.results[0].description),
});

const createHeroHtml = (hero, description) => `
  <div class="card">            
        <div><h1>${hero}</h1></div>
        <div><h1>${description}</h1></div>
      </div> 
`;
getData(input.value).then((data) => {
  const hero = responseFromServer.data.results[0].name;
  const description = responseFromServer.data.results[0].description;
  const divdHtml = createHeroHtml(hero, description);
  section.innerHtml = divHtml;
});
