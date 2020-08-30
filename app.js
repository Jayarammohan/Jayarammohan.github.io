var map;
function initMap() {
    var home = {lat: -33.8688, lng: 151.2093};
 

    var iconBase =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

var icons = {
  parking: {
    icon: iconBase + 'parking_lot_maps.png'
  },
  library: {
    icon: 'https://stock.adobe.com/au/images/id/332351473?as_campaign=Flaticon&as_content=api&as_audience=idp&tduid=7b50ba187cad75b6c041345ecd397f3c&as_channel=affiliate&as_campclass=redirect&as_source=arvato'
  },
  info: {
    icon: iconBase + 'info-i_maps.png'
  }
};

    var features = [
      {
        position: new google.maps.LatLng(  40.731, -73.997),
        type: 'library'
      }
       
    ];



     
 
    map = new google.maps.Map(document.getElementById("map"), {
      center: home,
      zoom: 4
    });

    var trafficLayer = new google.maps.BicyclingLayer();
  trafficLayer.setMap(map);


      // Create markers.
    for (var i = 0; i < features.length; i++) {
      var marker = new google.maps.Marker({
        position: features[i].position,
        //icon: 'https://www.gstatic.com/images/icons/material/system_gm/2x/home_gm_blue_24dp.png',
        icon:'https://img.icons8.com/officexs/16/000000/home.png',
        size : [10,10],
        color: 'blue',
        map: map
      });
    };
    marker.addListener('click', function() {
      map.setZoom(8);
      map.setCenter(marker.getPosition());
    });


    // Configure the click listener.
    map.addListener('click', function(mapsMouseEvent) {
     infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
      infoWindow.setContent(mapsMouseEvent.latLng.toString());
      infoWindow.open(map);
    });

   
       var geocoder = new google.maps.Geocoder;
      var infowindow = new google.maps.InfoWindow;
      

      document.getElementById('submit').addEventListener('click', function() {
        geocodeLatLng(geocoder, map, infowindow);
      });
    

    function geocodeLatLng(geocoder, map, infowindow) {
      var input = document.getElementById('latlng').value;
      var latlngStr = input.split(',', 2);
      var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            map.setZoom(11);
            var marker = new google.maps.Marker({
              position: latlng,
              map: map
            });
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }
   }  