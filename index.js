
//require the just installed express app
var express = require('express');

const server = require('./server');
var router = express.Router();
const knex = require('knex')({
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : 'postgres',
      password : '39814Lsl',
      database : 'postgres',
      charset  : 'utf8'
    }
  })
  
  const bookshelf = require('bookshelf')(knex)

//then we call express
var app = express();
var router = express.Router();

app.set('view engine', 'ejs');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var User = bookshelf.model('User', {
    tableName: 'User'
})
var TodoTask = bookshelf.model('TodoTask', {
    tableName: 'TodoTask'
})
var CompletedTask = bookshelf.model('CompletedTask', {
    tableName: 'CompletedTask'
})

//takes us to the root(/) URL
app.get('/', function (req, res) {
//when we visit the root URL express will respond with 'Hello World'
  res.render('index',{ task: task,complete: complete});
});

//the task array with initial placeholders for added task
var task = ["buy socks", "practise with nodejs"];
//post route for adding new task
app.post('/addtask', function (req, res) {
  TodoTask.forge(
    {Task: req.body.newtask}
  ).save()
    var newTask = req.body.newtask;
//add the new task from the post route into the array
    task.push(newTask);
    
//after adding to the array go back to the root route
    res.redirect("/");
});

app.delete("/removetask", function(req, res) {
  TodoTask.forge({
    Task: req.body.check
  }).fetch({require: true}).then(function(task) {
    task.destroy()
  })
})
//the completed task array with initial placeholders for removed task
var complete = ["finish jquery"];
app.post("/removetask", function(req, res) {
    CompletedTask.forge({
      completedTask:req.body.check
    }).save()
     var completeTask = req.body.check;
//check for the "typeof" the different completed task, then add into the complete task
if (typeof completeTask === "string") {
     complete.push(completeTask);
//check if the completed task already exist in the task when checked, then remove using the array splice method
  task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {     complete.push(completeTask[i]);
    task.splice(task.indexOf(completeTask[i]), 1);
}
}
   res.redirect("/");
});

//the server is listening on port 3000 for connections
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});