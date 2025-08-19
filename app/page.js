"use client";
import React from "react";
import HeroSec from "@/components/page/home/HeroSec";
import Categories from "@/components/page/home/Catagories";
import Events from "@/components/page/home/Events";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (

    <>
      <HeroSec />
      <Categories />
      <Events />
      <Footer/>
    </>
  );
}
