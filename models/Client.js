const db = require('../config/db')
const squel = require('squel')

const TABLE_NAME = 'Clients'

db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  clientId INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(80),
  PRIMARY KEY (clientId)
)`, err => {
  if (err) throw err
})


// TWO versions of making promises. Arrow function and normal function. Good for reference.

// VERSION 1
exports.findAll = () => new Promise((resolve, reject) => {

  // let sql = squel.select()
  //                .from(TABLE_NAME)
  //               //  Both fields can't have the same name
  //               //  So give an alias as second argument
  //                .field('Animals.playerId', 'id')
  //                .field('Animals.ownerId', 'ownerId')
  //                .field('Animals.name', 'name')
  //                .field('Animals.age', 'age')
  //               //  null here is for an alias as above
  //               //  .join('Teams', null, 'Animals.teamId = Teams.teamId')
  //               //  See only one teams players with a .where
  //               //  .where('Animals.teamId = 1')
  //                .toString()
  let sql = `SELECT * FROM ${TABLE_NAME}`

  db.query(sql, (err, clients) => {
    if (err) return reject(err)
    resolve(clients);
  })
})

// VERSION 2
exports.create = function(client) {
  console.log('in Client.js model');
  console.log('client: ', client)
  return new Promise ((resolve, reject) => {
    let sql = squel.insert().into(TABLE_NAME).setFields(client).toString();
    console.log('sql: ', sql)

    db.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

exports.update = function(id, updateObj) {
  console.log('id: ', id)
  console.log('updateObj: ', updateObj)
  return new Promise((resolve, reject) => {
  let sql = squel.update().table(TABLE_NAME).setFields(updateObj).where(`animalId = ${id}`).toString()

  db.query(sql, (err, result) => {
    if (err) return reject(err)
    resolve(result)
  })
})
}
