// Mock database for testing without PostgreSQL

const mockData = {
  usuarios: [
    {
      idusuario: 1,
      idprofessor: 1,
      nome: "João Silva",
      email: "joao@pucminas.br",
      senha: "123456",
      tipousuario: "Professor",
    },
    {
      idusuario: 2,
      idprofessor: 2,
      nome: "Maria Santos",
      email: "maria@pucminas.br",
      senha: "123456",
      tipousuario: "Professor",
    },
    {
      idusuario: 3,
      idprofessor: 3,
      nome: "Carlos Oliveira",
      email: "carlos@pucminas.br",
      senha: "123456",
      tipousuario: "Coordenador",
    },
  ],
  disciplinas: [
    { iddisciplina: 1, nomedisciplina: "Banco de Dados", codigo: "BD001" },
    { iddisciplina: 2, nomedisciplina: "Programação Web", codigo: "PW001" },
    { iddisciplina: 3, nomedisciplina: "Estrutura de Dados", codigo: "ED001" },
    {
      iddisciplina: 4,
      nomedisciplina: "Engenharia de Software",
      codigo: "ES001",
    },
    {
      iddisciplina: 5,
      nomedisciplina: "Redes de Computadores",
      codigo: "RC001",
    },
    {
      iddisciplina: 6,
      nomedisciplina: "Sistemas Operacionais",
      codigo: "SO001",
    },
  ],
  podeMinistrar: [
    {
      fk_usuario_professor_idusuario: 1,
      fk_usuario_professor_idprofessor: 1,
      fk_disciplina_iddisciplina: 1,
    },
    {
      fk_usuario_professor_idusuario: 1,
      fk_usuario_professor_idprofessor: 1,
      fk_disciplina_iddisciplina: 2,
    },
    {
      fk_usuario_professor_idusuario: 2,
      fk_usuario_professor_idprofessor: 2,
      fk_disciplina_iddisciplina: 3,
    },
    {
      fk_usuario_professor_idusuario: 2,
      fk_usuario_professor_idprofessor: 2,
      fk_disciplina_iddisciplina: 4,
    },
  ],
  horarios: [
    {
      idhorario: 1,
      diasemana: "Segunda-feira",
      turno: "Noite",
      horainicio: "19:00",
      horafim: "20:40",
    },
    {
      idhorario: 2,
      diasemana: "Segunda-feira",
      turno: "Noite",
      horainicio: "21:00",
      horafim: "22:40",
    },
    {
      idhorario: 3,
      diasemana: "Terça-feira",
      turno: "Noite",
      horainicio: "19:00",
      horafim: "20:40",
    },
    {
      idhorario: 4,
      diasemana: "Quarta-feira",
      turno: "Noite",
      horainicio: "19:00",
      horafim: "20:40",
    },
  ],
  predios: [
    { idpredio: 1, nomepredio: "Prédio 1" },
    { idpredio: 2, nomepredio: "Prédio 2" },
  ],
  salas: [
    { idsala: 1, numerosala: "101", capacidade: 40, fk_predio_idpredio: 1 },
    { idsala: 2, numerosala: "102", capacidade: 40, fk_predio_idpredio: 1 },
    { idsala: 3, numerosala: "201", capacidade: 50, fk_predio_idpredio: 2 },
  ],
  alocacoes: [
    {
      idalocacao: 1,
      fk_usuario_professor_idusuario: 1,
      fk_usuario_professor_idprofessor: 1,
      fk_disciplina_iddisciplina: 1,
      fk_horario_idhorario: 1,
      fk_sala_idsala: 1,
    },
    {
      idalocacao: 2,
      fk_usuario_professor_idusuario: 1,
      fk_usuario_professor_idprofessor: 1,
      fk_disciplina_iddisciplina: 2,
      fk_horario_idhorario: 2,
      fk_sala_idsala: 2,
    },
    {
      idalocacao: 3,
      fk_usuario_professor_idusuario: 2,
      fk_usuario_professor_idprofessor: 2,
      fk_disciplina_iddisciplina: 3,
      fk_horario_idhorario: 3,
      fk_sala_idsala: 1,
    },
    {
      idalocacao: 4,
      fk_usuario_professor_idusuario: 2,
      fk_usuario_professor_idprofessor: 2,
      fk_disciplina_iddisciplina: 4,
      fk_horario_idhorario: 4,
      fk_sala_idsala: 3,
    },
  ],
};

// Mock query function
async function query(text, params = []) {
  const sql = text.toLowerCase().trim();

  // LOGIN - SELECT from USUARIO_PROFESSOR with email and senha
  if (sql.includes("from usuario_professor") && sql.includes("where email")) {
    const email = params[0];
    const senha = params[1];
    const user = mockData.usuarios.find(
      (u) => u.email === email && u.senha === senha
    );
    return {
      rows: user ? [user] : [],
      rowCount: user ? 1 : 0,
    };
  }

  // GET DISCIPLINAS
  if (sql.includes("from disciplina") && sql.includes("order by")) {
    return {
      rows: mockData.disciplinas,
      rowCount: mockData.disciplinas.length,
    };
  }

  // GET PODE_MINISTRAR for a professor
  if (sql.includes("from pode_ministrar") && sql.includes("where")) {
    const idProfessor = params[0];
    const aptidoes = mockData.podeMinistrar
      .filter((p) => p.fk_usuario_professor_idprofessor === idProfessor)
      .map((p) => ({ idDisciplina: p.fk_disciplina_iddisciplina }));
    return {
      rows: aptidoes,
      rowCount: aptidoes.length,
    };
  }

  // DELETE PODE_MINISTRAR
  if (sql.includes("delete from pode_ministrar")) {
    const idProfessor = params[0];
    const idUsuario = params[1];
    mockData.podeMinistrar = mockData.podeMinistrar.filter(
      (p) =>
        !(
          p.fk_usuario_professor_idprofessor === idProfessor &&
          p.fk_usuario_professor_idusuario === idUsuario
        )
    );
    return { rowCount: 1 };
  }

  // INSERT PODE_MINISTRAR
  if (sql.includes("insert into pode_ministrar")) {
    mockData.podeMinistrar.push({
      fk_usuario_professor_idusuario: params[0],
      fk_usuario_professor_idprofessor: params[1],
      fk_disciplina_iddisciplina: params[2],
    });
    return { rowCount: 1 };
  }

  // GET ALOCACOES with JOINs
  if (sql.includes("from alocacao_possui")) {
    const rows = mockData.alocacoes.map((a) => {
      const prof = mockData.usuarios.find(
        (u) => u.idprofessor === a.fk_usuario_professor_idprofessor
      );
      const disc = mockData.disciplinas.find(
        (d) => d.iddisciplina === a.fk_disciplina_iddisciplina
      );
      const hor = mockData.horarios.find(
        (h) => h.idhorario === a.fk_horario_idhorario
      );
      const sala = mockData.salas.find((s) => s.idsala === a.fk_sala_idsala);
      const predio = mockData.predios.find(
        (p) => p.idpredio === sala.fk_predio_idpredio
      );
      return {
        professor: prof?.nome || "N/A",
        nomedisciplina: disc?.nomedisciplina || "N/A",
        diasemana: hor?.diasemana || "N/A",
        horainicio: hor?.horainicio || "N/A",
        horafim: hor?.horafim || "N/A",
        numerosala: sala?.numerosala || "N/A",
        nomepredio: predio?.nomepredio || "N/A",
      };
    });
    return { rows, rowCount: rows.length };
  }

  // Default empty response
  return { rows: [], rowCount: 0 };
}

module.exports = { query };
