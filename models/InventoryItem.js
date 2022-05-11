const db = require('../config/db');

class InventoryItem {
  constructor(name, description, barcodeDigits, sender, receiver) {
    this.name = name;
    this.description = description;
    this.barcodeDigits = barcodeDigits;
    this.sender = sender;
    this.receiver = receiver;
    this.status = "Ready";
  }

  save() {
    const sql = `
            INSERT INTO INVENTORY_ITEMS (
                name,
                description,
                barcodeDigits,
                sender,
                receiver,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?);
        `;

    return db.execute(sql, [
      this.name, this.description, this.barcodeDigits, this.sender, this.receiver, this.status
    ]);
  }

  static findById(id) {
    const sql = `SELECT
                    date, name, description, barcodeDigits, sender, receiver, status
                    FROM INVENTORY_ITEMS WHERE id = '${id} LIMIT 2' `;

    return db.execute(sql);
  }

  static updateById(id, name, description, barcodeDigits, sender, receiver, status) {
    const sql = `
            UPDATE INVENTORY_ITEMS
            SET name = '${name}', description = '${description}', barcodeDigits  = '${barcodeDigits}',
                sender = '${sender}', receiver = '${receiver}'
            WHERE id = ${id};
        `;

    return db.execute(sql);
  }

  static findAll() {
    const sql = `
            SELECT
                id, date, name, description, barcodeDigits, sender, receiver, status
            FROM INVENTORY_ITEMS WHERE status = 'Ready' ORDER BY date DESC
        `;

    return db.execute(sql);
  }



  static deleteById(id) {
    const sql = `
        UPDATE INVENTORY_ITEMS
        SET status = 'Deleted'
        WHERE id = ${id};
      `;

    return db.execute(sql);
  }

  static undeleteById(id) {
    const sql = `
        UPDATE INVENTORY_ITEMS
        SET status = 'Ready'
        WHERE id = ${id};
      `;

    return db.execute(sql);
  }

}

module.exports = InventoryItem;
