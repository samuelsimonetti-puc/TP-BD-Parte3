const listEl = document.querySelector("#lista-disciplinas");
const form = document.querySelector("#aptidoes-form");

async function carregar() {
  const [discsResp, minhasResp] = await Promise.all([
    fetch("/disciplinas", { credentials: "include" }),
    fetch("/me/aptidoes", { credentials: "include" }),
  ]);

  if (discsResp.status === 401 || minhasResp.status === 401) {
    window.location.href = "/login.html";
    return;
  }

  const disciplinas = await discsResp.json();
  const minhas = await minhasResp.json();
  const selecionadas = new Set(minhas);

  listEl.innerHTML = "";
  for (const d of disciplinas) {
    const idDisc = d.iddisciplina ?? d.IdDisciplina;
    const nome = d.nomedisciplina ?? d.NomeDisciplina ?? d.nome;
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox" name="disciplinas" value="${idDisc}" ${
      selecionadas.has(idDisc) ? "checked" : ""
    }>
        ${nome}
      </label>
    `;
    listEl.appendChild(li);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const valores = Array.from(
    form.querySelectorAll('input[name="disciplinas"]:checked')
  ).map((el) => Number(el.value));

  const resp = await fetch("/me/aptidoes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ disciplinas: valores }),
  });

  if (!resp.ok) {
    alert("Erro ao salvar.");
    return;
  }
  alert("Aptidoes salvas.");
});

carregar().catch(() => {
  window.location.href = "/login.html";
});
