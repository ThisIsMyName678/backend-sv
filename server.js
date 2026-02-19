require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    instructions: String,
})

const RecipeModel = mongoose.model('Recipe', recipeSchema);

app.post('/recipes', (req, res) => {
    RecipeModel.insertOne({title: req.body.title, ingredients: req.body.ingredients, instructions: req.body.instructions});
    res.send({message: 'Recipe created'});
});

app.get('/', (req, res) => {
    res.send({message: 'Hello World'});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});