const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')
const mysql = require('mysql');
const d = new Date();
let connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Notes'
  });


/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */
router.get('/', (req, res) => 
{
  console.log(`[GET] http://localhost:${global.port}/notes - Fetching all notes`)
  var sql = 'SELECT * FROM Notes';
  connection.query(sql, function (err, notes) 
  {
     if (err){ throw err;}
     console.log("row is inserted");
     res.send({notes});
  });
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-7 - Search Notes -------------------------- */
router.get('/search/:searchKey', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes/search - Searching the notes`)

  /*
    TODO-7:
      Given a search key
      Fetch all notes from the database that contains the search key in the note content
      Return an array of matching note objects

      Search key is sotred in variable searchKey

      Your notes object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
        const searchKey = req.params.searchKey
        var sql = "SELECT * FROM Notes WHERE text like"+"\'"+"%"+searchKey+"%"+"\'";
               connection.query(sql, function (err, notes) {
                  if (err){ throw err;}
                  console.log("row searches");
                  res.send({notes});
              });
        
  console.log(searchKey)
})

/* -------------------------------------------------------------------------- */

/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete('/', (req, res) => 
{
  console.log(`[DELETE] http://localhost:${global.port}/notes - Deleting all notes`)

  /*
    TODO-8:
      Delete all notes from the database
  */var sql = "DELETE FROM Notes";
  connection.query(sql, function (err, notes) 
  {
    if (err){ throw err;}
    console.log("deleted data");
    res.send();
  });
  res.send()
})
/* -------------------------------------------------------------------------- */
module.exports = router