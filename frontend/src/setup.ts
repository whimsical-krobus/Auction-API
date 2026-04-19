import { elements } from "./ui/dom";
import { setupSocketHandlers } from "./handlers/socketHandlers";
import { handleCreateAuction, handlePlaceBid } from "./handlers/formHandlers";

export function setupEventListeners() {
    elements.createAuctionForm?.addEventListener("submit", handleCreateAuction);
    elements.bidForm?.addEventListener("submit", handlePlaceBid);
    setupSocketHandlers();
}