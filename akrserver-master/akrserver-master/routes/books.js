var express=require('express')
var router=express.Router();
var mysql=require("mysql")

require('dotenv').config()

router.route("/")
    .get((req,res)=>{
        var connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();
 
          connection.query('SELECT * from Books', function (error, books, fields) {
            if (error) throw error;
            res.send(books)
          });
           
          connection.end();
        
    })
    .post((req,res)=>{
        var newBook=req.body;

        var connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });

          connection.connect();
 
          connection.query(`INSERT INTO Books(title,author) VALUES('${newBook.title}','${newBook.author}')`, 
                            function (error, book, fields) {
            if (error) throw error;
            res.send(book)
          });
           
          connection.end();
    })

router.route("/:id")
    .put((req,res)=>{
        var id=req.params.id;
        var newBook=req.body;

        var connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          
          connection.connect();
 
          connection.query(`
            UPDATE Books
            SET title='${newBook.title}',
                author='${newBook.author}'
            WHERE id=${id}
          `, 
            function (error, book, fields) {
            if (error) throw error;
            res.send(book)
          });
           
          connection.end();
    })
    .delete((req,res)=>{
        var id=req.params.id;
        
        var connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          
          connection.connect();
 
          connection.query(`
            DELETE FROM Books
            WHERE id=${id}
          `, 
            function (error, book, fields) {
            if (error) throw error;
            res.send(book)
          });
           
          connection.end();
    })

router.route("/search/:keyword")
    .get((req,res)=>{
        var keyword=req.params.keyword;

        var connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          
          connection.connect();
 
          connection.query(`
            SELECT * FROM Books
            WHERE title LIKE '%${keyword}%'
          `, 
            function (error, book, fields) {
            if (error) throw error;
            res.send(book)
          });
           
          connection.end();
    })

module.exports=router;