const db = require('../config/db')
const squel = require('squel')

const TABLE_NAME = 'Animals'

db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  animalId INT NOT NULL AUTO_INCREMENT,
  clientId INT,
  type VARCHAR(80),
  name VARCHAR(80),
  age INT,
  PRIMARY KEY (animalId)
)`, err => {
  if (err) throw err
})


// TWO versions of making promises. Arrow function and normal function. Good for reference.

// VERSION 1
exports.findAllOwners = () => new Promise((resolve, reject) => {

  let sql = squel.select()
                 .from(TABLE_NAME)
                //  Both fields can't have the same name
                //  So give an alias as second argument
                 .field('Animals.name', 'name')
                 .field('Animals.type', 'type')
                 .field('Animals.age', 'age')
                 .field('Clients.name', 'clientId')
                //  null here is for an alias as above
                 .join('Clients', null, 'Animals.clientId = Clients.clientId')
                //  See only one teams players with a .where
                //  .where('Animals.teamId = 1')
                 .toString()

  db.query(sql, (err, animals) => {
    if (err) return reject(err)
    resolve(animals);
  })
})
