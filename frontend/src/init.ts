import { elements } from "./ui/dom";
import { getCurrentUser, redirectToLogin } from "./services/storage";
import { loadAuctions, setDefaultEndTime } from "./handlers/formHandlers";

export async function initializeApp() {
    const me = getCurrentUser();

    if (!me) {
        redirectToLogin();
        return;
    }

    if (elements.currentUser) {
        elements.currentUser.textContent = `Inloggad som: ${me}`;
    }

    setDefaultEndTime();
    await loadAuctions();
}