import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {Contact} from './model.js';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin:true,
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials:true
}))

mongoose
  .connect(
    "mongodb+srv://pratikbulkunde03:Pratik%400303@contactmanager.yr1z4nd.mongodb.net/",
    {
      dbName: "ContactManager",
    }
  )
  .then(() => console.log("MongoDb Connected...!"))
  .catch((err) => console.log(err));

// get All contacts
app.get("/", async (req, res) => {
  try {
    let contact = await Contact.find();
    res.json({ message: "All conatcts", contact });
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Add contact
app.post("/", async (req, res) => {
  const { name, gmail, number } = req.body;
  try {
    let contact = await Contact.findOne({ gmail });
    if (contact) return res.json({ message: "Contact already exist...!" });

    contact = await Contact.create({ name, gmail, number });
    return res.json({ message: "Contact Saved Successfully...!", contact }); // Return response here
  } catch (err) {
    return res.status(500).json({ message: err.message }); // Return error response here
  }
});

//Delete contact
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let contact = await Contact.findById(id);
    if (!contact) return res.json({ message: "Contact not exist" });
    await contact.deleteOne();
    res.json({ message: "Contact has been deleted..!" });
  } catch (err) {
    req.json({ message: err.message });
  }
});

//Edit contact
app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try { 
    let data = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
    if (!data) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "User Contact has been updated", data });
  } catch (err) {
    res.json({ message: err.message });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "This is home route" });
});

app.listen(2000, () => console.log("server is running on port 2000"));

// //mongodb+srv://pratikbulkunde03:Pratik@0303@contactmanager.yr1z4nd.mongodb.net/?retryWrites=true&w=majority&appName=ContactManager
// //mongodb+srv://pratikbulkunde03:<password>@contactmanager.yr1z4nd.mongodb.net/

