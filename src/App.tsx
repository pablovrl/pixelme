import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { AreaSelector, IArea } from "@bmunozg/react-image-area";
import { Cloudinary } from "@cloudinary/url-gen";
import { pixelate } from "@cloudinary/url-gen/actions/effect";
import { custom } from "@cloudinary/url-gen/qualifiers/region";
import { Dropzone } from "./components/Dropzone";
import { useBaseImageStore } from "./store/baseImageStore";

function App() {
  const baseImageState = useBaseImageStore((state) => state.state);
  const baseImage = useBaseImageStore((state) => state.baseImage);
  const baseImageId = useBaseImageStore((state) => state.baseImageId);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [pixelatedImage, setPixelatedImage] = useState<string | null>(null);

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "drd5r8jrf",
    },
  });

  const onChangeHandler = (areas: IArea[]) => {
    setAreas(areas);
    const pixelatedImage = cloudinary.image(baseImageId);
    areas.forEach((area) => {
      pixelatedImage.effect(
        pixelate()
          .squareSize(30)
          .region(
            custom()
              .width(Math.trunc(area.width))
              .height(Math.trunc(area.height))
              .x(Math.trunc(area.x))
              .y(Math.trunc(area.y))
          )
      );
    });

    setPixelatedImage(pixelatedImage.toURL());
  };

  const resetAreas = () => {
    setAreas([]);
  };

  return (
    <div className="m-auto font-poppins max-w-3xl">
      <header className="my-10">
        <h1 className="text-5xl text-center font-bold text-gray-600">
          pixelate<span className="text-gray-300">me</span>
        </h1>
      </header>

      <main className="">
        {baseImageState === "idle" && <Dropzone />}
        {baseImageState === "loading" && <p>Loading...</p>}
        {baseImageState === "loaded" && (
          <div className="flex flex-col gap-4">
            <p>Select the areas you want to pixelate by clicking the image.</p>
            <div className="flex justify-center">
              <AreaSelector areas={areas} onChange={onChangeHandler}>
                <img src={baseImage} className="w-full h-full" />
              </AreaSelector>
            </div>
            <div className="flex gap-2">
              <button
                onClick={resetAreas}
                className="border border-black w-full py-4 rounded-xl"
              >
                reset pixelated areas
              </button>
            </div>
            {pixelatedImage && areas.length > 0 && (
              <div>
                <p>Your image is ready, click the link to download it</p>
                <a
                  className="text-blue-400 underline"
                  href={pixelatedImage}
                  target="_blank"
                >
                  Download your image
                </a>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
