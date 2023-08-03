import React, { useState } from "react";
import axios from "axios";
import { imgbbAPI } from "@/config";

const ImageUploader = () => {
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  console.log(
    "🚀 ~ file: UploadImage.tsx:7 ~ ImageUploader ~ imageUrl:",
    imageUrl
  );

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    try {
      const uploadedImageUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(`${imgbbAPI}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response?.data?.imageUrl) {
          uploadedImageUrls.push(response.data.imageUrl);
        }
      }

      setImageUrl(uploadedImageUrls);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
      {imageUrl.length > 0 && (
        <div>
          <h2>Uploaded Images:</h2>
          <ul>
            {imageUrl.map((url, index) => (
              <li key={index}>
                <img src={url} alt={`Uploaded Image ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
