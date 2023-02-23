import { create } from "zustand";

interface BaseImageStore {
  baseImage: string;
  updateBaseImage: (baseImage: string) => void;
  baseImageId: string;
  updateBaseImageId: (baseImageId: string) => void;
  state: "loading" | "loaded" | "error" | "idle";
  updateState: (state: "loading" | "loaded" | "error" | "idle") => void;
}

export const useBaseImageStore = create<BaseImageStore>((set) => ({
  baseImage: "",
  updateBaseImage: (baseImage: string) => set({ baseImage }),
  baseImageId: "",
  updateBaseImageId: (baseImageId: string) => set({ baseImageId }),
  state: "idle",
  updateState: (state: "loading" | "loaded" | "error" | "idle") =>
    set({ state }),
}));
