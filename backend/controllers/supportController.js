const Support =require('../models/Support.js')

exports.addSupport=async (req,res)=>{
    const {name,email,subject,message}=req.body;
    try{
        const newSupport =new Support({
                    name,
                    email,
                    subject,
                    message,
        })
        await newSupport.save();

        res.status(200).json({message: 'Message added successfully'})
    }
    catch(error){
        res.status(400).json({ message: 'Error in adding message ', error });
    }
}