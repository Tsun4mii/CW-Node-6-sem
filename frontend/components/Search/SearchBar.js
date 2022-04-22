import React from "react";

const Searchbar = ({ results, updateField, keyword }) => {
  return (
    <div className="auto">
      <input
        className="search-bar"
        placeholder="Search"
        value={keyword}
        onChange={(e) => updateField("keyword", e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
