var express = require('express');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var app = express();

app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

/*app.get('/', function(request, response) {
	
	
  //response.render('pages/index');
});*/

var database;
MongoClient.connect("mongodb://52.40.166.27:27017,52.35.132.75:27017,52.10.8.5:27017/imran?w=0",
{
	server: {
      socketOptions: {
        connectTimeoutMS: 500
      }
    },
	replSet: {
		reconnectWait :1000,
		rs_name:'cmpe281',
	}
},
 function(err, db) {
  //test.equal(null, err);
  //test.ok(db != null);
	if(err)
	{
		console.log("could not connect to the database");
		throw err;
	}
	database = db;
	app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
	});
 });
  /*db.collection("imran").update({a:1}, {b:1}, {upsert:true}, function(err, result) {
    //test.equal(null, err);
    //test.equal(1, result);
	console.log(result);
    db.close();
    //test.done();
  });*/
  
  app.get("/", function(req, res) {
  database.collection("vatic").find({}).toArray(function(err, docs) {
    /*docs.each(function(err, doc) {
      if(doc) {
        console.log(doc);
      }
      else {
       
      }
    }); */
  
	return res.send(JSON.stringify(docs));
  });
  });



/**/


