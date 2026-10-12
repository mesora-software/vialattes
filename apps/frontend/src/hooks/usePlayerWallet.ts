"use client";

import { useSyncExternalStore } from "react";
import {
  getPlayerWallet,
  type PlayerWallet,
} from "@/lib/rewards/reward-storage";

const REWARDS_EVENT = "vialattes:rewards-updated";
const STORAGE_KEY = "vialattes:rewards:v1";

const EMPTY_WALLET: PlayerWallet = {
  xp: 0,
  lattecoins: 0,
};

function subscribe(callback: () => void) {
  window.addEventListener(REWARDS_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(REWARDS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

export function usePlayerWallet(): PlayerWallet {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Durante SSR e hidratação, utilizar valores iniciais estáveis.
  if (snapshot === null) {
    return EMPTY_WALLET;
  }

  return getPlayerWallet();
}
