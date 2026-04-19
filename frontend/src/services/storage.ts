export function getCurrentUser(): string | null {
    return sessionStorage.getItem("me");
}

export function redirectToLogin() {
    location.href = "/login.html";
}