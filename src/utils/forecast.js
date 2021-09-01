const request = require('request');

const forecast = (lat, lon, callback) => {
    request({
        url: 'http://api.weatherstack.com/current',
        json: true,
        qs: {
            access_key: '2c28b1b30e9b6b276fd9112794cc5489',
            query: `${lat},${lon}`
            }
        }, (err, res) => {
            if(err){
                callback('Network error', undefined);
        
            }else if(res.body.error){
                callback(res.body.error.type, undefined);
            }
            else{
            callback(undefined, {
                temp: res.body.current.temperature,
                feels_like: res.body.current.feelslike
            });
            }
        });
        
    }

module.exports = {
    forecast
}