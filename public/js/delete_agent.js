// Citation for the following code (the entirety of this file):
// Title: Node.js Starter App
// Type: Full program
// Date: 05/25/2023
// Copied and then modified to fit our database structure:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// code for deleteAgent using regular javascript/xhttp
function deleteAgent(agentId) {
    // Show a confirm dialog box before actually trying to delete.
    // Then, cancel if needed.
    if (!confirm(`Вы уверены что хотите удалить агента с ID: ${agentId}?`))
        return;

    // Put our data we want to send in a javascript object
    let data = {
        agentId: agentId
    };


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-agent", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table.
            deleteRow(agentId);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(agentId) {

    let table = document.getElementById("customerTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == agentId) {
            table.deleteRow(i);
            deleteDropDownMenu(agentId);
            break;
        }
    }
}

// this function removes the deleted agent from appearing in the drop down menu when updating a agent
function deleteDropDownMenu(agentId) {
    let selectMenu = document.getElementById("input-agentId-update");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].value) === Number(agentId)) {
            selectMenu[i].remove();
            break;
        }

    }
}
