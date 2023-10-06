'use client';

import Image from 'next/image';
import { IMAGE_LINKS } from './config';
import { useState, useRef } from 'react';

export default function Home() {
  const [imageIdx, setImageIdx] = useState(0);
  const [messageBoxCoords, setMessageBoxCoords] = useState([]);

  const ref = useRef(null)

  const handleImageClick = (event) => {
    // Calculate the coordinates relative to the image
    const image = event.target;
    console.log((window.innerWidth - ref.current.offsetWidth), window.innerWidth, ref.current.offsetWidth, event.clientX)
    const x = (window.innerWidth - ref.current.offsetWidth) + event.clientX - 20;
    const y = (window.innerHeight - ref.current.offsetHeight) + event.clientY + 20;

    // console.log(event.clientX)

    // Add the coordinates to the array
    setMessageBoxCoords((prevCoords) => [...prevCoords, { x, y }]);
  };

  const handleDragEnd = (event, index) => {
    const coords = structuredClone(messageBoxCoords)

    const newX = event.clientX
    const newY = event.clientY

    const diffMinX = window.innerWidth - ref.current.offsetWidth
    const diffMinY = window.innerHeight - ref.current.offsetHeight

    const diffMaxX = window.innerWidth - diffMinX
    const diffMaxY = window.innerHeight - diffMinY
    coords[index] = {
      x: (newX > diffMinX) ? ((newX < diffMaxX) ? newX : ref.current.offsetWidth) : diffMinX,
      y: (newY > diffMinY) ? ((newY < diffMaxY) ? newY : ref.current.offsetHeight) : diffMinY
    }
    setMessageBoxCoords(coords)
  }


  return (
    <div className='w-screen h-screen flex-col flex items-center p-10 px-20 gap-5 select-none'>
      <h1 className='text-2xl font-bold'>Tagging Component</h1>
      <div className='flex relative w-full h-[90%] bg-gray-200 border border-gray-500 rounded p-5 justify-center items-center cursor-grabbing'>
        <div className='w-fit h-full'>
          <img
            src={IMAGE_LINKS[imageIdx]}
            alt='image'
            className='h-full'
            onDoubleClick={(e) => handleImageClick(e)}
            ref={ref}
          />
          {messageBoxCoords.map((coords, index) => (
            <div
              key={index}
              className='absolute bg-white border border-gray-500 p-2'
              draggable={true}
              onDragEndCapture={(e) => handleDragEnd(e, index)}
              style={{
                position: 'absolute',
                left: (coords.x - (window.innerWidth - ref.current.offsetWidth)),
                top: (coords.y - (window.innerHeight - ref.current.offsetHeight)),
              }}
            >
              Your message here {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
