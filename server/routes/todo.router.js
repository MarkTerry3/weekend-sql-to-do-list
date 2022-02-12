const express = require("express");
const toDoRouter = express.Router();

// DB CONNECTION
const pool = require("../modules/pool");






toDoRouter.get("/", (req, res) => {
    // let successMessage = {
    //     message: 'Success'
    // }
    let queryText = `SELECT * FROM "to-do"`;
    console.log("GETTING?!");
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("GET ERROR", error);
        res.sendStatus(500);
      });
  
    // res.send(successMessage)
  });



toDoRouter.post('/', (req, res) => {
    const newTask = req.body
    console.log(newTask, 'todoRouter POST');
    
    const queryText = `INSERT INTO "to-do" ("task", "due-by", "completed")
                        VALUES ($1, $2, $3);`;

        //parameterized query below, prevents SQL injection
    pool.query(queryText, [newTask.task, newTask.dueBy, newTask.completed])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('error querying', queryText, err);
        res.sendStatus(500);
    })
    // console.log(req.body); --- original code

    // res.sendStatus(200)
})





// TODO - DELETE 
// Removes a task to show that it has been done
// Request must include a parameter indicating what book to update - the id

toDoRouter.delete('/:id', (req, res) =>{
    let reqId = req.params.id;
    console.log('DELETE id', reqId);
    let queryText = 'DELETE FROM "to-do" WHERE "id" = $1;';
    pool.query(queryText, [reqId])
        .then((result) => {
            console.log('task deleted');
            res.sendStatus(200);
            
        })
        .catch((error) =>{
            console.log('error making database query', queryText, error);
            res.sendStatus(500);
            
        })
    
  })





//UPADTE
//:id can be anything, could be :taco, which will be put at the end of req.params.id || req.params.taco
toDoRouter.put('/:id', (req, res) =>{
    // req.params.id --> this will be your $1, 
    let idToUpdate = req.params.id;
    console.log(idToUpdate);
    
    console.log(req.body);

  
    let sqlText = `
        UPDATE "to-do"
        SET "completed" = true
        WHERE "id" = $1;`
  
    let sqlValues = [idToUpdate];
  
  
      
      // the sqlText is what were sending to the db, and the database is like ok i got a $1, so you also have to send
      // what the user input which is in this case "sqlValues"
      // this is how we sanitize our sql queries so nobody can act maliciously
      // pool.query is passing this to the database
    pool.query(sqlText, sqlValues)
    .then(result => {
        console.log(result);
        
        res.sendStatus(200);
  
    }).catch(err => {
        console.log(err);
        
        res.sendStatus(500)
  
    })
  
  
  
    // res.sendStatus(400);
    
  })


























module.exports = toDoRouter;