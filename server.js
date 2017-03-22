var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:'mathanjeevika',
    database:'mathanjeevika',
    host:'db.imad.hasura.app-io',
    port:'5432',
    password:process.emv.DB.PASSWORD
}

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(req,res)
{
   res.send('this is first article'); 
});
app.get('/article-two',function(req,res)
{
   res.send('this is Second article'); 
});
app.get('/article-three',function(req,res)
{
   res.send('this is Third article'); 
});
app.get('/article-four',function(req,res)
{
   res.send('this is fourth article'); 
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
