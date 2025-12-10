
INSERT INTO USUARIO_PROFESSOR (IdUsuario, Email, Senha, TipoUsuario, IdProfessor, Nome) VALUES
(1, 'joao@pucminas.br', '123456', 'Professor', 1, 'João Silva'),
(2, 'maria@pucminas.br', '123456', 'Professor', 2, 'Maria Santos'),
(3, 'carlos@pucminas.br', '123456', 'Coordenador', 3, 'Carlos Oliveira'),
(4, 'ana@pucminas.br', '123456', 'Professor', 4, 'Ana Pereira'),
(5, 'pedro@pucminas.br', '123456', 'Professor', 5, 'Pedro Costa');


INSERT INTO DISCIPLINA (IdDisciplina, NomeDisciplina, Codigo) VALUES
(1, 'Banco de Dados', 'BD001'),
(2, 'Programação Web', 'PW001'),
(3, 'Estrutura de Dados', 'ED001'),
(4, 'Engenharia de Software', 'ES001'),
(5, 'Redes de Computadores', 'RC001'),
(6, 'Sistemas Operacionais', 'SO001'),
(7, 'Inteligência Artificial', 'IA001'),
(8, 'Cálculo I', 'CA001'),
(9, 'Algoritmos', 'AL001'),
(10, 'Arquitetura de Computadores', 'AC001');

INSERT INTO CURSO (IdCurso, NomeCurso) VALUES
(1, 'Ciência da Computação'),
(2, 'Sistemas de Informação'),
(3, 'Engenharia de Software');

INSERT INTO PERIODO (IdPeriodo, NumeroPeriodo, FK_CURSO_IdCurso) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 1, 2),
(7, 2, 2),
(8, 3, 2),
(9, 1, 3),
(10, 2, 3);

INSERT INTO HORARIO (IdHorario, DiaSemana, Turno, HoraInicio, HoraFim) VALUES
(1, 'Segunda-feira', 'Manhã', '07:30:00', '09:10:00'),
(2, 'Segunda-feira', 'Manhã', '09:30:00', '11:10:00'),
(3, 'Segunda-feira', 'Tarde', '14:00:00', '15:40:00'),
(4, 'Segunda-feira', 'Noite', '19:00:00', '20:40:00'),
(5, 'Segunda-feira', 'Noite', '21:00:00', '22:40:00'),
(6, 'Terça-feira', 'Manhã', '07:30:00', '09:10:00'),
(7, 'Terça-feira', 'Manhã', '09:30:00', '11:10:00'),
(8, 'Terça-feira', 'Noite', '19:00:00', '20:40:00'),
(9, 'Terça-feira', 'Noite', '21:00:00', '22:40:00'),
(10, 'Quarta-feira', 'Manhã', '07:30:00', '09:10:00'),
(11, 'Quarta-feira', 'Noite', '19:00:00', '20:40:00'),
(12, 'Quarta-feira', 'Noite', '21:00:00', '22:40:00'),
(13, 'Quinta-feira', 'Manhã', '07:30:00', '09:10:00'),
(14, 'Quinta-feira', 'Noite', '19:00:00', '20:40:00'),
(15, 'Quinta-feira', 'Noite', '21:00:00', '22:40:00'),
(16, 'Sexta-feira', 'Manhã', '07:30:00', '09:10:00'),
(17, 'Sexta-feira', 'Noite', '19:00:00', '20:40:00'),
(18, 'Sexta-feira', 'Noite', '21:00:00', '22:40:00');

INSERT INTO SEMESTRE_LETIVO (IdSemestre, Ano, Semestre) VALUES
(1, 2024, 1),
(2, 2024, 2),
(3, 2025, 1),
(4, 2025, 2);

INSERT INTO PREDIO (IdPredio, NomePredio) VALUES
(1, 'Prédio 1'),
(2, 'Prédio 2'),
(3, 'Prédio 3 - Laboratórios');

INSERT INTO SALA (IdSala, NumeroSala, Capacidade, FK_PREDIO_IdPredio) VALUES
(1, '101', 40, 1),
(2, '102', 40, 1),
(3, '103', 35, 1),
(4, '201', 50, 2),
(5, '202', 50, 2),
(6, '203', 45, 2),
(7, 'Lab 01', 30, 3),
(8, 'Lab 02', 30, 3),
(9, 'Lab 03', 25, 3);

INSERT INTO PODE_MINISTRAR (FK_USUARIO_PROFESSOR_IdUsuario, FK_USUARIO_PROFESSOR_IdProfessor, FK_DISCIPLINA_IdDisciplina) VALUES
(1, 1, 1),
(1, 1, 2),
(2, 2, 3),
(2, 2, 4),
(2, 2, 9),
(3, 3, 5),
(3, 3, 6),
(4, 4, 7),
(4, 4, 1),
(5, 5, 8),
(5, 5, 10);


INSERT INTO OFERECE_EM (FK_PERIODO_IdPeriodo, FK_DISCIPLINA_IdDisciplina) VALUES
(1, 8),
(1, 9), 
(2, 3),  
(3, 10),  
(4, 1),   
(5, 4),   
(6, 9),   
(7, 3),
(8, 2),   
(9, 9),   
(10, 4);

INSERT INTO ALOCACAO (IdAlocacao, FK_USUARIO_PROFESSOR_IdUsuario, FK_USUARIO_PROFESSOR_IdProfessor, FK_DISCIPLINA_IdDisciplina, FK_SEMESTRE_LETIVO_IdSemestre, FK_HORARIO_IdHorario, FK_SALA_IdSala) VALUES
(1, 1, 1, 1, 3, 4, 1),
(2, 1, 1, 2, 3, 8, 7),   
(3, 2, 2, 3, 3, 11, 2), 
(4, 2, 2, 4, 3, 14, 4),
(5, 3, 3, 5, 3, 5, 3), 
(6, 3, 3, 6, 3, 9, 5), 
(7, 4, 4, 7, 3, 12, 8), 
(8, 5, 5, 8, 3, 1, 4),
(9, 2, 2, 9, 3, 6, 2), 
(10, 5, 5, 10, 3, 13, 6);
