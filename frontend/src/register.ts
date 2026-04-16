document
  .querySelector("#registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = (document.querySelector("#username") as HTMLInputElement)
      .value;
    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement)
      .value;
    const message = document.querySelector("#message") as HTMLParagraphElement;

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.status === 200) {
      location.href = "/login.html";
    } else {
      response.status === 400 && message;
      message.textContent =
        "Användarnamnet eller e-postadressen är redan registrerad.";
    }
  });
