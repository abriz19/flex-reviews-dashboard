"use client";

import { useState } from "react";

interface PropertyDescriptionProps {
  description: string;
  truncateLength?: number;
}

export default function PropertyDescription({
  description,
  truncateLength = 150,
}: PropertyDescriptionProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const shortDescription = description.substring(0, truncateLength) + "...";

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        About this property
      </h2>
      <p className="text-gray-700 leading-relaxed mb-2">
        {showFullDescription ? description : shortDescription}
      </p>
      <button
        onClick={() => setShowFullDescription(!showFullDescription)}
        className="text-[#1a4d3a] hover:text-[#2d8659] font-medium"
      >
        {showFullDescription ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
