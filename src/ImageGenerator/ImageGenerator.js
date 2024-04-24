import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import axios from "axios";

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const axios = require("axios").default;
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/image/generation",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzU1NDlmMDEtMzc2ZC00NTEzLWIzOWEtNTZiMDI3NGQxYTYwIiwidHlwZSI6ImFwaV90b2tlbiJ9.V3kzyHkrWtVg60vJuwBLvhX7ZO9NgvwHROvu_F6bDJw",
      },
      data: {
        providers: "openai",
        text: `${inputRef.current.value}`,
        resolution: "512x512",
        fallback_providers: "",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setImageUrl(response.data.openai.items[0].image_resource_url);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="aiImageGen">
        <div className="header">
          AI Image
          <span>Generator</span>
        </div>
        <div className="imgLoading">
          <div className="image">
            <img
              src={
                imageUrl === "/"
                  ? "https://news.ubc.ca/wp-content/uploads/2023/08/AdobeStock_559145847.jpeg"
                  : imageUrl
              }
            />
          </div>
          <div className="loading">
            <div className={loading ? "loadingBarFull" : "loadingBar"}></div>
            <div className={loading ? "loadingText" : "displayNone"}>
              Loading....
            </div>
          </div>
        </div>
        <div className="searchBox">
          <input
            ref={inputRef}
            type="text"
            className="searchInput"
            placeholder="Describe Your Image"
          />
          <div className="generateBtn">
            <button
              onClick={() => {
                imageGenerator();
              }}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageGenerator;
