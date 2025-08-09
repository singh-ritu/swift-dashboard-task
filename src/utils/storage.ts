import type { DashboardState } from "../types";

const STORAGE_KEY = "dashboardState";

export const getStoredState = (): Partial<DashboardState> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const saveState = (state: Partial<DashboardState>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors in case localStorage is not available
    console.warn("Failed to save state to localStorage");
  }
};
