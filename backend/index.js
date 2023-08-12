const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2;

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
  }

cloudinary.config({ 
    cloud_name: 'dd9wrympc', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
))

app.use(fileUpload({
    useTempFiles: true
}))

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use("/test", (req, res) => {
    res.send("Hello world!");
});

const upload = require('./upload/upload');
const connectDatabase = require('./db/db');

app.use("/api",upload);

connectDatabase();

app.listen(4000,()=>{
    console.log("Server is running on http:localhost:4000");
})