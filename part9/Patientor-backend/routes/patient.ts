/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import {getPat,addPat} from '../serviceData/patients';

//const id = uuid()
const router = express.Router();

router.post('/', (req, res) => { 
    console.log("req-new",req.body);
    const Patient={
        name: req.body.name,
        dateOfBirth: req.body.birth,
        ssn: req.body.ssn,
        gender: req.body.gender,
        occupation: req.body.occupation
    };
    res.json(addPat(Patient));
  });

router.get('/',(_req,res)=>{
    res.send(getPat());
});

export default router;

