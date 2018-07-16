const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Gathering = require('./models/Gathering')


// Create a new Express application (web server)
const app = express();

// Set the port based on the environment variable (PORT=8080 node server.js)
// and fallback to 4567
const PORT = process.env.PORT || 4567;
app.use("/", express.static("./build/"));

//getiing all cities used for the form dropdown and converting the city code to name on summary page

app.get("/gatherings.json", (request, response) => {
  Gathering.all().then(gatheringData => {
    console.log(gatheringData);
    response.json(gatheringData);
  });
});

app.get("/gatherings/:id.json", (request, response) => {
  // console.log(request.params.id)
  Gathering.find(request.params.id).then(data => {
    response.json(data);
  });
});



//Joins the trip and city tables for the Armadeus API request
// app.get("/trips/:id.json", (request, response) => {
//   id = request.params.id;
//   Trip.join(id).then(data => {
//     response.json(data)
//   })

// })


//Creates new trip parameters in the database
app.post("/gatherings/create.json", (request, response) => {
  newGathering = {
    title: request.body.title,
    description: request.body.description,
    date: request.body.date,
    time: request.body.time,
    latitude: request.body.latitude,
    longitude: request.body.longitude
  };
  console.log(newGathering)
  Gathering.create(newGathering).then(data => {
    // console.log(newTrip)
    // console.log(data);
    response.json(data);

  });
});

app.put("/gatherings/:id.json", (request, response) => {
  let id = request.params.id;
  updatedGathering = {
    id: id,
    title: request.body.title,
    description: request.body.description,
    date: request.body.date,
    time: request.body.time,
    latitude: request.body.latitude,
    longitude: request.body.longitude
  };
  // console.log(newTrip)
  Gathering.update(updatedGathering, id).then(data => {
    // console.log(newTrip)
    // console.log(data);
    response.json(data);
  });
});


app.delete('/gatherings/:id.json', (request, response) =>{
  let id = request.params.id
  Gathering.delete(id).then(data=>{
  response.json({deleted:true})
  }
  )
})


// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
  app.get("/*", function(request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// Start the web server listening on the provided port.
app.listen(PORT, () => {
  console.log(`Express web server listening on port ${PORT}`);
});
