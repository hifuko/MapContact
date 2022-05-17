/*
Routing and handling of REST requests to users collection

Implemented Requests:
* POST /login : Log in by identification and password; returns auth token and user data
* GET /:userID : get user by identification; protected by auth token; returns user data
* POST /signup : create new user by JSON user Object; protected by auth token

May be done:
* check if user performing /signup is admin

*/

// MODULES
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');
// DATA MODELS
const User = require("../models/user.js");

// LOGIN
router.post("/login", (req, res, next) => {
	// GET USER BY ID
	User.find({
			identification: req.body.identification
		})
		.exec()
		.then(user => {
			if (user.length < 1) {
				return res.status(401).json({
					message: "Auth failed"
				});
			}
			// COMPARE POSTED PASSWORD TO STORED PASSWORD
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: "Auth failed"
					});
				}
				// CREATE TOKEN IF MATCHES
				if (result) {
					const token = jwt.sign({
							firstName: user[0].firstName,
							lastName: user[0].lastName,
							isAdmin: user[0].isAdmin,
							userId: user[0].identification
						},
						process.env.JWT_KEY,
						{ expiresIn: "3h" }
					);
					// RETURN SUCESS MESSAGE, TOKEN, USERDATA
					return res.status(200).json({
						message: "Auth successful",
						token: "Bearer "+token,
						user: user[0]
					});
				} //if result
				res.status(401).json({
					message: "Auth failed"
				});
			});
		}) //then
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		}); //error handling
}); //POST REQUEST

// GET USER BY ID
router.get('/:userId', checkAuth, (req, res, next) => {
	User.find({
		identification: req.params.userId
		})
		.exec()
		.then(user => {
			console.log(user);
			res.status(200).json(user);
		}) //then
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		}); //error handling
}); //GET REQUEST

// REGISTER USER TO DATABASE
router.post('/signup', checkAuth, (req, res, next) => {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			return res.status(500).json({
				error: err
			});
		} else {
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				identification: req.body.identification,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				password: hash,
				isAdmin: req.body.isAdmin
			});
			user
				.save()
				.then(result => {
					console.log(result);
					res.status(201).json({
						message: "Created user successfully"
					});
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({
						error: err
					});
				});
		}
	});
}); //POST REQUEST

module.exports = router;