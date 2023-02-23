import { useEffect, useState } from "react";
import { AreaSelector, IArea } from "@bmunozg/react-image-area";
import { Cloudinary } from "@cloudinary/url-gen";
import { pixelate } from "@cloudinary/url-gen/actions/effect";
import { custom } from "@cloudinary/url-gen/qualifiers/region";
import { useBaseImageStore } from "./store/baseImageStore";
import { Spinner } from "./components/Spinner";
import axios from "axios";
import { Alert } from "./components/Alert";
import { Landing } from "./components/Landing";
import { toast } from "react-hot-toast";
import { Footer } from "./components/Footer";

const MAX_WIDTH = 460;

function App() {
  const updateBaseImageState = useBaseImageStore((state) => state.updateState);

  const baseImageState = useBaseImageStore((state) => state.state);
  const baseImage = useBaseImageStore((state) => state.baseImage);
  const baseImageId = useBaseImageStore((state) => state.baseImageId);
  const baseImageSize = useBaseImageStore((state) => state.size);

  const [areas, setAreas] = useState<IArea[]>([]);
  const [pixelatedImage, setPixelatedImage] = useState<string | null>(null);
  const [isPixelatedImageLoading, setIsPixelatedImageLoading] = useState(false);
  const [imageMultiplier, setImageMultiplier] = useState(1);
  const [pixelatedImages, setPixelatedImages] = useState<string[]>([]);

  useEffect(() => {
    for (let i = 1; i < 10; i = i + 0.1) {
      if (baseImageSize.width / i < MAX_WIDTH) {
        setImageMultiplier(i);
        break;
      }
    }
  }, [baseImageSize]);

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "drd5r8jrf",
    },
  });

  const onChangeHandler = async (areas: IArea[]) => {
    setAreas(areas);
  };

  const handlePixelate = async () => {
    if (areas.length === 0)
      return toast.error("You need to select at least one area to pixelate.");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsPixelatedImageLoading(true);
    const pixelatedImage = cloudinary.image(baseImageId);
    areas.forEach((area) => {
      let { x, y, width, height } = area;

      if (baseImageSize.width > MAX_WIDTH) {
        x = x * imageMultiplier;
        y = y * imageMultiplier;
        width = width * imageMultiplier;
        height = height * imageMultiplier;
      }

      pixelatedImage.effect(
        pixelate()
          .squareSize(30)
          .region(
            custom()
              .width(Math.trunc(width))
              .height(Math.trunc(height))
              .x(Math.trunc(x))
              .y(Math.trunc(y))
          )
      );
    });

    setPixelatedImage(pixelatedImage.toURL());
    await axios.get(pixelatedImage.toURL());

    setIsPixelatedImageLoading(false);
    setPixelatedImages((prev) => [pixelatedImage.toURL(), ...prev]);
  };

  const resetAreas = () => {
    setPixelatedImage(null);
    setAreas([]);
  };

  const clearCurrentImage = () => {
    updateBaseImageState("idle");
    resetAreas();
  };

  return (
    <div className="m-auto font-poppins">
      <header className="py-4 border-b-2">
        <h1 className="text-5xl text-center font-bold text-gray-600 block">
          pixel<span className="text-gray-300">me</span>
        </h1>
      </header>

      <main className="flex max-w-4xl m-auto pt-4 px-4 lg:px-0">
        {baseImageState === "idle" && <Landing />}
        {baseImageState === "loading" && <Spinner size={"w-16"} />}

        {baseImageState === "loaded" && (
          <div className="flex flex-col gap-4 w-full">
            {pixelatedImage && areas.length > 0 && (
              <div className="flex flex-col w-full">
                <div>
                  {isPixelatedImageLoading ? (
                    <Spinner size={"w-8"} />
                  ) : (
                    <Alert>
                      <div>
                        <span className="font-medium">
                          Your image is ready!
                        </span>{" "}
                        Click this link to download it {"-> "}
                        <a
                          className="text-blue-400 underline"
                          href={pixelatedImage}
                          target="_blank"
                        >
                          Download your image.
                        </a>
                      </div>
                    </Alert>
                  )}
                </div>
              </div>
            )}
            <div className="w-full flex gap-8">
              <div className="w-full" style={{ maxWidth: MAX_WIDTH }}>
                <AreaSelector areas={areas} onChange={onChangeHandler}>
                  <img
                    src={baseImage}
                    width={
                      baseImageSize.width > MAX_WIDTH
                        ? baseImageSize.width / imageMultiplier
                        : baseImageSize.width
                    }
                  />
                </AreaSelector>
              </div>
              <div className="flex flex-col gap-4 items-end">
                <p className="w-full">
                  Select the areas you want to pixelate by clicking the image.
                </p>
                <button
                  onClick={handlePixelate}
                  className="hover:bg-green-500 py-4 rounded-2xl bg-green-500 text-white font-bold w-full"
                >
                  pixelate
                </button>
                <button
                  onClick={resetAreas}
                  className="border-2 w-full py-4 rounded-2xl"
                >
                  reset areas
                </button>
                <button
                  onClick={clearCurrentImage}
                  className="border-2 w-full py-4 rounded-2xl"
                >
                  upload new image
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      {pixelatedImages.length > 0 && (
        <div className="flex flex-col gap-4 w-full max-w-4xl m-auto pb-16 px-4 lg:px-0">
          <h2 className="text-2xl font-bold">Your pixelated images</h2>
          <div className="flex flex-wrap gap-4">
            {pixelatedImages.map((image) => (
              <a href={image} target="_blank" className="w-10 h-10">
                <img src={image} />
              </a>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
