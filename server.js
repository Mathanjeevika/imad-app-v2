var express =require('express');
var morgan =require('morgan');
var path = require('path');

var app =express();
app.use(morgan('combined'));



app.get('/',function(req,res) {
    res.sendFile(path,join(_dirname,'ui','index.html'));
});



app.get('/ui/styleclass',function(req,res) {
    res.sendFile(path,join(_dirname,'ui','styleclass.css'));
});

app.get('/ui/modi.png',function(req,res) {
    res.sendFile(path,join(_dirname,'ui','modi.png'));
});


var port =8080;

app.listion(8080,function() {
  console.log('Imad cource app is listening on port $[port]!');
});