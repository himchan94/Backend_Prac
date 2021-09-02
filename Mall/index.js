const express = require("express");
const app = express();
const port = 3000;

const usersRouter = require("./routes/users");
const goodsRouter = require("./routers/goods");
// **************미들웨어

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// **************미들웨어

// ************** EJS

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// ************** EJS

const connect = require("./schemas");
connect();

// app.get("/mongodb", async (req, res) => {
//   const connect = require("./schemas");
//   connect();

//   let Goods = require("./schemas/goods");

//   await Goods.create({
//     goodsId: 1,
//     name: "맛있는 저녁이당",
//     thumbnailUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKRQ3NDs5bjulPr3JaXJzP7DH3Y-71WX9wzQ7N8XD9KLUHjT6L&usqp=CAc",
//     category: "food",
//     price: 15000,
//   });

//   res.send("ok");
// });

// useFindAndModify: true,
// useCreateIndex: true,

// longer supported options.Mongoose 6 always behaves as if useNewUrlParser,
// useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false.

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

// app.use("/goods", goodsRouter);

app.use("/users", usersRouter);

app.use("/api", [goodsRouter]);

app.get("/cart", (req, res) => {
  res.render("cart");
});

app.get("/order", (req, res) => {
  res.render("order");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
