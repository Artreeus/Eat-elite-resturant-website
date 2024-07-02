import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/menu-bg.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const [filteredMenu, setFilteredMenu] = useState(menu);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterMenu(e.target.value, selectedCategory, minPrice, maxPrice);
  };

  // Handle category selection change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    filterMenu(searchQuery, e.target.value, minPrice, maxPrice);
  };

  // Handle filter button click
  const handleFilter = () => {
    filterMenu(searchQuery, selectedCategory, minPrice, maxPrice);
  };

  // Filter menu based on search query, category, and price range
  const filterMenu = (query, category, min, max) => {
    let filtered = menu.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }
    if (min !== "" && max !== "") {
      filtered = filtered.filter(
        (item) => item.price >= min && item.price <= max
      );
    }
    setFilteredMenu(filtered);
  };

  return (
    <div className="text-center ">
      <Helmet>
        <title>Eat Elite | Menu</title>
      </Helmet>
      <Cover img={menuImg} title="Our Menu" />
      <SectionTitle subHeading="Don't Miss" heading="Today's Offer" />
      <div className="text-center ">
        {/* Search input */}
        <input
          className="btn m-2"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title..."
        />
        {/* Category filter */}
        <select
          className="btn m-2"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        {/* Price range filter */}
        <input
          className="btn m-2"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
        />
        <input
          className="btn m-2"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
        />
      </div>
      <button className="btn-outline btn mt-3" onClick={handleFilter}>
        Filter
      </button>
      {/* Display filtered menu items */}
      <MenuCategory items={filteredMenu} />
    </div>
  );
};

export default Menu;
