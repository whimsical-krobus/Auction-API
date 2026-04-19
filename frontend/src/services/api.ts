import type { Auction } from "../models/types";
import { API_URL } from "../constants";

export async function createAuction(formData: {
    title: string;
    description: string;
    imageUrl: string;
    startingPrice: number;
    endTime: string;
}) {
    const response = await fetch(`${API_URL}/auctions`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });
    
    return response;
}
