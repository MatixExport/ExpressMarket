
const config = {
    'PG_HOST':"localhost",
    'PG_USER':"admin",
    'PG_PASSWORD':"admin",
    'PG_PORT':"5432",
    'PG_DB':"market",
    "development": {
        "dialect": "sqlite",
        "storage": "data.sqlite3"
      },
    "SECRET":"gebirtimordechaj",
    "GROQ_AUTH":""
}

if(process.env.PG_HOST){
    config['PG_HOST'] = process.env.PG_HOST
  }

module.exports = config


