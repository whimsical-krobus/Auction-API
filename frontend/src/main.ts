import "./style.css";
import { io } from "socket.io-client";
import type { Auction } from "./models/Auction";
import { API_URL, ONE_HOUR_IN_MS } from "./constants";

const socket = io(API_URL, {
  withCredentials: true,
});

let selectedAuction = "";

const auctionMessage = document.getElementById("auctionMessage");
const currentUser = document.getElementById("currentUser");

const me = sessionStorage.getItem("me");

if (!me) {
  location.href = "/login.html";
}

if (currentUser && me) {
  currentUser.textContent = `Inloggad som: ${me}`;
}

const setDefaultEndTime = (input: HTMLInputElement) => {
  const date = new Date(Date.now() + ONE_HOUR_IN_MS);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  input.value = date.toISOString().slice(0, 16);
};

const endTimeInput = document.getElementById(
  "endTime",
) as HTMLInputElement | null;


if (endTimeInput) {
 setDefaultEndTime(endTimeInput);
}

document
  .getElementById("createAuctionForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLInputElement
    ).value;
    const imageUrl = (document.getElementById("imageUrl") as HTMLInputElement)
      .value;
    const startingPrice = +(
      document.getElementById("startingPrice") as HTMLInputElement
    ).value;
    const endTime = (document.getElementById("endTime") as HTMLInputElement)
      .value;

    const response = await fetch("http://localhost:3000/auctions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        startingPrice,
        endTime,
      }),
    });

    if (response.status === 201) {
      if (auctionMessage) {
        auctionMessage.textContent = "Auktionen skapades!";
        auctionMessage.className = "success";
      }

      (document.getElementById("title") as HTMLInputElement).value = "";
      (document.getElementById("description") as HTMLInputElement).value = "";
      (document.getElementById("imageUrl") as HTMLInputElement).value = "";
      (document.getElementById("startingPrice") as HTMLInputElement).value = "";

      const endTimeInput = document.getElementById(
        "endTime",
      ) as HTMLInputElement;

      setDefaultEndTime(endTimeInput);

      await loadAuctions();
    } else if (response.status === 400) {
      if (auctionMessage) {
        auctionMessage.textContent = "Kunde inte skapa auktionen. Fält saknas.";
        auctionMessage.className = "error";
      }
    } else if (auctionMessage) {
      auctionMessage.textContent =
        "Något gick fel när auktionen skulle skapas.";
      auctionMessage.className = "error";
    }
  });

document.getElementById("bidForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = +(document.getElementById("amount") as HTMLInputElement).value;
  const bidError = document.getElementById("bidError");

  if (!selectedAuction) {
    if (bidError) {
      bidError.textContent = "Välj en auktion först";
    }
    return;
  }

  if (amount <= 0) {
    if (bidError) {
      bidError.textContent = "Budet måste vara högre än 0";
    }
    return;
  }
  socket.emit("placeBid", amount, selectedAuction);
});

socket.on("connect", () => {
  socket.on("auctionInfo", (auction: Auction) => {
    showAuction(auction);
  });

  socket.on("bidError", (message: string) => {
    const bidError = document.getElementById("bidError");

    if (bidError) {
      bidError.textContent = message;
    }
  });
});

const loadAuctions = async () => {
  const response = await fetch("http://localhost:3000/auctions", {
    credentials: "include",
  });

  if (response.status === 200) {
    const auctions: Auction[] = await response.json();
    const auctionList = document.getElementById("auctionList");

    if (!auctionList) {
      return;
    }

    auctionList.innerHTML = "";

    auctions.forEach((auction) => {
      const button = document.createElement("button");
      button.textContent = auction.title;

      button.addEventListener("click", () => {
        selectedAuction = auction.id;
        socket.emit("joinAuction", auction.id);
      });

      auctionList.appendChild(button);
    });
  }
};

const showAuction = (auction: Auction) => {
  const auctionInfo = document.getElementById("auctionInfo");

  if (!auctionInfo) {
    return;
  }

  auctionInfo.innerHTML = `
    <h2>${auction.title}</h2>
    <img src="${auction.imageUrl}" alt="${auction.title}" width="250" />
    <p>${auction.description}</p>
    <p>Säljare: ${auction.createdBy}</p>
    <p>Nuvarande bud: ${auction.currentPrice} :- </p>
    <p>${new Date(auction.endTime) < new Date() ? "Vinnare" : "Ledande budgivare"}: ${auction.leadingBidder || "Ingen ännu"}</p>
    <p>Slutar: ${new Date(auction.endTime).toLocaleString()}</p>
    <p>Status: ${new Date(auction.endTime) < new Date() ? "Avslutad" : "Pågår"}</p> `;
};

loadAuctions();
