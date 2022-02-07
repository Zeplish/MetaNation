import React from "react";
import { useState } from "react";
// import { useMoralis } from "react-moralis";
import { Menu } from "antd";

const Categories = ({ categories }) => {
  const [setSelectedCategory] = useState({
    category: "default",
  });

  function selectCategory(categoryId) {
    const selectedCategory = categories.filter(
      (category) => category["categoryId"] === categoryId,
    );
    setSelectedCategory(selectedCategory[0]);
  }

  return (
    <Menu
      onClick={(e) => selectCategory(e.key)}
      // style={{ ...glStyles.card, padding: "10px 0" }}
      mode="inline"
    >
      <Menu.ItemGroup key="categories">
        {categories.map((category) => (
          <Menu.Item key={category["categoryId"]}>
            {category["category"]}
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );
};

export default Categories;
