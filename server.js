

const knex = require('knex')({
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : 'postgres',
      password : '39814Lsl',
      database : 'postgres',
      charset  : 'utf8'
    }
  })
  
  const bookshelf = require('bookshelf')(knex)
  module.exports = bookshelf

  const User = bookshelf.model('User', {
    tableName: 'User',}
    )
  const TodoTask = bookshelf.model('TodoTask', {
      tableName: 'TodoTask',
  })
    //module.exports = bookshelf.model('User', User)

knex('User').where('ID','=',100).update({
    ID : 200
})

knex.select().from('TodoTask').then(function(foo) {
    console.log(foo)
})