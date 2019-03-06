const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Rick Sanchez'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Rick Sanchez'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'jsdoijfiaowejfoeaj',
    title: 'Help',
    name: 'Rick Sanchez'
  });
});

app.get('/weather', (req, res) => {
  address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide a search address'
    });
  }
  geocode(address, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longtitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        location,
        forecast: forecastData,
        address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Help article not found.',
    title: '404',
    name: 'Rick Sanchez'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page not found.',
    title: '404',
    name: 'Rick Sanchez'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
