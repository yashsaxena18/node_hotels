const express=require('express');
const router=express.Router();
const Person = require('../models/person'); // ✅ Import Person model
const Menuitem=require('../models/menuitem');

router.post('/',async (req,res)=>{
  try{
    const data=req.body;
    const newMenuItem=new Menuitem(data);

    //save the new menu item to the database
    const response= await newMenuItem.save();
    console.log('Menu item saved successfully');
    res.status(200).json(response);

  }catch(err){
    console.log('error in saving menu item:',err);
    res.status(500).json({message:'Internal server error',error:err});
  }
})


router.get('/',async (req,res)=>{
  try{
    //find all the menu items in the database
    const menuItems=await Menuitem.find();
    console.log("menu items fetched successfully");
    res.status(200).json(menuItems);
  }catch(err){
    console.log('error in fetching menu items:',err);
    res.status(500).json({message:'Internal server error',error:err});
  }
})

router.get('/:tasteType',async(req,res)=>{
  try{
    const tasteType=req.params.tasteType;
    if(tasteType=='sweet' || tasteType=='spicy' || tasteType=='sour'){
      //find all the persons with the given work type
      const response=await Menuitem.find({taste:tasteType});
      console.log(`Persons with taste type  ${tasteType} fetched successfully`);
      res.status(200).json(response);
   }else{
      console.log('Invalid taste type');
      res.status(400).json({message:'Invalid taste type'});
   }
  }catch(err){
    console.log('error in fetching persons:',err);
    res.status(500).json({message:'Internal server error',error:err});
  }
})

// Export the router
module.exports = router;
