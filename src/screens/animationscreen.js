import React, { useState } from "react";
import Slider from "react-slick";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

export default function Animationscreen() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 2,
    focusOnSelect: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          // slidesToScroll: 4,
          vertical: true,
          verticalSwiping: true,
          swipeToSlide: true,
        },
      },
    ],
  };
  return (
    <div style={{ height: "100vh", backgroundColor: "rgba(7,13,25,0.8)" }}>
      <h2> Single Item</h2>
      <Slider {...settings}>
        <div>
          <div
            style={{
              border: "1px solid black",
              height: 300,
              backgroundColor: "brown",
              marginRight: 10,
            }}
          >
            1
          </div>
        </div>
        <div>
          <div
            style={{
              border: "1px solid black",
              height: 300,
              backgroundColor: "yellow",
              marginRight: 10,
            }}
          >
            2
          </div>
        </div>
        <div>
          <div
            style={{
              border: "1px solid black",
              height: 300,
              backgroundColor: "grey",
              marginRight: 10,
            }}
          >
            3
          </div>
        </div>
        <div>
          <div
            style={{
              border: "1px solid black",
              height: 300,
              backgroundColor: "red",
              marginRight: 10,
            }}
          >
            4
          </div>
        </div>
        <div>
          <div
            style={{
              border: "1px solid black",
              height: 300,
              backgroundColor: "purple",
              marginRight: 10,
            }}
          >
            5
          </div>
        </div>
        <div>
          <div
            style={{
              border: "1px solid black",
              height: 300,
              backgroundColor: "green",
              marginRight: 10,
            }}
          >
            6
          </div>
        </div>
      </Slider>
    </div>
  );
}
