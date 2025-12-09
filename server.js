const express = require("express");
const session = require("express-session");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "segredo-super-simples",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static("public"));

// Middleware para proteger rotas
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Nao autenticado" });
  }
  next();
}

// Login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const result = await db.query(
    `SELECT IdUsuario, IdProfessor, Nome, TipoUsuario
     FROM USUARIO_PROFESSOR
     WHERE Email = $1 AND Senha = $2`,
    [email, senha]
  );

  if (result.rowCount === 0) {
    return res.status(401).json({ error: "Credenciais invalidas" });
  }

  req.session.user = result.rows[0];
  res.json({ user: result.rows[0] });
});

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

// Listar todas as disciplinas
app.get("/disciplinas", requireAuth, async (req, res) => {
  const result = await db.query(
    "SELECT IdDisciplina, NomeDisciplina, Codigo FROM DISCIPLINA ORDER BY NomeDisciplina"
  );
  res.json(result.rows);
});

// Listar disciplinas que o professor logado pode ministrar
app.get("/me/aptidoes", requireAuth, async (req, res) => {
  const { idprofessor } = req.session.user;

  const result = await db.query(
    `SELECT FK_DISCIPLINA_IdDisciplina AS "idDisciplina"
     FROM PODE_MINISTRAR
     WHERE FK_USUARIO_PROFESSOR_IdProfessor = $1`,
    [idprofessor]
  );
  res.json(result.rows.map((r) => r.idDisciplina));
});

// Atualizar aptidoes do professor logado
app.post("/me/aptidoes", requireAuth, async (req, res) => {
  const { idprofessor, idusuario } = req.session.user;
  const { disciplinas } = req.body; // array de ids

  await db.query(
    `DELETE FROM PODE_MINISTRAR
     WHERE FK_USUARIO_PROFESSOR_IdProfessor = $1
       AND FK_USUARIO_PROFESSOR_IdUsuario = $2`,
    [idprofessor, idusuario]
  );

  for (const idDisciplina of disciplinas) {
    await db.query(
      `INSERT INTO PODE_MINISTRAR
        (FK_USUARIO_PROFESSOR_IdUsuario,
         FK_USUARIO_PROFESSOR_IdProfessor,
         FK_DISCIPLINA_IdDisciplina)
       VALUES ($1, $2, $3)`,
      [idusuario, idprofessor, idDisciplina]
    );
  }

  res.json({ ok: true });
});

app.get("/alocacoes", requireAuth, async (req, res) => {
  const result = await db.query(`
    SELECT
      up.Nome AS professor,
      d.NomeDisciplina AS nomedisciplina,
      h.DiaSemana AS diasemana,
      h.HoraInicio AS horainicio,
      h.HoraFim AS horafim,
      s.NumeroSala AS numerosala,
      p.NomePredio AS nomepredio
    FROM ALOCACAO_POSSUI_USUARIO_PROFESSOR_DISCIPLINA_SEMESTRE_LETIVO_HORARIO_SALA a
    JOIN USUARIO_PROFESSOR up
      ON up.IdUsuario = a.FK_USUARIO_PROFESSOR_IdUsuario
     AND up.IdProfessor = a.FK_USUARIO_PROFESSOR_IdProfessor
    JOIN DISCIPLINA d
      ON d.IdDisciplina = a.FK_DISCIPLINA_IdDisciplina
    JOIN HORARIO h
      ON h.IdHorario = a.FK_HORARIO_IdHorario
    JOIN SALA s
      ON s.IdSala = a.FK_SALA_IdSala
    JOIN PREDIO p
      ON p.IdPredio = s.FK_PREDIO_IdPredio
    ORDER BY h.DiaSemana, h.HoraInicio
  `);
  res.json(result.rows);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
