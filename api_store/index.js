import express from "express";
import cors from "cors";
import mysql from "mysql";
import swaggerUi from "swagger-ui-express";
import jwt from "jsonwebtoken";
import YAML from "yamljs";
import bodyParser from "body-parser";
import cryptoJs from "crypto-js";

const PORT = 3000;

const swaggerDocument = YAML.load("swagger.yaml");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "store"
});

db.connect((err) => {
  if (err) {
    console.log(`Error connecting to database: ${err}`)
    process.exit(1);
  } else {
    console.log("Connected to database");
  }
});

app.use(cors());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM customers WHERE email = ?;", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = results[0];
    const hashedPwd = cryptoJs.SHA256(password + "paleocapa").toString();
    if (hashedPwd !== user.pwd) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.employeeNumber, name: user.lastName }, "paleocapa");
    res.json({ user, token })
  });
});

app.get("/products", (_req, res) => {
  const QUERY = "SELECT * FROM products;";
  db.query(QUERY, (err, results) => {
    if (err) {
      console.log(`Error in query: ${err}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

app.get("/products/:category", (req, res) => {
  const category = req.params.category;
  const QUERY = `SELECT * FROM products WHERE productLine = '${category}';`
  db.query(QUERY, (err, results) => {
    if (err) {
      console.log(`Error in query: ${err}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

app.get("/users", (_req, res) => {
  const QUERY = "SELECT * FROM customers;";
  db.query(QUERY, (err, results) => {
    if (err) {
      console.log(`Error in query: ${err}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

app.get("/employees", (_req, res) => {
  const QUERY = "SELECT * FROM employees;";
  db.query(QUERY, (err, results) => {
    if (err) {
      console.log(`Error in query: ${err}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

app.get("/employees/:email/:password", (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const QUERY = `SELECT * FROM employees WHERE email = "${email}" AND pwd = "${password}";`;
  db.query(QUERY, (err, results) => {
    if (err) {
      console.log(`Error in query: ${err}`);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
