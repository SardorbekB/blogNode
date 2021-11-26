const express = require('express');;
const app = express();
const port = process.env.PORT || 3000;
const articlesRouter = require('./routes/articles');
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/blog1');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use('/articles', articlesRouter);

app.get('/', async(req, res) => {
    let articles = await Article.find().sort({createAt: -1}); 
    res.render('articles/index', {
        articles: articles
    });
});


app.listen(port, () => {
    console.log(`${port} - portni eshitishni boshladim`);
});

