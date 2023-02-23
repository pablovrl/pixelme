import axios from "axios";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useBaseImageStore } from "../store/baseImageStore";
import midu from "../assets/midu.jpeg";

const URL = "https://api.cloudinary.com/v1_1/drd5r8jrf/image/upload";
const API_KEY = "361692725249647";
const UPLOAD_PRESET = "y23xo48p";

interface IDefaultImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const defaultImages: IDefaultImage[] = [
  {
    id: "ntlh24jnlagdx3huyh0t",
    url: "https://res.cloudinary.com/drd5r8jrf/image/upload/v1677178503/ntlh24jnlagdx3huyh0t.jpg",
    width: 460,
    height: 460,
  },
  {
    id: "fozqriuvoaa62gfotloh",
    url: "https://res.cloudinary.com/drd5r8jrf/image/upload/v1677178503/fozqriuvoaa62gfotloh.jpg",
    width: 460,
    height: 460,
  },
];

export function Dropzone() {
  const updateBaseImageStatus = useBaseImageStore((state) => state.updateState);
  const updateBaseImageId = useBaseImageStore(
    (state) => state.updateBaseImageId
  );
  const updateBaseImage = useBaseImageStore((state) => state.updateBaseImage);
  const updateSize = useBaseImageStore((state) => state.updateSize);

  const uploadDefaultImage = async (image: IDefaultImage) => {
    updateBaseImageStatus("loading");
    updateBaseImageId(image.id);
    updateBaseImage(image.url);
    updateSize({ width: image.width, height: image.height });
    updateBaseImageStatus("loaded");
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const image = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("api_key", API_KEY);
    formData.append("upload_preset", UPLOAD_PRESET);

    updateBaseImageStatus("loading");

    const { data } = await axios.post(URL, formData);
    updateBaseImageId(data.public_id);
    updateBaseImage(data.secure_url);
    updateSize({ width: data.width, height: data.height });

    updateBaseImageStatus("loaded");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full flex flex-col gap-8">
      <div
        className="flex justify-center border shadow-2xl rounded-3xl w-full max-w-md"
        {...getRootProps()}
      >
        <div className="py-32 flex items-center justify-center text-xl text-center font-poppins font-semibold text-slate-800">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <div className="flex flex-col gap-4">
              <p>Drag 'n' drop a image here</p>
              <p className="text-base text-gray-400">or click to select file</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <p>No image?</p>
          <p>Select one of these:</p>
        </div>
        {defaultImages.map((image) => (
          <button className="hover:scale-110 transition-transform duration-150" onClick={() => uploadDefaultImage(image)}>
            <img src={image.url} className="h-12 rounded-xl" />
          </button>
        ))}
      </div>
    </div>
  );
}
