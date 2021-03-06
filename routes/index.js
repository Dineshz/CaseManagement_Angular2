var express = require('express');
var router = express.Router();
var multer = require('multer');
var extend = require('util')._extend;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname  )
  }
});
// var upload = multer({ storage: storage })
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//upload.array('name',12);
var DIR = './uploads/';

// var upload = multer({dest: DIR});

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://valor-software.github.io');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

var upload = multer({
  dest: DIR,
  rename: function (fieldname, filename) {
    return filename + Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...');
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
  }
});
router.post('/api', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end(err.toString());
    }

    res.end('File is uploaded');
  });
  });

router.post("/upload", upload.single("cpdf"), function(req, res) {
	console.log(req.body);
	console.log(req.files);
    res.send(req.files);
});

router.get('/xcases', function(req, res){
	var Case = req.Case;
	if(req.query.id){
		Case.findById(req.query.id,function(err,lcase){
			if(err) res.send(console.log(err));
			res.send(lcase);
		});
	}else if(req.query.regex){
		var re = new RegExp(req.query.regex, 'i');
		var _or = [
			{  'type': 			{ $regex: re }   },
			{  'id': 			{ $regex: re }   },
			{  'dairy_no': 		{ $regex: re }   },
			// {  'year': 			req.query.regex  },
			{  'petitioner': 	{ $regex: re }   },
			{  'defendant': 	{ $regex: re }   },
			{  'client': 		{ $regex: re }   },
			{  'petadvocate': 	{ $regex: re }   },
			{  'defadvocate': 	{ $regex: re }   },
			{  'subject': 		{ $regex: re }   },
			{  'status': 		{ $regex: re }   },
			{  'judge': 		{ $regex: re }   },
			// {  'lastupdated': 	{ $regex: re }   },
			{  'hearings.date': 		{ $regex: re }   },
			{  'hearings.comment': 		{ $regex: re }   },
			{  'judgement': 	{ $regex: re }   },
			// {  'pdf': 			{ $regex: re }   },
			{  'court': 		{ $regex: re }   }
		];

		if (/^\d+$/.test(req.query.regex)) {
			_or.push({  'year': req.query.regex  });
		}

		Case.find({},{pdf:0}).or(_or).exec(function(err,xcases){
			if(err) res.send(console.log(err));
			res.send(xcases);
		});
	}else{
		Case.find({},{pdf:0},function(err, cases){
			if(err) res.send(console.log(err));
			res.send(cases);
		});
	}
});

router.get('/xcourts',function(req, res, next) {

	var Court = req.Court;
	if(req.query.id){
		Court.findById(req.query.id,function(err,court){
			if(err) res.send(console.log(err));
			res.send(court);
		});
	}else{
		Court.find(function(err, courts){
			if(err) res.send(console.log(err));
			res.send(courts);
		});
	}
});

router.post('/xcourts',function(req, res){
	var Court = req.Court;
	var court = new Court({ 
		title: 		req.body.title,
		shorttext: 	req.body.shorttext,
		ptitle: 	req.body.ptitle,
		dtitle: 	req.body.dtitle
	});
	court.save(function(err,court){
		if(err) res.send(console.log(err));
		res.send(court);
	})
});

router.put('/xcourts',function(req, res){
	var Court = req.Court;
	console.log('------------------');
	console.log(req.body);
	console.log('------------------');
	Court.findById(req.body._id, function(err, court){
		if(err) res.send(console.log(err));
		court.title = req.body.title;
		court.shorttext = req.body.shorttext;
		court.ptitle = req.body.ptitle;
		court.dtitle = req.body.dtitle;
		court.save(function(err, court){
			res.send(court);
		});
	});
});

router.delete('/xcourts',function(req, res){
	var Court = req.Court;
	Court.findById(req.query.id).remove().exec();
	Court.find(function(err, courts){
		if(err) res.send(console.log(err));
		res.send(courts);
	});
});

router.post('/xcases', function(req, res){
	var Case = req.Case;
	console.log('------------------');
	console.log(req.body);
	console.log('**************************');
	var lcase = new Case({ 
		court : req.body.court,
		type : req.body.type,
		id : req.body.id,
		dairy_no : req.body.dairy_no,
		year : req.body.year,
		petitioner : req.body.petitioner,
		defendant : req.body.defendant,
		client : req.body.client,
		petadvocate : req.body.petadvocate,
		defadvocate : req.body.defadvocate,
		subject : req.body.subject,
		status : req.body.status,
		judge : req.body.judge,
		lastupdated : new Date(),
		hearings : req.body.hearings,
		judgement : req.body.judgement,
		pdf : req.body.pdf
	});
	lcase.save(function(err,xcase){
		if(err) res.send(console.log(err));
		res.send(xcase);
	});
});

router.put('/xcases',function(req, res){
	var Case = req.Case;
	console.log('------------------');
	console.log(req.body);
	console.log('------------------');
	Case.findById(req.body._id, function(err, lcase){
		 
		lcase.court = req.body.court;
		lcase.type = req.body.type;
		lcase.id = req.body.id;
		lcase.dairy_no = req.body.dairy_no;
		lcase.year = req.body.year;
		lcase.petitioner = req.body.petitioner;
		lcase.defendant = req.body.defendant;
		lcase.client = req.body.client;
		lcase.petadvocate = req.body.petadvocate;
		lcase.defadvocate = req.body.defadvocate;
		lcase.subject = req.body.subject;
		lcase.status = req.body.status;
		lcase.judge = req.body.judge;
		lcase.lastupdated = new Date();
		lcase.hearings = req.body.hearings;
		lcase.judgement = req.body.judgement;
		lcase.pdf = req.body.pdf;
	
		lcase.save(function(err,lcase){
		if(err) res.send(console.log(err));
		res.send(lcase);
	})
	});
	
});

router.delete('/xcases',function(req, res){
	var Case = req.Case;
	Case.findById(req.query.id).remove().exec();
	Case.find(function(err, cases){
		if(err) res.send(console.log(err));
		res.send(cases);
	});
});

module.exports = router;
