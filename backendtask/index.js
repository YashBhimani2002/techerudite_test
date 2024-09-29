const express = require("express");
const cors = require("cors");
const Routes = require("./routes/route");
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', Routes);

app.listen(3000,()=>{
    console.log('port running on 3000')
})
