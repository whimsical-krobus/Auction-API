import { createAuction, fetchAuctions } from "../services/api";
import { elements } from "../ui/dom";
import { showMessage, showBidError } from "../ui/messageUI";
import { placeBid, joinAuction } from "../services/socket";
import { renderAuctionList } from "../ui/auctionUI";
import { ONE_HOUR_IN_MS } from "../constants";

export async function loadAuctions() {
    const auctions = await fetchAuctions();
    renderAuctionList(auctions);
}

export function setDefaultEndTime() {
    if (!elements.endTimeInput) return;

    const date = new Date(Date.now() + ONE_HOUR_IN_MS);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    elements.endTimeInput.value = date.toISOString().slice(0, 16);
}

export async function handleCreateAuction(e: Event) {
    e.preventDefault();

    const formData = {
        title: elements.titleInput.value,
        description: elements.descriptionInput.value,
        imageUrl: elements.imageUrlInput.value,
        startingPrice: +elements.startingPriceInput.value,
        endTime: elements.endTimeInput?.value || "",
    };

    const response = await createAuction(formData);

    if (response.status === 201) {
        showMessage("Auktionen skapades!", "success");
        resetAuctionForm();
        await loadAuctions();
    } else if (response.status === 400) {
        showMessage("Kunde inte skapa auktionen. Fält saknas.", "error");
    } else {
        showMessage("Något gick fel när auktionen skulle skapas.", "error");
    }
}

export function handlePlaceBid(e: Event) {
    e.preventDefault();

    const amount = +elements.amountInput.value;

    if (!selectedAuction) {
        showBidError("Välj en auktion först");
        return;
    }

    if (amount <= 0) {
        showBidError("Budet måste vara högre än 0");
        return;
    }

    placeBid(amount, selectedAuction);
}

export let selectedAuction = "";

export function setSelectedAuction(id: string) {
    selectedAuction = id;
    joinAuction(id);
}

function resetAuctionForm() {
    elements.titleInput.value = "";
    elements.descriptionInput.value = "";
    elements.imageUrlInput.value = "";
    elements.startingPriceInput.value = "";
    setDefaultEndTime();
}