const express = require("express");
const { urlencoded } = require("express");
const app = express();
require("dotenv").config();
app.use(urlencoded({ extended: false }));
app.use(express.json());
var forMod;
// the mode can either submit the joke to delivery
// or delete it
//get the latest submitted joke for moderation
app.get("/getData", (req, res) => {
  //fetch data from the submit joke DB
  
  fetch("http://52.236.139.156/getData")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${reponse.status}`);
      }
      return response.json();
    })
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => console.log(error));
   
});

// if the mod choses to submit the joke it is added to delivery jokes
app.post("/updateData", (req, response) => {
  const moddedJoke = {
    // TODO dont use spaces for type
    type: req.body.type,
    joke: req.body.joke
  };
  console.log(moddedJoke.type);
  const options = {
    method: "POST",
    body: JSON.stringify(moddedJoke),
    headers: {
      "Content-Type": "application/json"
    }
  };
  fetch("http://20.16.247.26/addData", options)
    .then((res) => res.json())
    .then((res) => console.log(res));
  response.json(200);
});
// delete unsuitable jokes from submitted jokes
//after moderation
app.delete("/deleteData", (req, res) => {
  fetch(
    "http://52.236.139.156/deleteData",
    (options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
  );
  res.json("deleted joke from submit joke DB");
});

app.listen(5500, () =>
  console.log("Jmoderate is listening on port  5500")
);
