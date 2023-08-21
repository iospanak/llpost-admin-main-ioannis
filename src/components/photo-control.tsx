import React, { useState } from 'react';

export default function PhotoControl({ setImage }: any) {
  const [, setCreateObjectURL] = useState('');

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      // @ts-ignore
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  return (
    <div className="inline-flex items-center justify-center">
      <style jsx>
        {`
          .img {
            height: 160px;
            width: 160px;
            object-fit: contain;
            padding: 4px;
            border: 1.5px dashed #D1D5DB;
            border-radius: 6px;
            margin-right: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

          }

          svg {
            margin: 12px;
          }

          span {
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            color: #4D377B;
            background: #F4F5F7;
            border-radius: 6px;
          }

          i {
          margin-top: 8px;
            font-size: 10px;
            line-height: 16px;
            text-align: center;
            font-style: normal;
            font-weight: normal;
            color: #6B7280;
          }
        `}
      </style>
      <label>
        <div className="img">
          <svg width="48" height="48" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9V29M1 29V33C1 34.0609 1.42143 35.0783 2.17157 35.8284C2.92172 36.5786 3.93913 37 5 37H29C30.0609 37 31.0783 36.5786 31.8284 35.8284C32.5786 35.0783 33 34.0609 33 33V25M1 29L10.172 19.828C10.9221 19.0781 11.9393 18.6569 13 18.6569C14.0607 18.6569 15.0779 19.0781 15.828 19.828L21 25M33 17V25M33 25L29.828 21.828C29.0779 21.0781 28.0607 20.6569 27 20.6569C25.9393 20.6569 24.9221 21.0781 24.172 21.828L21 25M21 25L25 29M29 5H37M33 1V9M21 13H21.02"
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>Upload images</span>
          <i>PNG, JPG, GIF up to 10MB</i>
        </div>
        <input type="file" name="myImage" onChange={uploadToClient} hidden />
      </label>
    </div>
  );
}
