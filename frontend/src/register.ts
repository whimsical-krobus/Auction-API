import "./style.css";

document
  .querySelector("#registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = (document.querySelector("#username") as HTMLInputElement)
      .value;
    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement)
      .value;

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.status === 200) {
      location.href = "/login.html";
    }
  });
