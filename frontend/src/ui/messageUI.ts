import { elements } from "./dom";

export function showMessage(message: string, type: "success"| "error") {
    if (elements.auctionMessage) {
        elements.auctionMessage.textContent = message;
        elements.auctionMessage.className = type;
    }
}

export function showBidError(message: string) {
    if (elements.bidError) {
        elements.bidError.textContent = message;
    }
}