const form = document.querySelector("#login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value;
  const senha = form.senha.value;

  const resp = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, senha }),
  });

  if (!resp.ok) {
    alert("Login invalido");
    return;
  }

  window.location.href = "/alocacoes.html";
});
