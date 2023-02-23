import { create } from "zustand";

interface BaseImageStore {
  size: {
    width: number;
    height: number;
  }
  updateSize: (size: { width: number; height: number }) => void;
  baseImage: string;
  updateBaseImage: (baseImage: string) => void;
  baseImageId: string;
  updateBaseImageId: (baseImageId: string) => void;
  state: "loading" | "loaded" | "error" | "idle";
  updateState: (state: "loading" | "loaded" | "error" | "idle") => void;
}

export const useBaseImageStore = create<BaseImageStore>((set) => ({
  size: {
    width: 0,
    height: 0,
  },
  updateSize: (size: { width: number; height: number }) => set({ size }),
  baseImage: "",
  updateBaseImage: (baseImage: string) => set({ baseImage }),
  baseImageId: "",
  updateBaseImageId: (baseImageId: string) => set({ baseImageId }),
  state: "idle",
  updateState: (state: "loading" | "loaded" | "error" | "idle") =>
    set({ state }),
}));
