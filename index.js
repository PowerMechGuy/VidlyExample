const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// app.get() --> Get Data
// app.post() --> Create Data
// app.put()  --> Update Data
// app.delete() --> Remove Data

const genres = [
  { id: 1, name: 'adventure'},
  { id: 2, name: 'horror'},
  { id: 3, name: 'scifi'},
  { id: 4, name: 'mystery'},
  { id: 5, name: 'animated'}
]

app.get('/', (req, res) => {
  res.send('Welcome to Vidly!');
});

/*
app.get('/api/genres', (req, res) => {
  res.send([1, 2, 3]);
});*/

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.post('/api/genres', (req, res) => {
    // Moved to validategenre() function
    /*const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required()
    });*/
    
  /*if (error) {
    // 400 Bad request 
    res.status(400).send(error.details[0].message);
    //res.status(400).send(result.error);
    return;
  }*/
    
  //  const result = schema.validate(req.body);
  //  console.log(result);
  const { error } = validateGenre(req.body); // = result.error  
    
  if (error) {
    // 400 Bad request 
    res.status(400).send(result.error.details[0].message);
    //res.status(400).send(result.error);
    return;
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

app.put('/api/genres/:id',  (req, res) => {
  // Look up the genre
  // If not existing, return 404
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  // 404 means object not found
  if (!genre) res.status(404).send('The genre with the given id was not found.');
    
  // Validate
  // If Invalid, return 400 - Bad request 
  //const result = validategenre(req.body);
  //Referencing error value in result object with
  //object destructuring notation.
  const { error } = validateGenre(req.body); // = result.error
  
  if (error) {
    // 400 Bad request 
    res.status(400).send(error.details[0].message);
    //res.status(400).send(result.error);
    return;
  }
    
  // Update genre
  genre.name = req.body.name;
  // Return the updated genre to the client
  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
      name: Joi.string()
      .min(3)
      .required()
  });
    
  const result = schema.validate(genre);
  
  return schema.validate(genre);
}

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    // 404 means object not found
    if (!genre) res.status(404).send('The genre with the given id was not found.');
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  // Look up the genre
  // Not existing, return 404
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  // 404 means object not found
  if (!genre) res.status(404).send('The genre with the given id was not found.');
  
  // Delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  
  // Return the same genre
  res.send(genre);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
