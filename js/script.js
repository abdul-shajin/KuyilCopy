var imgdiv = document.getElementById('imageframe');
var description = document.getElementById('description');
var getImageLink = function () {
  var query = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  var params = query[0].split('=');
  if(params[0] == 'link'){
    return params[1] ;
  }else{
    return null;
  }
}

img_src = getImageLink();
if(img_src){
   console.log(img_src);
  imgdiv.innerHTML = "<img src='"+img_src+"'>";
}else{
  description.style.display = 'inline';
}