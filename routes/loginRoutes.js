const express = require("express");
const app = express();
const router = express.Router()

// setting view engine as the pug and we told server to use pug as the view engine
app.set("view engine","pug");
app.set("views","views");

router.get("/",(req,res,next)=>{

res.status(200).render("login");

})

module.exports = router;
