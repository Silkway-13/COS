import React from "react";
import CategoryList from "../components/CategoryList";
import BannerWork from "../components/BannerWork";
import HorizontalCardWork from "../components/HorizontalCardWork";
import VerticalCardWork from "../components/VerticalCardWork";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerWork />
      <HorizontalCardWork category={"шавар"} heading={"Шаврын ажлууд"} />

      <VerticalCardWork category={"өрлөг"} heading={"Өрлөг хийх ажлууд"} />
    </div>
  );
};

export default Home;
