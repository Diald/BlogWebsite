import express from "express";
import bodyParser from "body-parser";
const newsRouter = express.Router();
import axios from "axios";

export default newsRouter;



newsRouter.get("/", async (req, res) => {
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=computer&apiKey=d89bb945e0ef4a9eb300523f66cee91f`);
        res.render('news',{newsData : newsAPI.data})

    } catch (err) {
        if(err.response){
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if(err.requiest){
            console.log(err.requiest);
        }else{
            console.log('Error', err.message);
        }
    }
});

newsRouter.post("/search", async (req, res) => {
    let search = req.body.search;

    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=d89bb945e0ef4a9eb300523f66cee91f`);
        res.render('newsSearch',{newsData : newsAPI.data,
            totalResults: newsAPI.data.totalResults})
    } catch (err) {
        if (err.response) {
            res.render('newsSearch', { newsData: null });
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            res.render('newsSearch', { newsData: null });
            console.log(err.request);
        } else {
            res.render('newsSearch', { newsData: null });
            console.error('Error', err.message);
        }
    }
});
