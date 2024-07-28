import axios from "axios";
import React, { useState } from "react";

const ImageCmp = ({
  currentImg,
  handlePhoto,
  photo,
  fetchData,
  userId,
  isOwner,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const handlSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("profile", photo);
    setLoading(true);
    const response = await axios.post("/user/upload/user/avatar", formData);
    const { status, message } = response;

    if (status === "successfully") {
      setDone("Nous avons bien changé votre image");
    } else {
      setError(message);
    }
    setLoading(false);

    setTimeout(() => {
      setError(false);
      setLoading(false);
      setDone(false);
    }, 3000);

    fetchData();
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {error && (
        <div className="flex justify-center items-center p-2 bg-red-500">
          <p className="text-sm text-white font-Josefin">{error}</p>
        </div>
      )}
      {done && (
        <div className="flex justify-center items-center p-2 bg-green-500">
          <p className="text-sm text-white font-Josefin">{done}</p>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center">
          <p className="text-sm text-black font-Josefin">Entrain ....</p>
        </div>
      )}

      <img
        className="h-64 w-96 mx-auto mb-3"
        src={currentImg}
        alt="UserImage"
      />

      {(isOwner || !userId) && (
        <div className="flex justify-end items-center p-4">
          <form onSubmit={handlSubmit} encType="multipart/form-data">
            <input
              type="file"
              name="profil"
              accept=".png, .jpeg, .jpg"
              onChange={handlePhoto}
            />
            <div className="flex items-center justify-center w-full">
              <button
                type="submit"
                className="p-1 w-4/12 mt-3 bg-orange-400 border-2 border-orange-600 text-white rounded-md"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ImageCmp;
