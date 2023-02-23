import axios from "axios";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useBaseImageStore } from "../store/baseImageStore";

const URL = "https://api.cloudinary.com/v1_1/drd5r8jrf/image/upload";
const API_KEY = "361692725249647";
const UPLOAD_PRESET = "y23xo48p";

export function Dropzone() {
  const updateBaseImageStatus = useBaseImageStore((state) => state.updateState);
  const updateBaseImageId = useBaseImageStore(
    (state) => state.updateBaseImageId
  );
  const updateBaseImage = useBaseImageStore((state) => state.updateBaseImage);

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
    updateBaseImageStatus("loaded");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <div className="h-64 flex items-center justify-center border shadow-2xl rounded-3xl text-xl text-center font-poppins font-semibold text-slate-800">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="flex flex-col gap-4">
            <p>Drag 'n' drop some files here</p>
            <p className="text-base text-gray-400">or click to select files</p>
          </div>
        )}
      </div>
    </div>
  );
}
