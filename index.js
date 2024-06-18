const express = require("express");
const server = express();
const router = express.Router();
const fs = require("fs");

server.use(express.json({ extended: true }));

// ------------------------ functions ---------------------------------

const readFile = () => {
  const content = fs.readFileSync("./db/dadosaqui.json", "utf-8");
  return JSON.parse(content);
};

// const writeFile = (content) => {
//   const updateFile = JSON.stringify(content);
//   fs.writeFileSync("./db/data.json", updateFile, "utf-8");
// };

// ----------------------- routes ----------------------------------

router.get("/", (req, res) => {
  const content = readFile();
  res.send(content);
});

// -------------------------------------------------------------------------------------------

router.post("/", (req, res) => {
  // const id = Math.random().toString(32).substring(2, 9);
  const { email, phone, company, instagram, userName, userNickname } = req.body;

  const currentContent = readFile();

  currentContent.push({
    email,
    phone,
    company,
    instagram,
    userName,
    userNickname,
  });

  fs.writeFileSync("./db/dadosaqui.json", JSON.stringify(currentContent), "utf-8");
  res.send({
    email,
    phone,
    company,
    instagram,
    userName,
    userNickname,
  });
});

// -------------------------------------------------------------------------------------------

// ----------------------- server ----------------------------------

server.use(router);

server.listen(3000, () => {
  console.log("servidor rodando");
});
