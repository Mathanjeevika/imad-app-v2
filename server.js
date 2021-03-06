var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require(crypto);
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

function hash(input,salt)
{
    var hashed = crypto.pbkdf2Sync('input','salt',10000,512,'sha512');
    return ('pbkdf','10000','salt',hashed.toString('hex')).join('$0');
}


app.get('/create-user',function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.getRandomByte(128).toString('hex');
   var dbstring = hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',(username,dbstring),function(err,result){
       if(err) 
       {
            res.status(500).send(err,toString());
       }
        else
        {
            res.send('user created'+username);
        }    
   });
});
app.get('/hash/:input',function(req,res)
{
   var hashstring = hash(req.parans.input,'this is sample salt vallue');
   res.send(hashstring);
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result)
    {
       if(err) 
       {
            res.status(500).send(err,toString());
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
app.get('/articles/:articleName', function (req, res) {
    pool.query("SELECT * FROM article WHERE title="+req.parans.articleName,function(err,result)
    {
       if(err)
       {
           res.status(500).send(err,toString());
       }
       else
       {
           if(result.row.length === 0)
           {
               res.status(404).send("ArticleNot Found");
           }
           else
           {
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
    });

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
