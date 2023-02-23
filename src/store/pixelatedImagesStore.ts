import { create } from "zustand";

interface PixelatedImagesStore {
  pixelatedImages: string[];
  addNewPixelatedImage: (image: string) => void;
}

export const usePixelatedImagesStore = create<PixelatedImagesStore>((set) => ({
  pixelatedImages: [],
  addNewPixelatedImage: (image) =>
    set((state) => ({ pixelatedImages: [image, ...state.pixelatedImages] })),
}));
