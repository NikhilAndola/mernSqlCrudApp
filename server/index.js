const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 8000

app.use(cors());

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
    host: "localhost",
    user: "nikhil",
    password: "password",
    database: "crud"
})

db.connect(()=> {
    console.log("connected successfully!")
})

// app.get("/", (req, res) => {
//     res.send("hello");
//     const insertSql = "INSERT INTO movie_review (movieName, movieReview) VALUES ('titanic2','good movie');"

//     db.query(insertSql, (err, result) => {
//         console.log(result);
//     })
// })


app.post("/apidata", cors(), (req, res) => {
    
    res.send({j: "hello"});

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const insertSql = "INSERT INTO movie_review (movieName, movieReview) VALUES (?,?);"

    db.query(insertSql, [movieName, movieReview], (err, result ) => {
        if(err){
            console.log(err)
        }
        // console.log(result);
    })
})

app.get("/api/get", (req, res)=> {

    const selectSql = "SELECT * FROM movie_review";
    
    db.query(selectSql, (err, result) => {
        // console.log(result)
        res.send(result)
        // let html = "<html><head><title>Hello</title></head><body><h2 style='color: red'}>I am ssr html</h2></body></html>"
        // res.send(result)
    })
})

// Api delete endpoint/route
// passing parameter to the route
app.delete('/api/delete/:id', (req, res) => {

    // const name = req.query.movie;
    const name = req.params.id;
    
    const sqlDelete = "DELETE FROM movie_review WHERE id = ?";
    db.query(sqlDelete, [name], (err, result) => {
        console.log(result)
    if (err) console.log(err);
    })
    })

// Api delete endpoint with query
//Passing query
// app.delete('/api/delete', (req, res) => {

//     const name = req.query.movie;

//     const sqlDelete = "DELETE FROM movie_review WHERE movieName = ?";
//     db.query(sqlDelete, name, (err, result) => {
//         console.log(result)
//     if (err) console.log(err);
//     })
//     })

// *************************************************************************************
// *************************************************************************************
// *************************************************************************************


//Delete all rows in table endpoint
app.delete('/api/deleteall', (req, res) => {

    // const name = req.query.movie;
    // const name = req.params.id;
    
    const sqlDeleteAll = "DELETE FROM movie_review";
    db.query(sqlDeleteAll, (err, result) => {
        console.log(result)
    if (err) console.log(err);
    })
    })

//Update table values endpoint
app.put('/api/update', (req, res) => {

    // const name = req.query.movie;
    const id = req.body.id;
    const review = req.body.movieReview;

    const sqlUpdate = "UPDATE movie_review SET movieReview = ? WHERE id = ?";

    db.query(sqlUpdate, [review, id], (err, result) => {
        console.log(result)
    if (err) console.log(err);
    })
    })


app.listen(PORT, () => {
    console.log("server started at", PORT)
})