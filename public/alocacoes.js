const tableBody = document.querySelector("#alocacoes tbody");

async function carregar() {
  const resp = await fetch("/alocacoes", { credentials: "include" });
  if (resp.status === 401) {
    window.location.href = "/login.html";
    return;
  }
  const dados = await resp.json();
  tableBody.innerHTML = "";
  for (const linha of dados) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${linha.professor}</td>
      <td>${linha.nomedisciplina}</td>
      <td>${linha.diasemana}</td>
      <td>${linha.horainicio}</td>
      <td>${linha.horafim}</td>
      <td>${linha.numerosala}</td>
      <td>${linha.nomepredio}</td>
    `;
    tableBody.appendChild(tr);
  }
}

carregar().catch(() => {
  window.location.href = "/login.html";
});
