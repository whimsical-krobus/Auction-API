import "./style.css";
import type { User } from "./models/User";

document.querySelector("#loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement).value;
    const message = document.querySelector("#message") as HTMLParagraphElement;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
        const user = (await response.json()) as User;
        sessionStorage.setItem("me", user.username);
        location.href = "/";
    } else {
        response.status === 400;
        message.textContent = "Fel e-post eller lösenord.";
    }
});