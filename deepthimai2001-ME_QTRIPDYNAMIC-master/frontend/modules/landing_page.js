import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(config.backendEndpoint+"/cities");
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
const result = await fetch(`${config.backendEndpoint}/cities`);
const data = await result.json(); 
return(data);
  }catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
const content =document.getElementById("data");
// const  divelement =document.createElement("div");
// content.appendChild(divelement);
const responsive = document.createElement("div")
responsive.className = "col-6 col-lg-3 col-sm-4 mb-3";
content.append(responsive);
const imgelement =document.createElement("a");
responsive.appendChild(imgelement);
imgelement.id=id;
imgelement.href="pages/adventures/?city="+id;
imgelement.className="tile";

const img = document.createElement("img");
img.src=image;
img.alt=city;
imgelement.appendChild(img);


const textele =document.createElement("div");
textele.className="tile-text ";
imgelement.append(textele);
const idalink =document.createElement("a");
idalink.href="pages/adventures/?city="+id;
idalink.textContent=city;
textele.appendChild(idalink);

const pele = document.createElement("p");
pele.textContent=description;
textele.appendChild(pele);

}

export { init, fetchCities, addCityToDOM };
