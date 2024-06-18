const express = require("express");
const { readFile, writeFile } = require("./dbUtils");

const server = express();
const router = express.Router();

server.use(express.json({ extended: true }));

// -------------------------------------------------------

router.get("/", async (req, res) => {
  try {
    const content = await readFile();
    res.send(content);
  } catch (err) {
    console.error("Erro ao ler arquivo:", err);
    res.status(500).send("Erro interno ao ler dados.");
  }
});

router.post("/", async (req, res) => {
  try {
    const id = Math.random().toString(32).substring(2, 9);
    const { email, phone, company, instagram, userName, userNickname } =
      req.body;

    if (!email || !phone || !userName) {
      return res.status(400).json({
        message: "E-mail, telefone e nome de usuário são obrigatórios",
      });
    }

    const currentContent = await readFile();

    currentContent.push({
      id,
      email,
      phone,
      company,
      instagram,
      userName,
      userNickname,
    });

    await writeFile(currentContent);

    res.status(201).json({
      id,
      email,
      phone,
      company,
      instagram,
      userName,
      userNickname,
    });
  } catch (err) {
    console.error("Erro ao salvar dados:", err);
    res.status(500).send("Erro interno ao salvar dados.");
  }
});

// -------------------------------------------------------

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
