
var checkboxes = [].slice.call(document.querySelectorAll("input[type='checkbox']"));
var button_reserve = document.getElementById("reserve");
var button_release = document.getElementById("release");
var booked_up = document.createElement("div");
booked_up.className = "booked_up";


/***********************
 ****** FUNCTIONS ******
 **********************/

function paintChargeBars(){

     var statusBars = document.getElementsByClassName('charge-bar');
     Array.prototype.forEach.call(statusBars, element => {

         var chargeVal = element.innerHTML;

           if ( 75 <= chargeVal && chargeVal <= 100){
             element.classList.toggle("good");
           }
           else if( 35 <= chargeVal  && chargeVal < 75 ){
             element.classList.toggle("medium");
           }
           else if (chargeVal < 35) {
             element.classList.toggle("low");
           }

       const widthUnit = 0.5;
       element.style.width = chargeVal * widthUnit + "%";
   });
 }

/* make checkbox inputs behave as radio buttons */
function checkboxToRadio(obj) {

   if(obj.checked == true) {

      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      obj.checked = true;
   }
}


function getSelected(){

    checkboxes = [].slice.call(document.querySelectorAll("input[type='checkbox']"));
    var checked = false;

    checkboxes.forEach((checkbox) => {

      if (checkbox.checked){ checked = checkbox;}
    });
    return checked;
}


function reserveScooter(selected){

      var selectedRow = selected.closest(".row");
      var chargeVal = selectedRow.getElementsByClassName("charge-bar")[0].innerHTML;

      if (chargeVal < 35){
        alert("ATTENZIONE! il monopattino è quasi scarico, sarà necessario attendere la ricarica prima di poterlo usare");
        var answer = window.confirm("Prenotare ugualmente?");
        if (!answer){
          return;
        }
      }
      alert("Monopattino prenotato! Sarai avvisato quando tornerà ad una base");
      button_reserve.disabled = true;
      selected.checked = false;
      selectedRow.className += " selected";
      selectedRow.appendChild(booked_up);
}


function releaseScooter(selected){

      if (selected != false){
        button_release.disabled = false;
      }

      var selectedRow = selected.closest(".row");
      var scooterText = selectedRow.getElementsByTagName("h2")[0].innerHTML;
      var utente = scooterText.split(" ")[1];

      alert(`Hai annullato la prenotazione del monopattino usato da ${utente}`);
      button_release.disabled = true;
      button_reserve.disabled = false;
      selected.checked = false;
      selectedRow.className = "row";
}





/***********************
 *** EVENT LISTENERS ***
 **********************/

document.addEventListener('DOMContentLoaded', (event) => { paintChargeBars(event) });


document.getElementsByTagName("main")[0].addEventListener('click', function(event){

    var checked;
    if (event.target.tagName = "INPUT"){
      checked = event.target;
      checkboxToRadio(checked);

      var selectedRow = checked.closest(".row");

      if (checked.checked && selectedRow.className == "row selected"){
        button_release.disabled = false;
      }
    }
});


button_reserve.addEventListener('click', (event) => {

    selected = getSelected();

    if (selected == false){
        alert("seleziona prima uno dei monopattini");
    }
    else {
        reserveScooter(selected);
    }
});


button_release.addEventListener('click', (event) => {

      selected = getSelected();

      if (selected == false){
          alert("devi selezionare il monopattino prenotato");
      }
      else {
          releaseScooter(selected);
      }
});
