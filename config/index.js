const dotenv = require('dotenv');
dotenv.config(/* { path: `.env.${process.env.NODE_ENV}` } */);
// console.log("env ", process.env.NODE_ENV);

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

process.env.NODE_ENV = process.env.NODE_PRODUCTION || 'development';

// the timezone for this app will be set to East Africa Time
process.env.TZ = 'Africa/Nairobi';

const port = PORT || 3232;
// console.log(port);
// const prefix = "/api/v1";
// const specs = "/docs";
// const enableLogging = true;
// const companyContactEmail = "contact@qwerty.co.ke";
const defaultConfig = {
  dialect: 'postgres',
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: '+03:00',
  // To avoid timeouts, for example when uploading large files and writing to the database in the same time
  // use the following options
  pool: {
    max: 300, // maximum number of connections in the pool, by making this number high, we avoid timeouts
    min: 0, // minimum number of connections in the pool
    acquire: 1000000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 200000, // maximum time, in milliseconds, that a connection can be idle before being released. by making this number high, we avoid timeouts
    // shared_buffers: "1GB",
  },
};

const db = {
  ...defaultConfig,
  logging: false,
};

const development = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  dialectOptions: {
    bigNumberStrings: true,
  },
};
const test = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  dialectOptions: {
    bigNumberStrings: true,
  },
};
const production = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  dialectOptions: {
    bigNumberStrings: true,
    /* ssl: {
      ca: fs.readFileSync(__dirname + '/config/')
    } */
  },
};
const jwtSecret = process.env.JWT_SECRET 
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET 

// const prefix = "/api/v1";


module.exports = {
  port,
  db,
  production,
  test,
  development,
  jwtSecret,
  jwtRefreshSecret,
  // prefix
};
