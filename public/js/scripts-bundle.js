$(document).ready(function(){var e=new mapboxgl.Map({container:"map",center:[-96.9785,32.8924],zoom:9,style:"http://maps.dallasnews.com/styles.json"});e.scrollZoom.disable(),e.addControl(new mapboxgl.Geocoder),e.addControl(new mapboxgl.Navigation),$("#add-minus").click(function(){$("#form-wrapper").removeClass("hide")}),$("#see-responses").click(function(e){e.preventDefault(),$(this).hasClass("expanded")===!0?($(this).children("span").text("+"),$("#form-wrapper").removeClass("hide").slideDown(1e3)):($(this).children("span").text("-"),$("#form-wrapper").slideUp()),$(this).toggleClass("expanded")});var a=new Date,o=a.getFullYear();$(".copyright").text(o)});
//# sourceMappingURL=scripts-bundle.js.map
