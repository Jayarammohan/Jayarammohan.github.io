var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var requestSettings = {
  method: 'GET',
  url: "https://api.transport.nsw.gov.au/v1/gtfs/vehiclepos/buses",
  encoding: null,
  headers: {
    'Authorization': 'apikey M3pWzVcgtnU0O9RcTX1lkuSw7vABBqJZjjzt',
  }
};
request(requestSettings, function (error, response, body) {
    console.log("!" + error);
    console.log("status=" + response.statusCode);
  if (!error && response.statusCode == 200) {
    console.log("2");
    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
    feed.entity.forEach(function(entity) {
//      if (entity.trip_update) {
    if(entity.vehicle.trip.routeId == "2436_603") {

        console.log(entity.vehicle.position.latitude);
      }
    });
  }
});
