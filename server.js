
const express = require('express')
const app = express();
const db = require('./db') // Import the database connection
const mongoose = require('mongoose');

const bodyParser = require('body-parser'); //stores the data in request body
app.use(bodyParser.json());

// Import the Person model
app.get('/', (req, res) => {
  res.send(' WELCOME TO OUR HOTEL ')
})
//import the router files

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes'); // Import the Menuitem model

// Use the  routers

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes); // Use the menu item routes

app.listen(3000,()=>{
  console.log('server is running on port 3000')
});
