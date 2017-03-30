
var socket = io.connect('http://localhost:3000',{'forceNew': true});
socket.on('respuesta-cp',function(data){

    var html = data.map(function(data){
      return ("undefined" === typeof data.codigo ? "" : `<strong>Codigo Postal:</strong> ${data.codigo}<br>
                  <strong>Asentamiento:</strong> ${data.Asentamiento}<br>
                  <strong>Tipo:</strong> ${data.Tipo}<br>
                  <strong>Municipio:</strong> ${data.Municipio}<br>
                  <strong>Ciudad :</strong> ${data.Ciudad}<br>
                  <strong>Estado :</strong> ${data.Estado}<br>` );
    }).join('</br>');

      document.getElementById("detalleCP").innerHTML = html;
});

function pedirDetalleCP(e){
  if (e.keyCode == 13) {
        document.getElementById("detalleCP").value = "";
        var cp = document.getElementById("inputCP").value;
        console.log(cp);
        socket.emit('consultar-cp',cp);
        return false;
    }

  return true;
}
