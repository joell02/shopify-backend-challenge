const InventoryItem = require("../models/InventoryItem");
const DeletedItem = require("../models/DeletedItem");

exports.getAllInventoryItems = async (req, res, next) => {
  try {
    const [inventory, _] = await InventoryItem.findAll();

    res.render('pages/inventory', {
      inventory: inventory || []
    });
  } catch (error) {
    next(error);
  }
};

exports.createInventoryItem = async (req, res, next) => {
  try {
    const { name = null, description = null, barcodeDigits, sender, receiver = null } = req.body;
    const errors = [];
    let isValid = true;

    if (!barcodeDigits || barcodeDigits.length === 0) {
      isValid = false;
      errors.push({
        missingField: 'barcodeDigits',
      });
    }

    if (!sender || sender.length === 0) {
      isValid = false;
      errors.push({
        missingField: 'sender',
      });
    }

    if (isValid) {
      const newInventoryItem = new InventoryItem(name, description, barcodeDigits, sender, receiver);
      await newInventoryItem.save();
      res.redirect('/');
    } else {
      res.render('pages/createInventoryForm', {
        errors: errors
      });
    }
  } catch (error) {
    next(error);
  }
}

exports.updateInventoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name = null, description = null, barcodeDigits, sender = null, receiver = null } = req.body;
    const errors = [];
    let isValid = true;

    if (!barcodeDigits || barcodeDigits.length === 0) {
      isValid = false;
      errors.push({
        missingField: 'barcodeDigits',
      });
    }

    if (!sender || sender.length === 0) {
      isValid = false;
      errors.push({
        missingField: 'sender',
      });
    }

    if (isValid) {
      await InventoryItem.updateById(id, name, description, barcodeDigits, sender, receiver);
      await InventoryItem.findById(id);
      res.redirect('/');
    } else {
      res.render('pages/editInventoryForm', {
        id: id,
        barcodeDigits: barcodeDigits,
        sender: sender,
        receiver: receiver,
        name: name,
        description: description,
        errors: errors
      });
    }
  } catch (error) {
    next(error);
  }
}

exports.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment = null } = req.body;

    const [exists, _] = await DeletedItem.findByInventoryId(id);

    if (exists.length === 0) {
      await InventoryItem.deleteById(id);
      const newDeletedItem = new DeletedItem(id, comment);
      await newDeletedItem.save();

      res.redirect('/');
    } else {
      res.status(400).json({ success: false, errCode: '0003', error: 'Item has already been deleted' });
    }
  } catch (error) {
    next(error);
  }
}

exports.undeleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [exists, _] = await DeletedItem.findById(id);

    if (exists.length !== 0) {
      await InventoryItem.undeleteById(exists[0].inventoryId);
      await DeletedItem.deleteById(id);

      res.redirect('/deletedInventory');
    } else {
      res.status(400).json({ success: false, errCode: '0004', error: 'Item has not been deleted' });
    }

  } catch (error) {
    next(error);
  }
}

exports.getAllDeletedItems = async (req, res, next) => {
  try {
    const [deletedInventory, _] = await DeletedItem.findAllDeleted();

    res.render('pages/deletedInventory', {
      deletedInventory: deletedInventory || []
    });
  } catch (error) {
    next(error);
  }
}