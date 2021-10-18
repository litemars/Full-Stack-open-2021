/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import {getPat,addPat, GetPatById} from '../serviceData/patients';
import {toNewPatientEntry} from '../utils'

//const id = uuid()
const router = express.Router();

router.post('/', (req, res) => { 
    try{
        const newEntry = toNewPatientEntry(req.body);
        res.json(addPat(newEntry));
    }catch(error){
        res.status(400).send(error.message)
    }
  });

router.get('/',(_req,res)=>{
    res.send(getPat());
});
router.get('/:id',(req,res)=>{
    res.send(GetPatById(req.params.id));
});

export default router;

