import pixelatedMidu from "../assets/pixelated-midu.jpeg";
import { Dropzone } from "./Dropzone";
import { YourImages } from "./YourImages";

export function Landing() {
  return (
    <div>
      <div className="flex" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="flex gap-16 items-center justify-center">
          <div className="flex flex-col gap-10 w-full">
            <img
              className="rounded-3xl"
              src={pixelatedMidu}
              alt="pixelated midu"
              width={300}
            />
            <div>
              <h2 className="text-6xl mb-4">Pixelate your images</h2>
              <p className="text-gray-400">
                Select the areas you want to pixelate and that's it!
              </p>
            </div>
          </div>
          <Dropzone />
        </div>
      </div>
      <YourImages />
    </div>
  );
}
