import type { Auction } from "../models/types";
import { elements } from "./dom";

export function showAuction(auction: Auction) {
    if (!elements.auctionInfo) return;

    const isEndend = new Date(auction.endTime) < new Date();
    const bidderLabel = isEndend ? "Vinnare" : "Ledande budgivare";
    const statusLabel = isEndend ? "Avslutad" : "Pågår";

    elements.auctionInfo.innerHTML = `
        <h2>${auction.title}</h2>
        <img src="${auction.imageUrl}" alt="${auction.title}" width="250" />
        <p>${auction.description}</p>
        <p>Säljare: ${auction.createdBy}</p>
        <p>Nuvarande bud: ${auction.currentPrice} :- </p>
        <p>${bidderLabel}: ${auction.leadingBidder || "Ingen ännu"}</p>
        <p>Slutar: ${new Date(auction.endTime).toLocaleString()}</p>
        <p>Status: ${statusLabel}</p>
    `;  
}