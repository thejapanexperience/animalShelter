
require('dotenv').config()

const db = require('./config/db')
const squel = require('squel')

// drop the tables (delete)
db.query('drop table Animals')
db.query('drop table Clients', err => {
  if (err) throw err

  // recreate the tables with the new schema
  require('./models/Animal')
  require('./models/Client')

  // insert some sample database
  let animalSql = squel.insert().into('Animals').setFieldsRows([
    {
      name: 'Barney',
      age: '11',
      type: 'Dog',
      clientId: '1'
    },
  ]).toString();

  db.query(animalSql, err => {
    if (err) throw err
  })

  let clientSql = squel.insert().into('Clients').setFieldsRows([
    {
      name: 'Margaret Mands',
      clientId: '1'
    },
  ]).toString();

  db.query(clientSql, err => {
    if (err) throw err
  })

  db.end(() => console.log('Done!'))
})
