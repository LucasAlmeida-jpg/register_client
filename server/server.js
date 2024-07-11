import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/registration', (req, res) => {
  const requestData = req.body; 
  res.status(200).json({
    result: requestData 
  });
});

app.listen(port, () => {
  console.log(`app na porta ${port}`);
});