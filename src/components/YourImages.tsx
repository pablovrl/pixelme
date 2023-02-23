import { usePixelatedImagesStore } from "../store/pixelatedImagesStore";

export function YourImages() {
  const pixelatedImages = usePixelatedImagesStore(
    (state) => state.pixelatedImages
  );
  return (
    <div>
      <div className="flex flex-col gap-4 w-full max-w-4xl m-auto pb-16 px-4 lg:px-0">
        <h2 className="text-2xl font-bold">Your pixelated images</h2>
        {pixelatedImages.length === 0 && (
          <p className="text-gray-500">You haven't pixelated any images yet.</p>
        )}
        <div className="flex flex-wrap gap-4">
          {pixelatedImages.map((image) => (
            <a href={image} target="_blank" className="w-10 h-10">
              <img src={image} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
