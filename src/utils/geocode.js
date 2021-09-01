const request = require('request');

const geocode = (location, callback) => {
    location = encodeURIComponent(location);
    request({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
        json: true,
        qs: {
        access_token: 'pk.eyJ1IjoiY2hhbmRpbmlwYXRlbCIsImEiOiJja3NyNm12ajQwajFwMm9wZ2FlMTg5NjBiIn0.B5bJa8OKVroogMkxi8PUnw'
        }
    }, ( err, res) => {
        if(err){
            callback('unable to connect to location service', undefined);
        }else if(res.body.features.length === 0){
            callback('Enter a valid search location', undefined);
        }
         else
        {
            callback(undefined, {
                lat: res.body.features[0].center[1],
                lon: res.body.features[0].center[0],
                loc: res.body.features[0].place_name

            })
        }
        
    })
}

module.exports = {
    geocode
}