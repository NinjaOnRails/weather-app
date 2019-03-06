const request = require('request');

const forecast = (latitude, longtitude, callback) => {
  const url = `https://api.darksky.net/forecast/98ca4b334e5f8c60436bc18b8daf26e8/${latitude},${longtitude}?units=si`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          body.currently.temperature
        } degrees out. Max of today is supposed to be ${
          body.daily.data[0].temperatureHigh
        } degrees and min ${
          body.daily.data[0].temperatureLow
        } degrees. There is a ${
          body.currently.precipProbability
        }% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
