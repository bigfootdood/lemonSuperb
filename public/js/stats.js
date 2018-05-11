function move(id) {
  var elem = document.getElementById(id);
  //document.getElementById(id).innerHTML = "Hello World";
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}

function heal(id){
  document.getElementById(id).innerHTML = "<span class=\"badge badge-success\">Healthy</span>";
}
