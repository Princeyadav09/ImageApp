const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary')
const User = require("../model/user")


router.post("/upload", async(req,res)=>{
    try{
    const file = req.files?.photos;
    const myCloud = await cloudinary.uploader.upload(file?.tempFilePath,{
        folder: "allphotos",
    })
    const user = await User.create({
        name: req.body.name,
        photos: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      })

    res.status(200).json({url:myCloud.secure_url})
    }catch(error){
        res.status(400).json("eroor")
    }
})

router.post("/allphotos",async(req,res)=>{
    try{
        const images =  await User.find({},{"photos":"$photos.url",_id:0});
        res.status(200).json({img:images});
    } catch(error){
        res.status(400).json("error")
    }
    
})


module.exports = router;