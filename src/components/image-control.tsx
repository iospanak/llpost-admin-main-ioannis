import React, { useState } from 'react';

export default function ImageControl({
  image, setImage, wide = false, dark = false,
}: any) {
  const [createObjectURL, setCreateObjectURL] = useState('');
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      // @ts-ignore
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const getImageUrl = () => createObjectURL || image;
  return (
    <div className="flex items-center justify-center cursor-pointer">
      <style jsx>
        {`
          .img {
            height: ${wide ? '200px' : '150px'};
            width: ${wide ? '800px' : '300px'};
            object-fit: contain;
            padding: 4px;
            border: 1.5px dashed #D1D5DB;
            border-radius: 6px;
            margin-right: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: ${dark ? 'black' : 'white'};
          }
        `}
      </style>
      {(createObjectURL || image) ? <img className="img" src={getImageUrl()} alt="uploaded-file" /> : (
        <div className="img">
          <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M38.9506 11.6524H17.1491C15.7036 11.6524 14.3173 12.2346 13.2951 13.271C12.273 14.3074 11.6987 15.713 11.6987 17.1786V44.8096M11.6987 44.8096V50.3357C11.6987 51.8014 12.273 53.207 13.2951 54.2433C14.3173 55.2797 15.7036 55.8619 17.1491 55.8619H49.8514C51.2969 55.8619 52.6833 55.2797 53.7054 54.2433C54.7275 53.207 55.3018 51.8014 55.3018 50.3357V39.2834M11.6987 44.8096L24.1965 32.138C25.2186 31.102 26.6046 30.52 28.0499 30.52C29.4951 30.52 30.8812 31.102 31.9033 32.138L38.9506 39.2834M55.3018 28.231V39.2834M55.3018 39.2834L50.9796 34.9011C49.9575 33.8651 48.5715 33.2831 47.1262 33.2831C45.681 33.2831 44.2949 33.8651 43.2728 34.9011L38.9506 39.2834M38.9506 39.2834L44.401 44.8096M49.8514 11.6524H60.7522M55.3018 6.12622V17.1786M38.9506 22.7048H38.9779"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </div>
      )}
      <label className="block my-4 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Change
        <input type="file" name="myImage" onChange={uploadToClient} hidden />
      </label>
    </div>
  );
}
