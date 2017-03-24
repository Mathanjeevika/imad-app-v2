var express =require('express');
var morgan =require('morgan');
var path = require('path');

var app =express();
app.use(morgan('combined'));



app.get('/article-one',function(req,res) {
    res.sendFile(path,join(_dirname,'ui','article-one.html'));
});

app.get('/article-two' ,function(req,res) {
    res.sendFile(path,join(_dirname,'ui','article-two.html'));
});

app.get('/article-four',function(req,res) {
    res.sendFile(path,join(_dirname,'ui','article-four.html'));
});

app.get('/article-three',function(req,res) {
    res.sendFile(path,join(_dirname,'ui','article-three.html'));
});
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