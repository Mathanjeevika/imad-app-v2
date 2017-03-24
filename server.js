var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;

var config={
    user:'mathanjeevika',
    database:'mathanjeevika',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:'process.emv.DB.PASSWORD'
};
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result)
    {
       if(err) 
       {
            res.status(500).send(err,tostring());
       }
        else
        {
            res.send('JSON',stringify(result,rows));
        }    
    });
});
var articles ={
    'article-one':{
        title:"This Is Article One From MathanKumar",
        heading:"Article One",
        date:"24/03/2017",
        content:` <p>
                        This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article
                    </p>`
    },
    'article-two':{
        title:"This Is Article Two From MathanKumar",
        heading:"Article Two",
        date:"24/01/2017",
        content:` <p>
                        This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article
                    </p>`
    
    },
    'article-three':{
        title:"This Is Article Three From MathanKumar",
        heading:"Article Three",
        date:"24/02/2017",
        content:` <p>
                        This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article
                    </p>`
    
    },
    'article-four':{
        title:"This Is Article Four From MathanKumar",
        heading:"Article Four",
        date:"25/03/2017",
        content:` <p>
                        This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article This is the content of the article
                    </p>`
    
    }
};
function createTemplate(data){
        var title=data.title;
        var date=data.date;
        var content=data.content;
        var heading=data.heading;

        var htmlTemplate =`
        <html>
            
            <head>
              <title>
                  ${title}
              </title> 
              <meta name ="viewport" content ="width-device-width,initial-scale=1">
              <link href="/ui/style.css" rel="stylrsheet" />
            </head>
            <body>
               <div class="container" >
                    <div>
                        Home
                    </div>
                    <hr/>
                    <div>
                        ${heading}
                    </div>
                    <div>
                        ${date}             
                    </div>
                    <div>
                        ${content};
                    </div>
                </div>
            </body>
        </html>
        `;
        return htmlTemplate;
}
app.get('/:articleName', function (req, res) {
    var articleName=req.parans.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
