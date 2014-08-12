'use strict';

var vehicleRepository = require('../vehicle/vehicle-repository');
var userRepository = require('../user/user-repository');
var config = require('./config');

var vehicleSeed = {};

vehicleSeed.delete = function (cb) {
  vehicleRepository.deleteAll(cb);
};

vehicleSeed.seed = function (cb) {
  config.users.forEach(function (userConfig) {
    userRepository.getUserByName(userConfig.name, function (err, userModel) {
      if(err) { return console.error(err); }

      var vehicleInput = {
        vehiclesCollection: userConfig.vehicles,
        userId: userModel.id
      };

      vehicleRepository.save(vehicleInput, function (err, data) {
        if(err){ console.error(err); }

        cb();
      });
    });
  });
};

module.exports = vehicleSeed;
