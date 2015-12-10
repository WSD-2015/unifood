var USAGE = "usage: node db_delete_event.js id";

var pg = require('pg');
var conString= 'postgres://kmncygcolvmkzj:oo7kPQS3wgQzUnl-OfTrUrugtW@ec2-54-247-170-228.eu-west-1.compute.amazonaws.com/dcvjcsiroa6s9?ssl=true';

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)

function deleteItem(id) {
    pg.connect(conString, function(err, client, done) {
	if (err) {
	    return console.error('error fetching client from pool', err);
	}
	client.query('DELETE FROM public.event WHERE ID = $1', [id], function(err, result) {
	    //done();

	    if(err) {
		return console.error('error running query', err);
	    }
	    console.log(result.rows);
	    //output: 1

	    done();
	});
    });
}

if (process.argv.length != 3) {
    console.log(USAGE);
} else {
    var id = process.argv[2];
    deleteItem(id);
}
