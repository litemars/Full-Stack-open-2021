import {getDiagnoses} from '../serviceData/diagnoses';
import express from 'express';

const router = express.Router();

router.get('/',(_req,res)=>{
    res.send(getDiagnoses());
});

export default router;