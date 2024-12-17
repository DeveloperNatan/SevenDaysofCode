const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");

exports.BirthdaySave = async (req, res) => {
  console.log(req.body);
  const { nome, data } = req.body;

  try {
    const aniversario = await prisma.aniversariante.create({
      data: {
        nome,
        data,
      },
    });
    res.status(201).redirect("/home");
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar user" });
    console.log(error);
  }
};

exports.BirthdayList = async (req, res) => {
  try {
    const aniversariantes = await prisma.aniversariante.findMany();
    res.json(aniversariantes);
  } catch (error) {}
};

exports.SendHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/insert.html"));
};

exports.BirthdayDelete = async (req, res) => {
  const { id } = req.body;

  try {
    const deleteBirthday = await prisma.aniversariante.delete({
      where: { id: parseInt(id) },
    });
    res.status(201).redirect("/home");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

exports.BirthdayUpdate = async (req, res) => {
  const { id, nome, data } = req.body;

  try {
    const UpdateBirthday = await prisma.aniversariante.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        data,
      },
    });
    res.status(201).redirect("/home");
  } catch (error) {
    console.error(error);
  }
};
