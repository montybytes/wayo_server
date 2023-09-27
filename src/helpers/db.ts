import knex from "knex";

export default knex({
  client: "mysql2",
  connection: {
    host: "172.17.0.3",
    port: 3306,
    user: "api",
    password: "wayo254",
    database: "dev",
  },
});
