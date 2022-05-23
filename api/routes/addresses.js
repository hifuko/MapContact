/*
Routing and handling of REST requests to addresses collection

Implemented Requests:
* POST / : create new address with JSON address object; protected by auth token; returns created object with location
* GET / : retrieve all addresses; protected by auth token; returns address list as JSON object
* GET /:addressId : get address by _id; protected by auth token; returns address data
* PATCH /:addressId : update address by _id with complete JSON address object; protected by auth token;
* DELETE /:addressId : delete address by _id; protected by auth token;

May be done:
* PATCH request allows partial address
* split GET requests for all addresses / only private addresses

*/

// MODULES
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth');
// DATA MODELS
const Address = require("../models/address.js");

// POST ADDRESS TO DATABASE
router.post('/', checkAuth, (req, res, next) => {
  // SET OBJECT FROM REQUEST BODY
  const address = new Address({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    street: req.body.street,
    postCode: req.body.postCode,
    city: req.body.city,
    country: req.body.country,
    isPrivate: req.body.isPrivate,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  // SAVE OBJECT TO DATABASE AND RETURN OBJECT AND LOCATION IN RESULT BODY
  address
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created address successfully",
        Address: {
          _id: result._id,
          firstName: result.firstName,
          name: result.name,
          street: result.street,
          postCode: result.postCode,
          city: result.city,
          country: result.country,
          isPrivate: result.isPrivate,
          latitude: result.latitude,
          longitude: result.longitude,
        },
        location: process.env.REACT_APP_URL + "addresses/" + result._id
      });
    }) //then
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }); //error handling
}); //POST REQUEST

// GET ALL ADDRESSES
router.get('/', checkAuth, (req, res, next) => {
  Address.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        addresses: docs.map(doc => {
          return {
            _id: doc._id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            street: doc.street,
            postCode: doc.postCode,
            city: doc.city,
            country: doc.country,
            isPrivate: doc.isPrivate,
            latitude: doc.latitude,
            longitude: doc.longitude,
            location: process.env.REACT_APP_URL + "addresses/" + doc._id
          };
        })
      };
      // CHECK IF ANY ADDRESSES WERE FOUND
      if (docs.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: 'No entries found'
        });
      }
    }) //then
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }); //error handling
}); //GET REQUEST

// GET ADDRESS BY ID
router.get('/:addressId', checkAuth, (req, res, next) => {
  const id = req.params.addressId;
  Address.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      const response = {
        address: {
          _id: doc._id,
          firstName: doc.firstName,
          lastName: doc.lastName,
          street: doc.street,
          postCode: doc.postCode,
          city: doc.city,
          country: doc.country,
          isPrivate: doc.isPrivate,
          latitude: doc.latitude,
          longitude: doc.longitude,
          location: process.env.REACT_APP_URL + "addresses/" + doc._id
        }
      };
      res.status(200).json(response);
    }) //then
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }); //error handling
}); //GET REQUEST

// UPDATE ADDRESS BY ID
router.patch('/:addressId', checkAuth, (req, res, next) => {
  const id = req.params.addressId;

  Address.update(
    { _id: id },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      street: req.body.street,
      postCode: req.body.postCode,
      city: req.body.city,
      country: req.body.country,
      isPrivate: req.body.isPrivate,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    }
  ).then(result => {
    res.status(200).json({
      message: "Updates address successfully"
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }); //error handling
}); //PATCH REQUEST

// DELETE ADDRESS BY ID
router.delete('/:addressId', checkAuth, (req, res, next) => {
  const id = req.params.addressId;
  Address.findByIdAndRemove(id)
    .exec()
    .then( () => {
      res.status(200).json({
        message: "Deleted address successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }); //error handling
}); //DELETE REQUEST

module.exports = router;