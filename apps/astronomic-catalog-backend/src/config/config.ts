
export default () => ({
  mysql: {
    type: "mysql",
    host: process.env.GLOBAL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_NEST_USER,
    password: process.env.MYSQL_NEST_PASS,
    database: process.env.MYSQL_DATABASE,
  },
  mongoUrl: process.env.MONGODB_URL,
});
