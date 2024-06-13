// const DBPool = {
//   dbConfig: {
//     host: `milkize-db.cfcckusoq29y.ap-southeast-2.rds.amazonaws.com`,
//     user:`root`,
//     password: `12345678`,
//     database: `dollars_db`
//   }
// }

// export default DBPool 


const DBPool = {
  dbConfig: {
    host: `${process.env.MYSQL_PORT}`,
    user:`${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: `${process.env.MYSQL_DATABASE}`
  }
}
export default DBPool 
