const express = require("express");
const server = express();
const router = express.Router();
const fs = require("fs");

server.use(express.json({ extended: true }));

// ------------------------ functions --------------------------------------------------------

const PATH_DB = "./db/dadosaqui.json";
const enconder = "utf-8";

const readFile = () => {
  const content = fs.readFileSync(PATH_DB, enconder);
  return JSON.parse(content);
};

const writeFile = (content) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync(PATH_DB, updateFile, enconder);
};

// ----------------------- routes ------------------------------------------------------------

router.get("/", (req, res) => {
  const content = readFile();
  res.send(content);
});

// -------------------------------------------------------------------------------------------

router.post("/", (req, res) => {
  const id = Math.random().toString(32).substring(2, 9);
  const { email, phone, company, instagram, userName, userNickname } = req.body;

  const currentContent = readFile();

  currentContent.push({
    id,
    email,
    phone,
    company,
    instagram,
    userName,
    userNickname,
  });

  writeFile(currentContent);

  res.send({
    id,
    email,
    phone,
    company,
    instagram,
    userName,
    userNickname,
  });
});

// -------------------------------------------------------------------------------------------

// ----------------------- server ------------------------------------------------------------

server.use(router);

server.listen(3000, () => {
  console.log("servidor rodando");
});
