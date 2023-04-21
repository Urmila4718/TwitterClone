const express = require("express");
const app = express();
const router = express.Router()
const bodyParser = require("body-parser");
const User = require("../schemas/UserSchema");

// setting view engine as the pug and we told server to use pug as the view engine
app.set("view engine","pug");
app.set("views","views");

app.use(bodyParser.urlencoded({extended:false}));
router.get("/",(req,res,next)=>{

res.status(200).render("register");
})

router.post("/",async (req,res,next)=> {
    console.log(req.body);
    var firstName = req.body.firstName?.trim();
  
    var lastName = req.body.lastName?.trim();
    var userName = req.body.userName?.trim();
    var email = req.body.email?.trim();

    var password = req.body.password;
    var payload = req.body;
    console.log(firstName);
    console.log(lastName);
    console.log(userName);
    console.log(email);

    if (firstName && lastName && userName && email && password)
    {
      console.log(User,"1");
      //to check user exist or not
      var user = await User.find({
        $or:[
            {userName:userName},
            {email:email}
        ]
      })
      .then((user)=>
      {
        console.log(user);
      })
      .catch((error)=>{
        console.log(error);
        payload.errorMessage = "Something went wrong"
        res.status(200).render("register",payload);

      });
      console.log("user",user);
      if(user == null)
      {
        console.log("1")
        var data = req.body;
     
        User.create(data)
        .then((user)=>{
         
          console.log(user);
        })

      }

      else
      {
        console.log("2");
        if(email == user.email){
            payload.errorMessage = "Email already in use."

        }
        else{
            payload.errorMessage = "username already in use."
        }
        res.status(200).render("register",payload);

      }
    }
    else{
        payload.errorMessage = "Make sure each field has an valid value."
        res.status(200).render("register",payload);
    }

    })

module.exports = router;
