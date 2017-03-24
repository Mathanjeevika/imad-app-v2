var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
app.use(morgan('combined'));


var content={
    title:"Article-one i am mathan kumar",
    heading:"article one",
    date:"24/03/2017",
    content:`
    <p>
                    This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article
                </p>`
    
};

function createtemplate (data) {
    var title =data.title;
    var heading=data.heading;
    var date = data.date;
    var content = data.content;

            var htmlTemplate=`
                <html>
               
                    <head>
                        <title>
                             $[title]
                        </title>
                        <style>
                            .conatiner{
                                 max-width:800px;
                                 margin:0 auto;
                                 color:blue;
                                 font-family:sans-serif;
                             } 
                        </style>
                     </head>
                     <body>
                        <div class="container" >
                            <div>
                                123
                            </div>
                            <hr/>
                            <div>
                                $[heading]
                            </div>
                            <div>
                                $[date]
                            </div>
                            <div>
                                $[content]
                            </div>
                        </div>
                    </body>
                </html>
                 ';
        return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/article-one',function(req,res)
{
   res.send(createtemplate(articleone)) ;
});
app.get('/article-two',function(req,res)
{
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html')); 
});
app.get('/article-three',function(req,res)
{
   res.sendFile(path.join(__dirname, 'ui', 'article-thre.html'));  
});
app.get('/article-four',function(req,res)
{
   res.sendFile(path.join(__dirname, 'ui', 'article-four.html')); 
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
