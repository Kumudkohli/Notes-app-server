const express = require('express')
const router = express.Router()
const { validateNote } = require('../utils/validators')
const mysql = require('mysql');
const d = new Date();
let connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Notes'
  });

/* ------------------------ TODO-4 - Create New Note ------------------------ */
router.post('/', (req, res) => {
  console.log(`[POST] http://localhost:${global.port}/note - Storing a new note`)
  const addnote ={
    text: req.body.text,
};   

var sql = 'INSERT INTO Notes(text,dateCreated,lastModified) VALUES ("'+addnote.text+ '","'+d+'","'+d+'")';
   connection.query(sql, function (err, results) {
      if (err){ throw err;}
      console.log("row inserted");
      var sql = "select * from Notes where id  = '"+results.insertId+"'";
      connection.query(sql, function (err, newNote ) {
        if (err){ 
          throw err;
        }
        res.send(newNote);
    });
  });
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-5 - Update A Note ------------------------- */
router.put('/', (req, res) => 
{
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`)
  const noteId = req.body.id
	const newText = req.body.text
  var sql = "UPDATE Notes SET text = '" +newText+"',"+"lastModified = '"+d+"'"+"WHERE id  = '"+noteId+"'";
  connection.query(sql, function (err,updatedNote) 
  {
     if (err){ throw err;}
     console.log("row inserted");
     var sql = "select * from Notes where id  = '"+noteId+"'";
     connection.query(sql, function (err, updatedNote ) 
     {
      if (err)
      { 
        throw err;
      }
      res.send({updatedNote})
     });
  });
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-6 - Delete A Note ------------------------- */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`)
	const noteId = req.body.id
  var sql = "DELETE FROM Notes WHERE id  = '"+noteId+"'";
  connection.query(sql, function (err,updatedNote) {
    res.send()
});
})
/* -------------------------------------------------------------------------- */

module.exports = router
