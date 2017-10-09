var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();
var db = mongojs('mongodb://user:12aBCd34@ds064198.mlab.com:64198/mongo', [
	'category', 'muscle', 'exercise'
])
		
// CATEGORY
		// Get All Category
		router.get('/category', function(req, res, next) {
			db.category.find(function(err, vos){
				if (err){
					res.send(err);
				}
				res.json(vos);
			})
		});
		
		// Get Single Category
		router.get('/category/:id', function(req, res, next) {
			db.category.findOne({"_id": mongojs.ObjectId(req.params.id)}, function(err, vo){
				if (err){
					res.send(err);
				}
				res.json(vo);
			})
		});
		
		// Create Category
		router.post('/category', function(req, res, next){
			var vo = req.body;
			if (!vo.cat_id
					|| !vo.cat_name
					|| !vo.cat_img) {
				res.status(400);
				res.json({
					"error": "Bad Data: "+vo
				});
			} else {
				db.category.save(vo, function(err, newVo){
					if (err){
						res.send(err);
					}
					res.json(newVo);
				});
			}
		});
		
		// Delete Category
		router.delete('/category/:id', function(req, res, next) {
			db.category.remove({"_id": mongojs.ObjectId(req.params.id)}, function(err, vo){
				if (err){
					res.send(err);
				}
				res.json(vo);
			})
		});
		
		// Update Category
		router.put('/category/:id', function(req, res, next) {
			var vo = req.body;
			var updateVo = {};
			
			if (vo.cat_id) updateVo.cat_id = vo.cat_id;
			if (vo.cat_name) updateVo.cat_name = vo.cat_name;
			if (vo.cat_img) updateVo.cat_img = vo.cat_img;
			
			if (!updateVo){
				req.status(400);
				req.json({
					"error":"Bad Data: "+updateVo
				});
			}
			
			db.category.update({"_id": mongojs.ObjectId(req.params.id)}, updateVo, {}, function(err, vo){
				if (err){
					res.send(err);
				}
				res.json(vo);
			})
		});
		
// MUSCLE
		// Get All Muscle
		router.get('/muscle', function(req, res, next) {
			db.muscle.find(function(err, vos){
				if (err){
					res.send(err);
				}
				res.json(vos);
			})
		});
		
		// Get Single Muscle
		router.get('/muscle/:id', function(req, res, next) {
			db.muscle.findOne({"_id": mongojs.ObjectId(req.params.id)}, function(err, vo){
				if (err){
					res.send(err);
				}
				res.json(vo);
			})
		});
		
		// Create Muscle
		router.post('/muscle', function(req, res, next){
			var vo = req.body;
			if (!vo.name
					|| !vo.cname
					|| !vo.img
					|| !vo.desc
					|| !vo.seq) {
				res.status(400);
				res.json({
					"error": "Bad Data: " + vo
				});
			} else {
				db.muscle.save(vo, function(err, newVo){
					if (err){
						res.send(err);
					}
					res.json(newVo);
				});
			}
		});
		
		// Delete Muscle
		router.delete('/muscle/:id', function(req, res, next) {
			db.muscle.remove({"_id": mongojs.ObjectId(req.params.id)}, function(err, cat){
				if (err){
					res.send(err);
				}
				res.json(cat);
			})
		});
		
		// Update muscle
		router.put('/muscle/:id', function(req, res, next) {
			var vo = req.body;
			var updateVo = {};
			
			if (vo.name) updateVo.name = vo.name;
			if (vo.cname) updateVo.cname = vo.cname;
			if (vo.img) updateVo.img = vo.img;
			if (vo.desc) updateVo.desc = vo.desc;
			if (vo.seq) updateVo.seq = vo.seq;
			
			
			if (!updateVo){
				req.status(400);
				req.json({
					"error":"Bad Data: "+updateVo
				});
			}
			
			db.muscle.update({"_id": mongojs.ObjectId(req.params.id)}, updateVo, {}, function(err, vo){
				if (err){
					res.send(err);
				}
				res.json(vo);
			})
		});
// End MUSCLE


// EXERCISE
		// Get Single Exercise
		router.get('/exercise/:id', function(req, res, next) {
			db.exercise.findOne({"_id": mongojs.ObjectId(req.params.id)}, function(err, vo){
				if (err){
					res.send(err);
				}
				res.json(vo);
			})
		});
		
		// Get All Muscle
		router.get('/exercise', function(req, res, next) {
			db.exercise.find(function(err, vos){
				if (err){
					res.send(err);
				}
				res.json(vos);
			})
		});
		
		// Get Exercise by Name
		router.get('/exercise/getByName/:name', function(req, res, next) {
			db.exercise.find({"muscle": req.params.name}, function(err, vos){
				if (err){
					res.send(err);
				}
				res.json(vos);
			})
		});
		
		// Create Exercise
		router.post('/exercise', function(req, res, next){
			var vo = req.body;
	
			if (!vo.ex_id
					|| (!vo.name || !vo.cname)
					|| !vo.muscle
					|| !vo.reps
					|| !vo.sets) {
				res.status(400);
				res.json({
					"error": "Bad Data: " + vo
				});
			} else {
				db.exercise.save(vo, function(err, newVo){
					if (err){
						res.send(err);
					}
					res.json(newVo);
				});
			}
		});
		
		// Delete exercise
		router.delete('/exercise/:id', function(req, res, next) {
			db.exercise.remove({"_id": mongojs.ObjectId(req.params.id)}, function(err, cat){
				if (err){
					res.send(err);
				}
				res.json(cat);
			})
		});
		
		// Update exercise
		router.put('/exercise/:id', function(req, res, next) {
			var vo = req.body;
			var updateVo = {};
			
			if (vo.ex_id) updateVo.ex_id = vo.ex_id;
			if (vo.name) updateVo.name = vo.name;
			if (vo.cname) updateVo.cname = vo.cname;
			if (vo.muscle) updateVo.muscle = vo.muscle;
			if (vo.reps) updateVo.reps = vo.reps;
			if (vo.sets) updateVo.sets = vo.sets;
			if (vo.desc) updateVo.desc = vo.desc;
			if (vo.img) updateVo.img = vo.img;
			
			
			if (!updateVo){
				req.status(400);
				req.json({
					"error":"Bad Data: "+updateVo
				});
			}
			
			db.exercise.update({"_id": mongojs.ObjectId(req.params.id)}, updateVo, {}, function(err, vo){
				if (err){
					res.send(err);
				}
				res.json(vo);
			})
		});
// End EXERCISE


module.exports = router;
