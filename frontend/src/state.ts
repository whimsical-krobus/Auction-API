import { joinAuction } from "./services/socket";

export let selectedAuction = "";

export function getSelectedAuction(): string {
    return selectedAuction;
}


export function setSelectedAuction(id: string) {
    selectedAuction = id;
    joinAuction(id);
}