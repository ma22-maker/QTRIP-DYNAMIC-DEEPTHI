import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const result = await fetch(`${config.backendEndpoint}/reservations/`);
    const data = await result.json(); 
    console.log(data);
    return(data);
      }
    catch(err)
    {
     return null;
     }
  // Place holder for functionality to work in the Stubs
 
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
      const noreserv = document.getElementById("no-reservation-banner");
      const table = document.getElementById("reservation-table-parent");
      
      if (reservations.length === 0) {
        noreserv.style.display = "block";
        table.style.display = "none";
      } else {
        noreserv.style.display = "none";
        table.style.display = "block";
        
        // Clear existing rows from the table

        const tablebody = document.getElementById("reservation-table");
        // Add new rows for each reservation
        for(let i=0;i<reservations.length;i++){

          const row = document.createElement("tr");
          // row.id=reservations[i].id;
          // Add columns for reservation ID, adventure name, date of booking, booking time, etc.
          const idCol = document.createElement("td");
          idCol.textContent = reservations[i].id;
          row.append(idCol);
          
          const advCol = document.createElement("td");
          advCol.textContent = reservations[i].name;
          row.append(advCol);
         
          const Col2 = document.createElement("td");
          Col2.textContent = reservations[i].adventureName;
          row.append(Col2);

          const Col3 = document.createElement("td");
          Col3.textContent = reservations[i].person;
          row.append(Col3);

          const Col4 = document.createElement("td");
          const inputDateStr = reservations[i].date;
          const inputDate = new Date(inputDateStr);
          const day = inputDate.getDate().toString();
          const month = (inputDate.getMonth() + 1).toString();
          const year = inputDate.getFullYear().toString();
          const outputDateStr = `${day}/${month}/${year}`;
          Col4.textContent =outputDateStr;
          row.append(Col4);

          const Col5 = document.createElement("td");
          Col5.textContent = reservations[i].price;
          row.append(Col5);

          const Col6 = document.createElement("td");
          const Str = reservations[i].time;
          const input = new Date(Str);
          const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
            //timeZoneName: "short",
            //hourCycle: 'h12' // To use 12-hour format
          };
          const out = input.toLocaleDateString("en-IN", options).replace(" at",",");
          //console.log(out);
          Col6.textContent = out;
          row.append(Col6);

          
          const Col7 = document.createElement("td");
          Col7.id = `${reservations[i].id}`;
          // Col7.textContent = reservations[i].person;
          //Col7.id= `${reservations[i].adventure}`;
          const alink=document.createElement("a");
          // alink.className="reservation-visit-button";
          // alink.id=`${reservations[i].id}`;
          // alink.href="../detail/?adventure="+`${reservations[i].adventure}`;
          alink.href=`../detail/?adventure=${reservations[i].adventure}`
          const button = document.createElement("button");
          button.className="reservation-visit-button";
          button.textContent="Visit Adventure";
          alink.append(button);
          Col7.append(alink);
          row.append(Col7);

          tablebody.appendChild(row);
        };
        
      }
}

export { fetchReservations, addReservationToTable };
