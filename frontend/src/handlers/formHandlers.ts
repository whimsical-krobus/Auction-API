import { createAuction, fetchAuctions } from "../services/api";
import { elements } from "../ui/dom";
import { showMessage, showBidError } from "../ui/messageUI";
import { socket, placeBid, joinAuction } from "../services/socket";

export async function handleCreateAuction(e: Event) {
    e.preventDefault();

    const fromData = {
        title: elements.titleInput.value,
        description: elements.descriptionInput.value,
        imageUrl: elements.imageUrlInput.value,
        startingPrice: +elements.startingPriceInput.value,
        endTime: elements.endTimeInput?.value || "",
    };

    const response = await createAuction(fromData);

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

export let selectedAuction: "";

export function setSelectedAuction(id: string) {
    selectedAuction = id;
    joinAuction(id);
}

function resetAuctionForm() {
    elements.titleInput.value = "";
    elements.descriptionInput.value = "";
    elements.imageUrlInput.value = "";
    elements.startingPriceInput.value = "";
}