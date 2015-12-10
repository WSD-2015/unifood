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
  client.query('SELECT * FROM public.event', [], function(err, result) {
    //call `done()` to release the client back to the pool = howeever the pool is goig to close automatically after 30 secs so in my opinion we do not have to call close() (ilario)
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows);
    //output: 1
  });
});
