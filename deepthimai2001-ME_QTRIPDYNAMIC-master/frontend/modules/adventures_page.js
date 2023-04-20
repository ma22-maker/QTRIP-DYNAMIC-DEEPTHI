
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
console.log(search);
const params = new URLSearchParams(search);
const city =params.get('city');
return(city);



}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // console.log (config.backendEndpoint+"/adventures?city="+city);
  try{
 const  result = await fetch(`${config.backendEndpoint}/adventures?city=`+city);
 const data = await result.json();
 //console.log(data);
return data;
  }
  catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
//console.log(adventures);
  const content =document.getElementById("data");
  adventures.forEach(element => {
  //console.log(element);

   const divcol =document.createElement("div");
   divcol.className="col col-lg-3 col-md-6 col-xs-12";
   content.appendChild(divcol);

   const card = document.createElement("div")
   card.className = "card mb-3";
   divcol.appendChild(card);

   const alink = document.createElement("a");
   alink.href="detail/?adventure="+element.id;
   alink.alt=element.name;
   alink.className="activity-card";
   alink.id=element.id;

   const img = document.createElement("img");
   img.src= element.image;
   img.alt=element.name;
   img.className = "card-img-top"

   alink.append(img);
   card.append(alink);

   const detail = document.createElement("div");
  //  detail.className="category-banner";
   const catagory = document.createElement("p");
   catagory.textContent=element.category;
   catagory.className="category-banner";
   detail.append(catagory);
   card.append(detail);
   
   const news = document.createElement("div");
   news.className="card-body d-flex flex-row  justify-content-between pb-0";

   const name = document.createElement("p");
   name.textContent=element.name;
   name.className="card-text ";

   const costPerHead = document.createElement("p");
   costPerHead.textContent="₹"+element.costPerHead;
   costPerHead.className="card-text";

   news.append(name,costPerHead);
   card.append(news);

   const news2 = document.createElement("div");
   news2.className="card-body d-flex flex-row  justify-content-between pb-0";

   const duration = document.createElement("p");
   duration.textContent="Duration";
   duration.className="card-text";
   
   const duehours = document.createElement("p");
   duehours.textContent=element.duration+"Hours";
   duehours.className="card-text";

   news2.append(duration,duehours);
   card.append(news2);

  });
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(list);
  const filteredList = list.filter(adventure => {
    const duration = parseInt(adventure.duration); // Convert duration to integer
    return ((duration >= low) && (duration <= high)); // Check if duration falls within range
  });

  return (filteredList);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
 console.log(categoryList);
 console.log(list[0].category);

 if (categoryList.length === 0) {
  return list;
  }
  return list.filter(adventure => categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // filterByDuration(list,)
  //console.log(filters);
  //console.log(filters["category"]);
//list = filterByCategory(list,filters["category"]);
// console.log(list);
let filteredList = list;

  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters.duration) {
    const durationArray = filters.duration.split('-'); 
    const low = parseInt(durationArray[0]); 
    const high = parseInt(durationArray[1]); 
    //console.log (low +""+high);
    filteredList = filterByDuration(filteredList, low, high);
  }
  
  if (filters.category && filters.category.length > 0) {
    filteredList = filterByCategory(filteredList, filters.category);
  }

  return filteredList;

  // Place holder for functionality to work in the Stubs
 // return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters', JSON.stringify(filters));
  return true;

}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const storedValue = window.localStorage.getItem('filters');
  //console.log(storedValue);
  const parsedValue = JSON.parse(storedValue);
  //console.log(parsedValue);
  return(parsedValue); 

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
  if(filters.duration){
    const rename = document.getElementById("duration-select");
    rename.value = filters.duration;
      }
  
  if(filters.category && filters.category.length > 0){
  const listappend =document.getElementById("category-list");
  // listappend.className="category-filter";
  for(let i=0; i<filters["category"].length;i++)
  {
  const ptag = document.createElement("p");
  ptag.className="category-filter";
  ptag.textContent=(filters["category"][i]);
  listappend.append(ptag);

  }
}

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
