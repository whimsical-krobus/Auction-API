import { joinAuction } from "./services/socket";

let selectedAuction = "";

export function getSelectedAuction(): string {
    return selectedAuction;
}


export function setSelectedAuction(id: string) {
    selectedAuction = id;
    joinAuction(id);
}