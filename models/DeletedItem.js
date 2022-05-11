const db = require('../config/db');

class DeletedItem {
  constructor(inventoryId, comment) {
    this.inventoryId = inventoryId;
    this.comment = comment;
  }

  save() {
    const sql = `
            INSERT INTO DELETED_ITEMS (
                inventoryId,
                comment
            )
            VALUES (?, ?);
        `;

    return db.execute(sql, [
      this.inventoryId, this.comment
    ]);
  }

  static findById(id) {
    const sql = `SELECT inventoryId FROM DELETED_ITEMS WHERE id = ${id} LIMIT 1`;

    return db.execute(sql);
  }

  static findByInventoryId(id) {
    const sql = `SELECT id FROM DELETED_ITEMS WHERE inventoryId = ${id} LIMIT 1`;

    return db.execute(sql);
  }

  static findAllDeleted() {
    const sql = `SELECT di.id as deletedId, di.inventoryId, di.comment, di.date as dateDeleted, i.date as dateCreated, i.name, i.description, i.sender, i.receiver, i.barcodeDigits, i.status 
                  FROM DELETED_ITEMS di, INVENTORY_ITEMS i WHERE di.inventoryId = i.id ORDER BY di.date DESC`;

    return db.execute(sql);
  }

  static deleteById(id) {
    const sql = `
            DELETE FROM DELETED_ITEMS WHERE id = '${id} LIMIT 1';
        `;

    return db.execute(sql);
  }
}

module.exports = DeletedItem;
