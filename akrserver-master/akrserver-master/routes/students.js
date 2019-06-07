var express=require('express')
var router=express.Router();

router.route("/")
    .get((req,res)=>{
        res.send("data")
    })
    .post((req,res)=>{
        res.send("data")
    })


module.exports=router;