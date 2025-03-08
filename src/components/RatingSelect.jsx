import React, { useState } from "react";

function RatingSelect({ currentRating, onRatingChange }) {
  const [selected, setSelected] = useState(currentRating);

  // Handle change when a user selects a rating
  const handleChange = (e) => {
    const newRating = parseInt(e.target.value, 10);
    setSelected(newRating);
    onRatingChange(newRating); 
    // setSaved(false);
  };

  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold mb-4">Want to leave a rating?</h2>
      <ul className="flex justify-center space-x-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <li key={num}>
            <input
              type="radio"
              id={`num${num}`}
              name="rating"
              value={num}
              onChange={handleChange}
              checked={selected === num}
              className="hidden"
            />
            <label
              htmlFor={`num${num}`}
              className={`cursor-pointer text-lg p-2 rounded-full border-2 border-gray-400 transition-all duration-200 ease-in-out hover:bg-green-600 hover:text-white ${
                selected >= num ? "bg-green-600 text-white" : "bg-transparent text-gray-600"
              }`}
            >
              {num}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RatingSelect;
