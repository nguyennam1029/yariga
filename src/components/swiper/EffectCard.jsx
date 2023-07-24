import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import EffectCardStyles from "./EffectCard.module.css";

// import required modules
import { EffectCards } from "swiper/modules";
import Image from "next/image";

export default function EffectCard({ data }) {
  console.log("🚀 ~ file: EffectCard.jsx:16 ~ EffectCard ~ data:", data);
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className={EffectCardStyles.swiper}
      >
        {data &&
          data.map((item, index) => (
            <SwiperSlide
              className={`${EffectCardStyles.swiperSlide}`}
              key={index}
            >
              <Image
                src={item}
                fill
                alt=""
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
