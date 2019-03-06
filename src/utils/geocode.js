const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmFpbHNuaW5qYSIsImEiOiJjanN1dDNpcXIyaHRqNDlsaThsN3E2YzZkIn0.-tWOUS-bSWpedHLI2ugK-Q&limit=1`;
  request({ url, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longtitude: features[0].center[0],
        location: features[0].place_name
      });
    }
  });
};

module.exports = geocode;
