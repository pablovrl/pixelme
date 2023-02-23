import { useEffect, useState } from "react";
import { AreaSelector, IArea } from "@bmunozg/react-image-area";
import { Cloudinary } from "@cloudinary/url-gen";
import { pixelate } from "@cloudinary/url-gen/actions/effect";
import { useBaseImageStore } from "./store/baseImageStore";
import { Spinner } from "./components/Spinner";
import { Landing } from "./components/Landing";
import { Footer } from "./components/Footer";
import { PixelateImage } from "./components/PixelateImage";


function App() {
  const baseImageState = useBaseImageStore((state) => state.state);

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
        {baseImageState === "loaded" && <PixelateImage />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
