// locations.js
const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getLocationById);
router.post('/', locationController.createLocation);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);
router.post('/:locationId/devices', locationController.addDeviceToLocation);
router.delete('/:locationId/devices/:deviceId', locationController.removeDeviceFromLocation);

module.exports = router;
