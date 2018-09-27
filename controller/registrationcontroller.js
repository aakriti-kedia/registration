var bodyparser=require('body-parser');
var mongo=require('mongoose');
mongo.connect('mongodb://localhost:27017/nameofdb');
// import alert from 'alert-node'
var schema=new mongo.Schema(
{
	
	name:String,
	email:String,
	dob:Date,
	mob:Number

});

var model=mongo.model('model',schema);
var urlep=bodyparser.urlencoded({extended:false});
module.exports=function(app)
{
	app.get(['/','/home'],function(req,res)
	{
		res.render('home');
	});
	app.get('/register',function(req,res)
	{
		res.render('register');
	});
	app.get('/registration',function(req,res)
	{
		// res.render('registration',{recno:0});
		model.find({},function(err,data)
		{
			if(err)
				throw err;
			var records=data.length;
			res.render('registration',{recno:records,data:data});
		});
	});
	app.post('/register',urlep,function(req,res)
	{
		var newreg=model(req.body).save(function(err,data)
		{
			if(err)
				throw err;		

			// alert(data+'Added successfully');
			// res.json(data);
			res.render('home');
		});
		
	});
	app.delete('/registration/:id',function(req,res)
	{
		model.find({_id:req.params.id}).remove(function(err,data)
		{
			if(err)
				throw err;
			 res.json(data);
			  //res.send(req.params.email+' Deleted successfully');
		});
	});
	app.get('/editregistration/:id',function(req,res)
	{

		model.find({_id:req.params.id},function(err,data)
		{
			if(err)
				throw data;
			// console.log(data);
			res.render('editregistration',{data:data[0]});
		});
		 // res.render('editregistration');
	});
	app.post('/editregistration',urlep,function(req,res)
	{
		console.log(req.body);
		model.findOneAndUpdate({"_id":req.body.id},{
				"name":req.body.name,
				"email":req.body.email,
				"mob":req.body.mob,
				"dob":req.body.dob},{upsert:false},function(err,data)
		{
			if(err)
				throw err;
			res.redirect('/registration');
		});




		
	});

	
}

