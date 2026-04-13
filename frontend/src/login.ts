import "./style.css";

document.querySelector("#loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement).value;

    const response = await fetch("http://localhost:3000login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });
});