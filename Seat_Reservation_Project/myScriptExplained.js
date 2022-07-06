//The following notes explain the process and logic that was used to create the refactored code in the myscript.js file that is use for this seat reservation web application project.
//The flow of this code will look different then the refactored code used. 
//This code captures how I went about building and testing this project set-by-step.



//Reserved seat data.
let reservedSeats = {
    // You can add objects to hardcode permanently reserved seats and prevent them from being selected by a user. 
};

//Variables needed:
// First, create an array for the rows. 
// Then, create a variable that will hold and generate the HTML inorder to add it into each section. 
// Then a create a counter that will hold each seat number. 

function makeRows(sectionLength, rowLength, placement) {
    const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];
    let html = "";
    let counter = 1;

    //Use a forEach() method to loop through rows. Then, pass in a function that takes an argument that represents each element in the array.
    //Use a switch statment to create the left, middle, and right sections of the reservation program.
    rows.forEach(row => {
        switch (placement) {
            case "left":
                //This creates and adds a div w/ class "label" for the left section/side of the rows.
                html += `<div class="label">${row}</div>`;
                break;
            case "right":
                counter = (rowLength - sectionLength); //This takes the row lenght(15) and subtracts the section length(3) adds the sum(12) to counter.
                break;
            default:
                counter = ((rowLength - sectionLength) / 2); //This takes current counter sum(12), divides by 2 to get the final section lenght for the left side (3). Adds the sum(3) to counter.
                break;
        }
        //Add a for loop here...
        //The loop uses the sectionLength variable to control if it is going to run 3 times (for left or right) or 9 times (for center). 

        for (let i = 0; i < sectionLength; i++) {
            html += `<div class="a" id="${row + counter}">${counter}</div>`;
            counter++;
        }

        //After the for loop runs, it generates all the HTML that is needed to eventually add to the page.
        //The "class =""a"" represents what seats are available. Make sure you have added this class. It will be important later!

        //Both switch statements shown here. Notice that the code just swaps for the left and right options.
        switch (placement) {
            case "left":
                counter = (rowLength - sectionLength); //This takes the row lenght(15) and subtracts the section length(3) adds the sum(12) to counter.
                break;
            case "right":
                html += `<div class="label">${row}</div>`; //This creates and adds a div w/ class "label" for the left section/side of the rows.
                break;
            default:
                counter = ((rowLength - sectionLength) / 2); //This takes current counter sum(12), divides by 2 to get the final section lenght for the left side (3). Adds the sum(3) to counter.
                break;
        }
    });
    // This adds the HTML to the page...
    document.getElementById(placement).innerHTML = html;
}
//Finally, run this function three times, with parameters set for each section and you will get all 300 seats to show up on the page.
makeRows(3, 15, "left");
makeRows(3, 15, "right");
makeRows(9, 15, "middle");

//Next, create a function that does the following: 
// Gets the data (if there is any) from the reservedSeats object.
// Updates the DOM by setting the class on each matching element from "a" (for available) to "r" (for reserved).
// Replaces the contents of each matching element with an "R" to show that seat has been reserved.

(function() {
    "use strict";
    //You can loop through the object like this:
    for (const key in reservedSeats) {
        if (reservedSeats.hasOwnProperty(key)) {
            const obj = reservedSeats[key];
            //console.log(obj.seat);
            // ^^^That will get you each member of the reservedSeats object.
            //You specifically need the seat property inside the object, because the value for each seat matches the ID of each <div> in the DOM.

            //This will allow you to change the classname and innerHTML inside the DOM.
            document.getElementById(obj.seat).className = "r";
            document.getElementById(obj.seat).innerHTML = "R";
        }
    }
}());

// Next, create an empty array so when the user clicks a seat, it add its ID to the array.
// Change the class from "a" to "s".
// Add a new closure statment. 
(function() {
    "use strict";
    // Create an empty array.
    let selectedSeats = [];
    //Create a variable that holds all the seats with the class "a".
    const seats = document.querySelectorAll(".a");

    //Add a click handler to each seat with the class of "a".
    seats.forEach(seat => {
        seat.addEventListener("click", () => {
            console.log(seat.id); //If you console.log the seat.id, you get just the ID, which is what you want.
            //Get the id of the clicked seat.
            //Run seatSelectionProcess that adds or removes it to/from the array.
        });
    });

    //Passing in the seat ID:
    // Pass the seat.id into the seatSelectionProcess function and alert that out. 
    // Look up the indexOf() array method and use that for this section. 
    //Create a function that runs when someone clicks a seat.

    function seatSelectionProcess(thisSeat) {
        //Use an "if" statement that will only add items to the array that DO NOT already have the class “r” on them (note the "!" at the beginning of the statement). 
        if (!document.getElementById(thisSeat).classList.contains("r")) {

            //Add this line and then click on any seat, you'll get a -1, that's is because there is nothing in the array at the moment. 
            //Temporarily add ‘b24’ and ‘b25’ into the array and click on those seats to test to see if the function is working properly.Take these values out, when you’re done testing.
            //If the variable index has a value of greater than -1, then seat you clicked on has been added to the array…
            const index = selectedSeats.indexOf(thisSeat);

            //Use the array splice() method to remove an element from the array.
            //Use the array push() method to add an element to the array. 
            //Use the document getElementById method and the className property to change the class on the element.

            if (index > -1) {
                //Removes the seat from the array.
                selectedSeats.splice(index, 1);
                //Sets the class back to "a".
                document.getElementById(thisSeat).className = "a";

            } else {
                //Adds the seat to the array.
                selectedSeats.push(thisSeat);
                //Sets the class to "s".
                document.getElementById(thisSeat).className = "s";
            }
            manageConfirmForm();
            //console.log(index);
            //Add a console log statement at the bottom so you can see the seats coming in and going out of the array.
            console.log(selectedSeats);
        }
    }

    //Adding the Form HTML:
    // Make an event handler attached to the link with the ID set to "reserve" to make the section with the ID "resform" display.
    // Also make an event handler to control for if and when the "cancel" button is clicked, it hides the form from the user.

    //Event listener for the reserve button to open the form...
    document.getElementById("reserve").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("resform").style.display = "block";
    });
    // //Event listener to close the form if someone clicks cancel...
    document.getElementById("cancel").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("resform").style.display = "none";
    });

    //Showing and Hiding the Form:
    //If no seats are selected, users should not be able to fill out the form and click the reserve button. 
    //The function called manageConfirmForm() has an if/else statement that checks if there is anything in the selectedSeats array. 
    //If there is, the element with id = ”confirmres” gets set to display:block, if there isn't it get set to display:none.
    function manageConfirmForm() {
        if (selectedSeats.length > 0) {
            document.getElementById("confirmres").style.display = "block";
            if (selectedSeats.length === 1) {
                //If only one seat is selected...
                document.getElementById("selectedseats").innerHTML = `You have selected seat ${selectedSeats[0]}`;
            } else {
                let seatString = selectedSeats.toString();
                //Adds spaces after the commas...
                seatString = seatString.replace(/,/g, ", ");
                //For the last comma, it removes it and put in an 'and' instead...
                seatString = seatString.replace(/,(?=[^,]*$)/, ' and');
                //Converts the array to a string and then adds it on to the end of the message...
                document.getElementById("selectedseats").innerHTML = `You have selected seats ${seatString}`;
            }
        } else {
            document.getElementById("confirmres").style.display = "none";

            //Now, change the message of the form paragraph id="selectedseats" using the innerHTML method to this: 'You need to select some seats to reserve.<br><a href="#" id="error">Close</a> this dialog box and pick at least one seat.'
            document.getElementById("selectedseats").innerHTML = 'You need to select some seats to reserve.<br><a href="#" id="error">Close</a> this dialog box and pick at least one seat.';

            //Now you need to add a click handler in the function so that clicking the "Close" button actually closes the dialog box by using the anchor tag with the id="error" that was created in the previous step.
            document.getElementById("error").addEventListener("click", function() {
                document.getElementById("resform").style.display = "none";
            });
        }
    }
    //Run this function as soon as the page loads.
    //Everytime you add or remove a seat in and out of the array, this function should run. This means it needs to be placed inside of  the seatSelectionProcess function.
    manageConfirmForm();

    // When this form is submitted a function called processReservation() runs. 

    document.getElementById("confirmbtn").addEventListener("submit", event => {
        event.preventDefault();
        processReservation();
    });

    //Below is the entire function that processes the actual reservation:
    //In this function, you need to know how many records are already in the reservedSeats object (or have been reserved and are in the database).

    function processReservation() {
        //This will tell you how many records (if any) are already inside of the reservedSeats object:
        const reservedRecords = Object.keys(reservedSeats).length;
        //Now you need to get the first and last names of the person who reserved them, from the form.
        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        let counter = 1;
        let nextRecord = "";

        //Set up a forEach loop to loop through the selectedSeats array.
        selectedSeats.forEach(thisSeat => {
            //set the class name to "r".
            document.getElementById(thisSeat).className = "r";
            //Change the html on the page for the selected seats to "R".
            document.getElementById(thisSeat).innerHTML = "R";

            //The variable "nextRecord" should be the record number for the first time it loops through the array (assuming there is already data in the reservedSeats object). 
            //This is the number of hardcoded records plus 1.
            nextRecord = `record ${reservedRecords + counter}`;
            //This creates a prototype for the records that will be added to the array. 
            reservedSeats[nextRecord] = {
                seat: thisSeat,
                owner: {
                    fname: fname,
                    lname: lname
                }

            };
            counter++;
        });
        //console.log(reservedSeats);

        //After going through the selectedSeats array and adding the records to the reservedSeats object, you'll need to:
        //Close the form...
        document.getElementById("resform").style.display = "none";
        //Empty out the selectedSeats array,..
        selectedSeats = [];
        //And run the manageConfirmForm function again to reset its original state.
        manageConfirmForm();
        console.log(reservedSeats);
    };
}());