import sql from 'mssql';
import config from '../config.js';
const configSql = {
  user: config.sqlServerUser,
  password: config.sqlServerPassword,
  server: config.sqlServer, // Puede ser una dirección IP o un nombre de dominio
  database: config.sqlServerDatabase,
  options: {
    encrypt: false,
    enableArithAbort: true
  }
}

const poolPromise = new sql.ConnectionPool(configSql)
  .connect()
  .then(pool => {
    console.log('Conectado a MSSQL');
    return pool;
  })
  .catch(err => console.error('Error de conexión a la base de datos:', err));

export default poolPromise
