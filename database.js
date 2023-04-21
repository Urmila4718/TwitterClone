const mongoose = require('mongoose');
// mongoose.set('userNewUrlParser',true);
// mongoose.set('useUnifiedTopology',true);
// mongoose.set('useFindAndModify',false);
// mongoose.set('useUnifiedTopology',true);


class Database{
    constructor()
    {
     this.connect();
    }
connect()
    {
        mongoose.connect("mongodb+srv://admin:admin@twitterclonecluster.s5a8vnt.mongodb.net/?retryWrites=true&w=majority")
.then(() =>{
    console.log("Database connection successful")
})
.catch((err) =>{
    console.log("Database connection error!" + err)
})
    
}
}
module.exports = new Database();