const express = require("express");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const mongoose = require("mongoose");
const bodyPaser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());
app.use(cors());
const port = 9090;
const url =
  "mongodb+srv://prasaddurga2031:1234@app.lkbwh19.mongodb.net/?retryWrites=true&w=majority";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://prasaddurga2031:1234@app.lkbwh19.mongodb.net/rental"
  );
  console.log("Database is Connected!");
}

const Creden = new mongoose.Schema({
  type: String,
  user: String,
  password: String,
});

const logdata = mongoose.model("logins", Creden);

app.post("/postlogcred", async (req, res) => {
  let log = new logdata();
  log.type = req.body.cred.type;
  log.user = req.body.cred.user;
  log.password = req.body.cred.password;
  const doc = await log.save();
  console.log(doc);
  res.json(req.body);
});

app.get("/getlogcred", async (req, res) => {
  const docs = await logdata.find({});
  res.json(docs);
  console.log(docs);
});

//-------------geting All cars-------------

const CarData = new mongoose.Schema({
  car_name: String,
  car_fuel: String,
  car_seating: String,
  car_number: String,
  car_image: String,
  car_rent: String,
});

const Out = mongoose.model("carsData", CarData);

app.get("/getdata", async (req, res) => {
  const docs = await Out.find({});
  res.json(docs);
  console.log(docs);
});

//---------------------Posting Booking Data---------

const Bookingdata = new mongoose.Schema({
  car_id: String,
  car_name: String,
  car_image: String,
  car_rent: String,
  car_fuel: String,
  car_seating: String,
  car_number: String,
  name: String,
  mobil: String,
  location: String,
  address: String,
  Date: String,
  StartTime: String,
  EndTime: String,
});

const Booking = mongoose.model("Bookings", Bookingdata);

app.post("/postbookingdata", async (req, res) => {
  let book = new Booking();
  book.car_id = req.body.BookingDetails.car_id;
  book.name = req.body.BookingDetails.name;
  book.mobil = req.body.BookingDetails.mobil;
  book.location = req.body.BookingDetails.location;
  book.address = req.body.BookingDetails.address;
  book.Date = req.body.BookingDetails.Date;
  book.StartTime = req.body.BookingDetails.StartTime;
  book.EndTime = req.body.BookingDetails.EndTime;
  book.car_name = req.body.BookingDetails.car_name;
  book.car_fuel = req.body.BookingDetails.car_fuel;
  book.car_number = req.body.BookingDetails.car_number;
  book.car_seating = req.body.BookingDetails.car_seating;
  book.car_image = req.body.BookingDetails.car_image;
  book.car_rent = req.body.BookingDetails.car_rent;
  const doc = await book.save();
  console.log(doc);
  res.json(req.body);
});

//-----------------get View Status Data---------------------

app.get("/bookingsdata", async (req, res) => {
  const docs = await Booking.find({});
  res.json(docs);
  console.log(docs);
});

app.listen(port, () => {
  console.log("Server is Connected");
});
