/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import {getPat,addPat, GetPatById, addEntry} from '../serviceData/patients';
import {toNewPatientEntry, toNewEntry} from '../utils'

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

router.post('/:id/entries', (req, res) => {
    try {
        if(req.body.healthCheckRating==undefined){
            req.body.healthCheckRating=0
        }
      const parsedEntry = toNewEntry(req.body);
      const newEntry = addEntry(req.params.id, parsedEntry);
      res.json(newEntry);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

export default router;

