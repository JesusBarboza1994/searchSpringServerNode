const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URI,
  sqlServerUser: process.env.SQLSERVER_USER,
  sqlServer:process.env.SQLSERVER_SERVER,
  sqlServerPassword: process.env.SQLSERVER_PASSWORD,
  sqlServerDatabase: process.env.SQLSERVER_DATABASE
}

export default config