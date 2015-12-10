function publishEvent() {
    console.log("publishEvent()");

    var event = {}

    event.dishName       = document.getElementById("dish_name").value;
    event.foodCategory   = document.getElementById("food_category").value;
    event.district       = document.getElementById("district").value;
    event.date           = document.getElementById("date").value;
    event.time           = document.getElementById("time").value;
    event.availableSeats = document.getElementById("available_seats").value;
    event.comments       = document.getElementById("comments").value;
    event.deadline       = document.getElementById("deadline").value;

    var data = JSON.stringify(event);
    console.log("SENT: " + data);
    
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
	console.log("onreadystate");
	if (xhttp.readyState == 4 && xhttp.status == 200) {
	    console.log("TEXT: " + xhttp.responseText);
	}
    };	    
    
    xhttp.open("POST", "event", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(data);
}
