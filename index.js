const express = require("express");
const app = express();
const qr = require("qrcode");
const bp = require("body-parser");

app.set("view engine", "ejs"); //sets view engine to embedded javascript which allows us to render dynamic html.
app.use(bp.urlencoded({extended:false}));  //set the middleware to parse urlencoded data and make it available through the req.body object.
app.use(bp.json());//sets middleware to parse json data and make it visible through req.body object.


app.get('/', (req,res)=>
{
    res.render("index");
});

app.post("/scan",(req,res)=>
{
    const url = req.body.url;

    if(url.length === 0)
    {
        res.send("Empty Data!");
    }
    qr.toDataURL(url,(err,src)=>
    {
        if(err)
        {
            res.send("Error Occured");
        }
        res.render("scan",{src});
    })
})

const port=6969;
app.listen(port,()=>console.log("Server at 1000"));