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

function generateRndId() {
  return Math.floor(Math.random() * 100000000) + 500;
}

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

app.post("/register", (req, res) => {
  const {
    customerName, contactLastName, contactFirstName,
    phone, addressLine1, addressLine2, city, state,
    postalCode, country, salesRepEmployeeNumber,
    creditLimit, email, pwd
  } = req.body;
  const hashedPwd = cryptoJs.SHA256(pwd + "paleocapa").toString();
  db.query(
    `SELECT * FROM customers WHERE email = ?;`, [email], (err, results) => {
      if (err) {
        console.log(`Error in query: ${err}`);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (results.length > 0) {
        return res.status(409).json({ error: "Email already exists" });
      }
      db.query(
        `INSERT INTO customers (
          customerNumber,
          customerName, contactLastName, contactFirstName,
          phone, addressLine1, addressLine2, city, state,
          postalCode, country, salesRepEmployeeNumber,
          creditLimit, email, pwd
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          generateRndId(),
          customerName, contactLastName, contactFirstName,
          phone, addressLine1, addressLine2, city, state,
          postalCode, country, salesRepEmployeeNumber,
          creditLimit, email, hashedPwd
        ],
        (err) => {
          if (err) {
            console.log(`Error in query: ${err}`);
            res.status(500).send("Internal Server Error");
            return;
          }
          res.status(200);
        }
      );
    }
  );
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

app.post("/buy", (req, res) => {
  const userId = req.body.customerNumber;
  const prodCodes = req.body.productCodes;

  function jsDateToSqlDate(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  function sendErr() {
    res.status(500).send("Internal Server Error");
  }

  if (!Array.isArray(prodCodes) || !userId) {
    sendErr();
    return;
  }

  const queryProdCodes = "(" + prodCodes.map((c) => `'${c}'`).join(", ") + ")";

  function handleError(err) {
    if (err) {
      sendErr();
      return;
    }
    res.status(200).send("OK");
  }

  function handleCheckAvailability(err, results) {
    if (err) {
      sendErr();
      return;
    }
    if (results.length < prodCodes.length) {
      res.status(400).send("No products left");
      return;
    }

    db.query(
      `UPDATE products set quantityInStock = quantityInStock - 1 WHERE productCode IN ${queryProdCodes} AND quantityInStock > 0;`,
      handleError
    );

    const orderNumber = generateRndId();
    const orderDate = new Date();
    const requiredDate = new Date(orderDate);
    requiredDate.setDate(requiredDate.getDate() + 7);
    db.query(
      `INSERT INTO orders (orderNumber, orderDate, requiredDate, shippedDate, status, customerNumber) VALUES (?, ?, ?, ?, ?, ?);`,
      [orderNumber, jsDateToSqlDate(orderDate), jsDateToSqlDate(requiredDate), jsDateToSqlDate(requiredDate), "Shipped", userId],
      (err) => err && console.log(`Error in query: ${err}`)
    );

    for (const [i, { productCode, MSRP }] of results.entries()) {
      db.query(
        `INSERT INTO orderdetails (orderNumber, productCode, quantityOrdered, priceEach, orderLineNumber) VALUES (?, ?, ?, ?, ?);`,
        [orderNumber, productCode, 1, MSRP, i + 1],
        (err) => err && console.log(`Error in query: ${err}`)
      );
    }
  }

  db.query(
    `SELECT * FROM products WHERE productCode IN ${queryProdCodes} AND quantityInStock > 0;`,
    handleCheckAvailability
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
