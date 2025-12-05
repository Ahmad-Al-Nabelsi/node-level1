const express = require("express"); // Importeer Express-framework voor servercreatie en routing.
const app = express(); // Maak een nieuwe Express-toepassing aan.
const port = process.env.PORT || 3001; // Stel de poort in waarop de server zal luisteren.
const mongoose = require("mongoose"); // Importeer Mongoose-bibliotheek voor MongoDB-interacties.
app.use(express.urlencoded({ extended: true })); // Middleware om URL-gecodeerde gegevens te parseren.

app.set("view engine", "ejs"); // Stel EJS in als de view-engine voor het renderen van sjablonen.
app.use(express.static("public")); // Serveer statische bestanden vanuit de "public" map.


// Method Override Middleware
var methodOverride = require("method-override");  
app.use(methodOverride("_method"));  
const allRoutes = require("./routes/allRoutes"); 
const addUserRoute = require("./routes/addUser"); 

// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

mongoose
  .connect(
    "mongodb+srv://xberd11an_db_user:Ah123456789@cluster0.ed816eq.mongodb.net/?appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(allRoutes);
app.use( "/user/add.html",addUserRoute);
