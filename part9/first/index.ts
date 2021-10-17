import express from "express";
import calculateBmi from './bmiCalculator';
import calculateExercises  from './calculateExercises';
//import * as bodyParser from 'body-parser';
const app = express();
app.use(express.json());



  
app.get('/', (_req, res) => {
  res.send('go to http://localhost:3002/bmi?height=placeholder&weight=placeholder');
});

app.get("/bmi", ({query}:express.Request , res) => {
    
    const weight = Number(query.weight);
    const height = Number(query.height);
    //error
    if(!weight || ! height) res.send({
        error: "malformatted parameters"
      }); 
    res.json({
          weight: height,
          height: weight,
          bmi: calculateBmi(height, weight),
        });
  });
  
  app.post('/exercises', (req:express.Request, res) => { // eslint-disable-next-line @typescript-eslint/no-explicit-any
      
    try{
      
      const target :number = req.body['target']; 
      const day: Array<number> = req.body['daily_exercises'];
      console.log("taget",target);
      console.log("day",day);
      res.send(calculateExercises(day,target));
    }
    catch(e){
      res.status(400).send({error: 'parameters missing'});
    }
  });
  

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});