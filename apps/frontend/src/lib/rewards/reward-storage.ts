export type PlayerWallet = {
  xp: number;
  lattecoins: number;
};

export type RewardGrant = {
  id: string;
  xp: number;
  lattecoins: number;
};

type StoredRewards = {
  wallet: PlayerWallet;
  processedIds: string[];
};

const STORAGE_KEY = "vialattes:rewards:v1";

const EMPTY_WALLET: PlayerWallet = {
  xp: 0,
  lattecoins: 0,
};

function readData(): StoredRewards {
  if (typeof window === "undefined") {
    return {
      wallet: { ...EMPTY_WALLET },
      processedIds: [],
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return {
        wallet: { ...EMPTY_WALLET },
        processedIds: [],
      };
    }

    const parsed = JSON.parse(stored) as StoredRewards;

    if (
      !parsed.wallet ||
      !Number.isFinite(parsed.wallet.xp) ||
      !Number.isFinite(parsed.wallet.lattecoins) ||
      !Array.isArray(parsed.processedIds)
    ) {
      throw new Error("Invalid rewards data");
    }

    return parsed;
  } catch {
    return {
      wallet: { ...EMPTY_WALLET },
      processedIds: [],
    };
  }
}

export function getPlayerWallet(): PlayerWallet {
  return readData().wallet;
}

export function grantReward(reward: RewardGrant): PlayerWallet {
  const data = readData();

  // Evitar processar a mesma recompensa duas vezes
  if (data.processedIds.includes(reward.id)) {
    return data.wallet;
  }

  const updated: StoredRewards = {
    wallet: {
      xp: data.wallet.xp + reward.xp,
      lattecoins: data.wallet.lattecoins + reward.lattecoins,
    },
    processedIds: [...data.processedIds, reward.id],
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  window.dispatchEvent(
    new Event("vialattes:rewards-updated")
  );

  return updated.wallet;
}
