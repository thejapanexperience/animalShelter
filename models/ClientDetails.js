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
exports.findDetails = (id) => new Promise((resolve, reject) => {
  console.log('in Client Details model id: ', id)

  let sql = squel.select()
                 .from(TABLE_NAME)
                //  Both fields can't have the same name
                //  So give an alias as second argument
                 .field('Clients.name', 'clientName')
                 .field('Animals.type', 'type')
                 .field('Animals.age', 'age')
                 .field('Animals.name', 'name')
                 .field('Animals.animalId', 'animalId')
                //  null here is for an alias as above
                 .join('Clients', null, 'Animals.clientId = Clients.clientId')
                //  See only one teams players with a .where
                 .where(`Animals.clientId = ${id}`)
                 .toString()

  db.query(sql, (err, animals) => {
    if (err) return reject(err)
    resolve(animals);
  })
})
