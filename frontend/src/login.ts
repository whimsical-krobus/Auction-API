import "./style.css";

document.querySelector("#loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement).value;
    const message = document.querySelector("#message") as HTMLDivElement;

    const response = await fetch("http://localhost:3000login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
        const user = (await response.json()) as { username: string; email: string; };
        sessionStorage.setItem("me", user.username);
        location.href = "/";
    } else {
        response.status === 401;
        message.textContent = "Fel e-post eller lösenord.";
    }
});