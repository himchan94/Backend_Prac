const express = require("express");
const app = express();
const port = 3000;

const goodsRouter = require("./routes/goods");
const usersRouter = require("./routes/users");

const mongoose = require("mongoose");
// **************미들웨어

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// **************미들웨어

// ************** EJS

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// ************** EJS

app.get("/mongodb", async (req, res) => {
  await mongoose.connect("mongodb://localhost/voyage", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  res.send("ok");
});

// useFindAndModify: true,
// useCreateIndex: true,

// longer supported options.Mongoose 6 always behaves as if useNewUrlParser,
// useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false.
// Please remove these options from your code.

app.get("/test", (req, res) => {
  let name = req.query.name;
  res.render("test", { name });
});

app.get("/", (req, res) => {
  res.send(
    '<!DOCTYPE html>\
  <html lang="en">\
  <head>\
      <meta charset="UTF-8">\
      <meta http-equiv="X-UA-Compatible" content="IE=edge">\
      <meta name="viewport" content="width=device-width, initial-scale=1.0">\
      <title>Document</title>\
  </head>\
  <body>\
      Hi. I am with html<br>\
      <a href="/hi">Say Hi!</a>\
  </body>\
  </html>'
  );
});

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/detail", (req, res) => {
  res.render("detail");
});

app.use("/goods", goodsRouter);

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
