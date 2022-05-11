const express = require('express');
const inventoryController = require('../controllers/inventoryItems');
const router = express.Router();

router.get('/', inventoryController.getAllInventoryItems)

router.get('/deletedInventory', inventoryController.getAllDeletedItems)

router.get('/createForm', function (req, res, next) {
  res.render('pages/createInventoryForm', {
    errors: []
  });
})

router.get('/:id/editForm', function (req, res, next) {
  const { id } = req.params;
  const { barcodeDigits, sender, receiver, name, description } = req.query;

  res.render('pages/editInventoryForm', {
    id: id,
    barcodeDigits: barcodeDigits,
    sender: sender,
    receiver: receiver,
    name: name,
    description: description,
    errors: []
  });
})

router.get('/:id/deleteForm', function (req, res, next) {
  const { id } = req.params;

  res.render('pages/deleteInventoryForm', {
    id: id
  });
})

router.post('/create', inventoryController.createInventoryItem)

router.put('/:id/update', inventoryController.updateInventoryItem)

router.put('/:id/delete', inventoryController.deleteById)

router.put('/:id/undelete', inventoryController.undeleteById)

router.get('/deletedItems', inventoryController.getAllDeletedItems)

module.exports = router;
