import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Aptidoes() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [selecionadas, setSelecionadas] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    carregarDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const carregarDados = async () => {
    try {
      const [discsResp, minhasResp] = await Promise.all([
        fetch("/disciplinas", { credentials: "include" }),
        fetch("/me/aptidoes", { credentials: "include" }),
      ]);

      if (discsResp.status === 401 || minhasResp.status === 401) {
        navigate("/");
        return;
      }

      const disciplinasData = await discsResp.json();
      const minhasAptidoes = await minhasResp.json();

      setDisciplinas(disciplinasData);
      setSelecionadas(new Set(minhasAptidoes));
    } catch (err) {
      setErro("Erro ao carregar dados: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (idDisciplina) => {
    setSelecionadas((prev) => {
      const novoSet = new Set(prev);
      if (novoSet.has(idDisciplina)) {
        novoSet.delete(idDisciplina);
      } else {
        novoSet.add(idDisciplina);
      }
      return novoSet;
    });
    setSucesso("");
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    setSucesso("");

    try {
      const resp = await fetch("/me/aptidoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ disciplinas: Array.from(selecionadas) }),
      });

      if (!resp.ok) {
        setErro("Erro ao salvar aptidões");
        return;
      }

      setSucesso("Aptidões salvas com sucesso!");
    } catch (err) {
      setErro("Erro ao conectar com o servidor: " + err.message);
    } finally {
      setSalvando(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/logout", {
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
        <h1>Minhas Aptidões</h1>
        <div className="header-right">
          <span>Olá, {user?.nome || "Usuário"}</span>
          <nav>
            <Link to="/alocacoes">Alocações</Link>
            <Link to="/aptidoes" className="active">
              Minhas Aptidões
            </Link>
          </nav>
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </header>

      <main className="main-content">
        <h2>Selecione as disciplinas que você pode ministrar</h2>

        {erro && <div className="error-message">{erro}</div>}
        {sucesso && <div className="success-message">{sucesso}</div>}

        <form onSubmit={handleSalvar}>
          <div className="disciplinas-list">
            {disciplinas.map((d) => {
              const id = d.iddisciplina ?? d.IdDisciplina;
              const nome = d.nomedisciplina ?? d.NomeDisciplina;
              const codigo = d.codigo ?? d.Codigo;

              return (
                <label key={id} className="disciplina-item">
                  <input
                    type="checkbox"
                    checked={selecionadas.has(id)}
                    onChange={() => handleToggle(id)}
                  />
                  <span className="disciplina-nome">
                    {nome} <span className="disciplina-codigo">({codigo})</span>
                  </span>
                </label>
              );
            })}
          </div>

          <button type="submit" disabled={salvando} className="btn-salvar">
            {salvando ? "Salvando..." : "Salvar Aptidões"}
          </button>
        </form>
      </main>
    </div>
  );
}
