import type { Auction } from "../models/types";
import { elements } from "./dom";
import { setSelectedAuction } from "../handlers/formHandlers";

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

export function renderAuctionList(auctions: Auction[]) {
    if (!elements.auctionList) return;

    elements.auctionList.innerHTML = "";

    auctions.forEach((auction) => {
        const button = document.createElement("button");
        button.textContent = auction.title;

        button.addEventListener("click", () => {
            setSelectedAuction(auction.id);
        });
        
        elements.auctionList!.appendChild(button);
    });
}