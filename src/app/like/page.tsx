

'use client'
import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa'; // Heart icon from react-icons

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false); // State to track if liked

  const handleLike = () => {
    setIsLiked(!isLiked); // Toggle like status
  };

  return (
    <div className="flex justify-center items-center h-[500px] bg-gray-100">
      <div className="bg-blue-400 p-8 rounded-3xl radius-[50%] shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Like the Survice</h2>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`px-6 py-2 border rounded-full transition duration-300 ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white text-red-500 border-red-500'
          }`}
        >
          <FaHeart
            size={24}
            className={`mr-2 ${isLiked ? 'fill-current' : 'text-gray-500'}`} // Change heart color when liked
          />
          {isLiked ? 'Liked' : 'Like'}
        </button>
      </div>
    </div>
  );
};

export default LikeButton;
