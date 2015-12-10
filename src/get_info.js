var pg = require('pg');
var conString= 'postgres://kmncygcolvmkzj:oo7kPQS3wgQzUnl-OfTrUrugtW@ec2-54-247-170-228.eu-west-1.compute.amazonaws.com/dcvjcsiroa6s9?ssl=true';

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)


// SELECT 
pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;') // this is the SQL call
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
