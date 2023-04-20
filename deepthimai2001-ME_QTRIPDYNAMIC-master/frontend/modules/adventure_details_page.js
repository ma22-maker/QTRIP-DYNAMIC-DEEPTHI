import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search);
  const params = new URLSearchParams(search);
  const cityid =params.get('adventure');
 // console.log(cityid);
  return(cityid);

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // Place holder for functionality to work in the Stubs
  console.log(config.backendEndpoint+"/adventures/detail?adventure="+adventureId);
  try{
    const  result = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=`+adventureId);
    const data = await result.json();
    //console.log(data);
   return data;
     }
     catch(err){
       return null;
     }
   
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
const h1tag = document.getElementById("adventure-name");
h1tag.textContent=adventure.name;
const ptag = document.getElementById("adventure-subtitle");
ptag.textContent=adventure.subtitle;


//console.log(adventure.images.length);
const content = document.getElementById("photo-gallery");

for (let i=0;i< adventure.images.length ; i++){

const divele = document.createElement("div");
divele.id=[i];
// divele.className="activity-card-image";
const imgele = document.createElement("img");
imgele.src=adventure.images[i];
imgele.alt=adventure.name+"picture";
imgele.className="activity-card-image";
divele.append(imgele);
content.append(divele);

// const content = document.getElementById("adventure-content");
// content.textContent= adventure.content;

}
const det = document.getElementById("adventure-content");
det.textContent= adventure.content;


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
//console.log(images);
const a = document.getElementById("photo-gallery");
a.innerHTML=``;
const b = document.createElement("div");
a.append(b);
b.className="carousel slide";
b.id="carouselExampleIndicators";
b.setAttribute("data-bs-ride","carousel");


const c = document.createElement("div");
c.className="carousel-indicators";
b.appendChild(c);


for(let i=0;i< images.length ;i++){
  const b1= document.createElement("button");
  b1.setAttribute("type","button");


  if(i === 0)
  {
    b1.setAttribute("data-bs-target","#carouselExampleIndicators");
    b1.setAttribute("data-bs-slide-to",`${i}`);
    b1.className="active";
    b1.setAttribute("aria-current","true");
    b1.setAttribute("aria-label","Slide "+`${i+1}`);
    c.appendChild(b1);
  }
  else{
    b1.setAttribute("data-bs-target","#carouselExampleIndicators");
    b1.setAttribute("data-bs-slide-to",`${i}`);
    b1.setAttribute("aria-label","Slide "+`${i+1}`);
    c.appendChild(b1);
  }
//c.appendChild(b1);

}

const d= document.createElement("div");
d.className="carousel-inner";
b.append(d);

for(let i=0;i< images.length ;i++){

  if(i === 0)
  {
   const d1= document.createElement("div");
   d1.className="carousel-item active";
   const pic = document.createElement("img");
   pic.src=images[i];
   pic.alt=i;
   pic.className="activity-card-image";
   d1.appendChild(pic);
   d.append(d1);
  
  }
  else{
    const d1= document.createElement("div");
    d1.className="carousel-item";
    const pic = document.createElement("img");
    pic.alt=i;
    pic.className="activity-card-image";
    pic.src=images[i];
    d1.appendChild(pic);
    d.append(d1);
  }
//c.appendChild(b1);
}
const e= document.createElement("div");
b.append(e);
e.innerHTML=`<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>`;


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
 const mypage1 = document.getElementById("reservation-panel-sold-out");
 const mypage2 = document.getElementById("reservation-panel-available");

if (adventure.available){
mypage1.style.display = "none";
mypage2.style.display = "block";

const costperhead = document.getElementById("reservation-person-cost");
costperhead.textContent = adventure.costPerHead;
}
else
{
mypage2.style.display="none";
mypage1.style.display = "block";
 }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
 const cost = adventure.costPerHead*persons;
document.getElementById("reservation-cost").textContent=cost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
const myForm = document.getElementById("myForm");
myForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const name = this.elements['name'].value;
  const person = this.elements['person'].value;
  const date = this.elements['date'].value;
  //console.log(name +" "+person);
 const data = {
  name : name,
  date : date,
  person :person,
  adventure :adventure.id,
 };
 //console.log(data);
 const url = config.backendEndpoint+"/reservations/new";
//console.log(url);
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)

};
fetch(url,options)
  .then(response=>{
   if(response.ok)
   {
   console.log("success");
   alert("Success");
   location.reload(); 
  }
   else {
    throw new Error("Failed to make reservation");
     }

  } 
    )
  // .then (data => console.log(data))
  .catch(err => {
    console.log("failed");
    alert("Failed!");
  }
    )

});


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const disp = document.getElementById("reserved-banner") 
  if (adventure.reserved){
   disp.style.display="block";
   }
   else{
    disp.style.display="none";
   }
   
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
