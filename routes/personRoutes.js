const express=require('express');
const router=express.Router();
const Person=require('../models/person'); // Import the Person model

router.post('/',async (req,res)=>{
 try{
  const data=req.body;
  const newPerson=new Person(data);

  //save the new person to the database
  const response= await newPerson.save();
  console.log('data saved successfully');
  res.status(200).json(response);

 }catch(err){
  console.log('error in saving data:',err);
  res.status(500).json({message:'Internal server error',error:err});
 }
})

router.get('/',async (req,res)=>{
  try{
    //find all the persons in the database
    const persons=await Person.find();
    console.log("data fetched successfully");
    res.status(200).json(persons);
  }catch(err){
    console.log('error in fetching data:',err);
    res.status(500).json({message:'Internal server error',error:err});
  }
})

router.get('/:workType',async(req,res)=>{
  try{
    const workType=req.params.workType;
    if(workType=='chef' || workType=='waiter' || workType=='manager'){
      //find all the persons with the given work type
      const response=await Person.find({work:workType});
      console.log(`Persons with work type ${workType} fetched successfully`);
      res.status(200).json(response);
   }else{
      console.log('Invalid work type');
      res.status(400).json({message:'Invalid work type'});
   }
  }catch(err){
    console.log('error in fetching persons:',err);
    res.status(500).json({message:'Internal server error',error:err});
  }
})

router.put('/:id',async(req,res)=>{
  try{
    const personId=req.params.id; //extract the id from url parameter
    const updatedPersonData=req.body; // upadted data for the personn
    //find the person by id and update it
    const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
      new:true,   //RETURN THE UPDATED DOCUMENT
      runValidators:true,//RUN MONGOOSE VALIDATORS
    })
    if(!response){
      console.log('Person not found');
      return res.status(404).json({message:'Person not found'});
    }
    console.log('data Updated successfully');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Erroor'});
  }
})

router.delete('/:id',async(req,res)=>{
  try{
    const personId=req.params.id;// EXTRACT THE PERSONS ID FROM THE URL PARAMETER
    //Assuming you have a person Model
    const response=await Person.findByIdAndDelete(personId);
    if(!response){
      console.log('Person not found');
      return res.status(404).json({message:'Person not found'});
    }
    console.log("data deleted successfully");
    res.status(200).json({message:'person deleted successfully'});

  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Erroor'});
  }
})
module.exports=router;