const config = {
  port: process.env.PORT || 3002,
  mongoURI: process.env.MONGODB_URI,
  tokenApisNet: process.env.TOKEN_APIS_NET,
  apisNetUrl: process.env.APIS_NET_URL,
  sqlServerUser: process.env.SQLSERVER_USER,
  sqlServer:process.env.SQLSERVER_SERVER,
  sqlServerPassword: process.env.SQLSERVER_PASSWORD,
  sqlServerDatabase: process.env.SQLSERVER_DATABASE,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_TOKEN,
  secretAccesTime: process.env.APP_SECRET_ACCESS_TIME,
  appScriptKey: process.env.APP_SCRIPT_KEY

}
console.log("CONFIG", config)
export default config