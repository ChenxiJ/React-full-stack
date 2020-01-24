let express = require('express');
let bodyparser = require('body-parser');
let morgan = require("morgan");
let { Pool } = require("pg");
const PORT = 8888;

let pool = new Pool({
    host : 'localhost',
    database : 'catbank',
    user : 'postgres',
    password : 'postgres',
    port : 5432,
    max : 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

let app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:true }));
app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "DELETE, POST, PUT, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.get('/', function(req,res) {
// res.send("Hello From Docker");
// });

app.get('/banks', function(request, response) {
    pool.connect((err, client, release) => {
        if(err) {
            return response.status(400).send(err.stack);
        } 
        client.query('SELECT * FROM bank ORDER BY position', (err, table) => {
            release();
            if (err) {
                return response.status(400).send(err.stack);
            }            
            console.log('GET DATA SUCCESS'); 
            response.status(201).send(table.rows)          
        })       
    });
});

app.put('/banks/:id', function(request, response) {
    const id = parseInt(request.params.id)
    pool.connect((err, client, release) => {
        if(err) {
            return response.status(400).send(err.stack);
        }
        client.query('UPDATE bank SET position = $1 WHERE id = $2', [request.body.pos, id], (err) => {
            release();
            if (err) {
                return response.status(400).send(err.stack);
            }
            console.log('UPDATE DATA SUCCESS');
            response.status(201).send({message:'Data updated!'});
        })        
    });
});

app.listen(PORT, () => console.log("Listening on port "+ PORT));