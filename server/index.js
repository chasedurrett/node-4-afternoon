require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const mdl = require("./middleware/checkForSession");
const ctrl = require("./ctrl/swagController");
const auth = require("./ctrl/authController");
const cart = require("./ctrl/cartController");
const search = require("./ctrl/searchController");
const { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
  })
);
app.use(mdl.checkSession);
app.use(express.static(`${__dirname}/../build`));

app.get("/api/swag", ctrl.getSwag);
app.post("/api/login", auth.login);
app.post("/api/register", auth.register);
app.post("/api/signout", auth.signout);
app.get("/api/user", auth.getUser);
app.post("/api/cart/checkout", cart.checkout);
app.post("/api/cart/:id", cart.add);
app.delete("/api/cart/:id", cart.delete);
app.get("/api/search", search.search);

app.listen(SERVER_PORT, () => {
  console.log(`server activated port ${SERVER_PORT}`);
});
