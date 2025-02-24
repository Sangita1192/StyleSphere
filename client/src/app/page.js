"use client"
import React from "react";
import Banner from "./HomeComponents/Banner";
import FeaturedCategories from "./HomeComponents/FeaturedCategories";
import ThisJustIn from "./HomeComponents/ThisJustIn";
import ProductReview from "./HomeComponents/ProductReview";
import BetterLiving from "./HomeComponents/BetterLiving";
import TextSlider from "./common/TextSlider";
import MostViewedProducts from "./HomeComponents/MostViewedProducts";


export default function Home() {
  return (
    <>
    <Banner/>
    <FeaturedCategories/>
    <MostViewedProducts/>
    <ThisJustIn/>
    <ProductReview/>
    <BetterLiving/>
    </>
  );
}
