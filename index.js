const express = require("express");

const app = express();

app.use(express.json());

const students = [
  { id: 1, nome: "Chaves", age: 8, enroll: true },
  { id: 2, nome: "Quico", age: 9, enroll: true },
  { id: 3, nome: "Chiquinha", age: 8, enroll: true },
  { id: 4, nome: "Nhonho", age: 8, enroll: true },
  { id: 5, nome: "Pópis", age: 9, enroll: true },
  { id: 6, nome: "Paty", age: 8, enroll: true },
  { id: 7, nome: "Jaime", age: 9, enroll: true },
  { id: 8, nome: "Maluco", age: 8, enroll: true },
  { id: 9, nome: "Maria Antonieta", age: 9, enroll: true },
  { id: 1, nome: "Godinez", age: 8, enroll: true },
];

app.get("/", (req, res) => {
  res.send("NodeJs API Funcionando");
});

app.get("/api/students", (req, res) => {
  res.send(students);
});

app.get("/api/students/:id", (req, res) => {
  const student = students.find((c) => c.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Aluno não encontrado");
  else res.send(student);
});

app.post("./api/students", (req, res) => {
  const student = {
    id: students.length + 1,
    name: req.body.name,
    agr: parseInt(req.body.age),
    enroll: req.body.enroll === "true",
  };
  students.push(student);
  res.send(student);
});

app.put("/api/students/:id", (req, res) => {
  const student = students.find((c) => c.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Aluno não encontrado");

  student.name = req.body.name || student.name;
  student.age =
    req.body.age !== undefined ? parseInt(req.body.age) : student.age;
  student.enroll =
    req.body.enroll !== undefined ? req.body.enroll === "true" : student.enroll;
  res.send(student);
});

app.delete("/apistudents/:id", (req, res) => {
  const student = students.find((c) => c.id === parseInt(req.params.id));
  if (!student) return res.status(404).send("Aluno não encontrado");

  const index = students.indexOf(student);

  students.splice(index, 1);
  res.send(student);

});

const port = process.env.port || 8080;

app.listen(port, () => console.log(`executando porta ${port}`))
