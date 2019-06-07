'use strict';

const Hapi = require('@hapi/hapi');
const MySQL = require('mysql');
const init = async () => {

	 const server = Hapi.server({
        port: 4000,
        host: 'localhost'
    });

	   const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'mp'
});

connection.connect();
 
// Add the route
server.route({
    method: 'GET',
    path: '/project',
    handler: function (request, reply) {
    	return new promise((resolve,reject)=>{
    		const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'mp'


    	});
    		connection.connect();
       connection.query('SELECT *from producer',
       function (error, results, fields) {
       if (error) throw error;

       reply (results);

    });
  }
});

await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();