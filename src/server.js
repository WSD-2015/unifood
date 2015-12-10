/*var DATABASE_URL= 'postgres://kmncygcolvmkzj:oo7kPQS3wgQzUnl-OfTrUrugtW@ec2-54-247-170-228.eu-west-1.compute.amazonaws.com/dcvjcsiroa6s9?ssl=true';
*/
var DATABASE_URL= 'postgres://bszdlrlafooarn:9N2LJu1QJp7B_-nqx7z4chpNah@ec2-46-137-72-123.eu-west-1.compute.amazonaws.com/datv36ra3frbbp?ssl=true';

var pg = require('pg');
var bodyParser = require('body-parser');
var client;

function getEvents(req, res) {
    console.log("getEvents");

    client.query('SELECT * FROM public.event', [], function (err, result) {
	var events = [];
	
	if (err) {
	    console.log("DB returned error: " + JSON.stringify(err));
	} else {
	    result.rows.forEach(function (dbEvent) {
		var event = {
		    title:    dbEvent.description ? dbEvent.description : "No Title",
		    category: dbEvent.category ? dbEvent.category : "Unspecified category",
		    address:  dbEvent.district ? dbEvent.district : "Unknown address",
		    image:    "img/cook.jpg"
		};

		events.push(event);
	    });
	}

	res.send(events);
    });
		 
    /*
    var events = [
	{
	    "title": "Finnish Food",
	    "category": "Traditional",
	    "address": "Otaniemi",
	    "image": "img/cook.jpg",
	},
	{
	    "title": "Swedish Meatballs",
	    "category": "Traditional",
	    "address": "Downtown Helsinki",
	    "image": "img/meatballs.jpg",
	},
	{
	    "title": "Japanese delights",
	    "category": "Sushi",
	    "address": "Otaniemi",
	    "image": "img/avocado.jpg",
	},
	{
	    "title": "Indian curry",
	    "category": "Spicy",
	    "address": "Otaniemi",
	    "image": "img/spices.jpg",
	}
    ];

    var s = JSON.stringify(events);

    res.send(s);
*/
}

function postEvent(req, res) {
    console.log("postEvent");

    var body = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
	var event = JSON.parse(body);

	console.log("RECEIVED: " + JSON.stringify(event));

	client.query('INSERT into public.event ' +
		     '("validityFlag", organizer, description, date, district, rsvp) ' +
		     "VALUES($1, $2, $3, $4, $5, $6) RETURNING id", 
		     [1, 4711, event.dishName, new Date(), event.district, new Date()], 
		     function(err, result) {
			 if (err) {
			     console.log(err);
			 } else {
			     console.log('row inserted with id: ' + result.rows[0].id);
			 }

			 res.status(200).end();
		     });	
    });
}

function mainHandler(req, res) {
    res.send("Hello World");
}

var express = require('express')
var app = express();

/*
    app.get('/', function (req, res) {
	    res.send('Hello World!')
	});
*/

//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/webDesign'));

app.get("/", mainHandler);
app.get("/getEvents", getEvents);
app.post("/event", postEvent);
app.get('/hello', function (req, res) {
    res.send('World!')
});
//app.use(bodyParser.raw());

console.log("Connecting to database...");
pg.connect(DATABASE_URL, function(err, pgClient) {
    if (err) throw err;
    console.log('Connected to postgres!');
    client = pgClient;

    console.log("Starting server");
    var server = app.listen(3002, function () {
	var host = server.address().address
	var port = server.address().port
	console.log('Server Unifood demo gala example app listening at http://%s:%s', host, port)
    });
});
