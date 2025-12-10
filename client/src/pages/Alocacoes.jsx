import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Alocacoes() {
  const [alocacoes, setAlocacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    carregarAlocacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const carregarAlocacoes = async () => {
    try {
      const resp = await fetch("/api/alocacoes", {
        credentials: "include",
      });

      if (resp.status === 401) {
        navigate("/");
        return;
      }

      const dados = await resp.json();
      setAlocacoes(dados);
    } catch (err) {
      setErro("Erro ao carregar alocações: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="page-container">
      <header className="header">
        <h1>Alocações de Horários</h1>
        <div className="header-right">
          <span>Olá, {user?.nome || "Usuário"}</span>
          <nav>
            <Link to="/alocacoes" className="active">
              Alocações
            </Link>
            <Link to="/aptidoes">Minhas Aptidões</Link>
          </nav>
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </header>

      <main className="main-content">
        <h2>Grade de Horários</h2>

        {erro && <div className="error-message">{erro}</div>}

        {alocacoes.length === 0 ? (
          <p className="empty-message">Nenhuma alocação encontrada.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Professor</th>
                  <th>Disciplina</th>
                  <th>Dia da Semana</th>
                  <th>Horário Início</th>
                  <th>Horário Fim</th>
                  <th>Sala</th>
                  <th>Prédio</th>
                </tr>
              </thead>
              <tbody>
                {alocacoes.map((alocacao, index) => (
                  <tr key={index}>
                    <td>{alocacao.professor}</td>
                    <td>{alocacao.nomedisciplina}</td>
                    <td>{alocacao.diasemana}</td>
                    <td>{alocacao.horainicio}</td>
                    <td>{alocacao.horafim}</td>
                    <td>{alocacao.numerosala}</td>
                    <td>{alocacao.nomepredio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
