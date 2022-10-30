const config = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mysql = require('mysql')

const healthRouter = require("./routes/health")
const notesRouter = require("./routes/notes")
const noteRouter = require("./routes/note")

let connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Notes'
  });


// Here we have to make Function Connect that will connect the mysql with app.js
function connect()
{
  // Validating the request....
  connection.connect(function(err) 
  {
    if (err) 
    {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server..........');
 });
}
if (config.error) 
{
  throw config.error
}

const port = process.env.PORT // || 3001
global.port = port

const corsOptions =
{
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
  TODO-1: Settup Database connection
*/
connect();

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.

/*
  TODO-2: Upon database connection success, create the relavent table(s) if it does not exist.
*/var sql = "CREATE TABLE IF NOT EXISTS Notes (id int primary key AUTO_INCREMENT, text VARCHAR(255), lastModified VARCHAR(255),  dateCreated VARCHAR(255))";
connection.query(sql, function (err, result) 
{
  if (err) throw err;
  console.log("Table has been created");
}); 

app.get('/', (req, res) => 
{
  res.send('CSBC1010 Assignment 3 - My Notes')
})

app.use("/health", healthRouter)
app.use("/notes", notesRouter)
app.use("/note", noteRouter)

app.listen(port, () => 
{
  console.log(`Server listening at http://localhost:${port}`)
})