import express from "express";
import newsRouter from './src/routes/news.js';
import { dirname } from "path";
import bodyParser from "body-parser";

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//Static Files
app.use(express.static('public'));
app.use('/styles',express.static(__dirname + "public/styles"));
app.use('/images',express.static(__dirname + "public/images"));
app.use('/js',express.static(__dirname + "public/js"));

//Templating engine
app.set('views','./src/views');
app.set('view engine','ejs');

//routes
newsRouter.get('',async(res,req)=>{
    res.render('news');
})
app.use('/',newsRouter);
app.use('/search',newsRouter);

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
