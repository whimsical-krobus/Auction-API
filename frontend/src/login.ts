import "./style.css";

document.querySelector("#loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const password = (document.querySelector("#password") as HTMLInputElement).value;

    
});