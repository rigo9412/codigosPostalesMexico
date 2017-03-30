var express = require('express');
var app = express();
var server  = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require("mysql");

app.use(express.static("public"));
app.get('/',function(req,res) {
   res.status(200).send("Hoa!");
 });

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: '3306',
  database:"codigospostalesbd"
})

db.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
})

// Define/initialize our global vars
var detalleCP =[];

 io.sockets.on('connection',function(socket){
   console.log("Alguien se ha conectado con sockets");
   //recibe la peticion del cliente al guardar la factura
   socket.on('consultar-cp',function(data){
      db.query(`CALL SP_CP("${data}") `)
          .on('result', function(data){
              detalleCP.push(data)

              console.log(data);
          })
          .on('end', function(){
              socket.emit('respuesta-cp',detalleCP)
          detalleCP =[] ;
          })

   })
 })


  server.listen(3000,function() {
    console.log("Servidor corriendo en http://localhost:3000");
  })







  /* con.query('SELECT * FROM factura',function(err,rows){
   if(err) throw err;

   console.log('Data received from Db:\n');
   console.log(rows);
 });*/

   /*con.end(function(err) {
     // The connection is terminated gracefully
     // Ensures all previously enqueued queries are still
     // before sending a COM_QUIT packet to the MySQL server.
   });*/

//conn.guardarFactura("'PEDRO JOSE LOPEZ GARCIA','GAGL700509PH2','PORFIRIO DIAZ','1704','ZARAGOZA','Tamaulipas','Nuevo Laredo','México','88060'")
