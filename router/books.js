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
 
          connection.query(`SELECT *from books`, function (error, books, fields) {
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
 
          connection.query(`INSERT INTO books(title,author_fname,author_lname,released_year,stock_quantity,pages) values('${newBook.title}','${newBook.author_fname}','${newBook.author_lname}','${newBook.released_year}','${newBook.stock_quantity}','${newBook.pages}')`, function (error, books, fields) {
            if (error) throw error;
            res.send(books)
                                                                                                                      
           });
          connection.end();
        
   
    })

router.route("/:id")
    .put((req,res)=>{
        // var books_id=req.params.books_id;
        // var bookToBeupdated=books.filter((book)=>{
        //     return book.books_id==books_id
        // })
        // bookToBeupdated[0].title="Oracle Pro"
        // res.send(bookToBeupdated)
        var id=req.params.id;
    var newBook=req.body;
        var connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();
 
          connection.query(`UPDATE Books
            SET title='${newBook.title}',
            author_lname='${newBook.author_lname}'
            WHERE book_id=${id}`, 
            function (error, books, fields) {
            if (error) throw error;
            res.send(books)
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
            WHERE book_id=${id}
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
            function (error, books, fields) {
            if (error) throw error;
            res.send(books)
          });
           
          connection.end();
    })

module.exports=router;
