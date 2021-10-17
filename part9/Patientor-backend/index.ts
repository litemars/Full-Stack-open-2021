import express from "express";
import patient from './routes/patient';
import diagnoses from './routes/diagnoses';

import cors from "cors";
const app = express();
app.use(express.json()) ;  

app.use(cors()); 

  
app.get('/api/ping', (_req, res) => {
  res.send('pong');
});
app.use('/api/patients', patient);
app.use('/api/diagnoses', diagnoses);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});