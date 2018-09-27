var express=require('express');
var app=express();

app.set('view engine','ejs');
app.use('/css',express.static('views'));
var reg=require('./controller/registrationcontroller');
reg(app);




app.listen(3000);