import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";
import { HeroImg1, HeroImg2, HeroImg3, HeroImg4 } from "~/assets/images/Image";
import type { HeroItemComponentProps, HeroItemProps } from "./hero.types";
import { useTranslation } from "react-i18next";
import { currentLanguageCode } from "~/common/utils/switchLang";

const heroList: HeroItemProps[] = [
  { img: HeroImg1, title: "hero.title_1", description: "hero.title_1_des" },
  { img: HeroImg2, title: "hero.title_2", description: "hero.title_2_des" },
  { img: HeroImg3, title: "hero.title_3", description: "hero.title_3_des" },
  { img: HeroImg4, title: "hero.title_4", description: "hero.title_4_des" },
];
const Hero = () => {
  return (
    <section className="bg-neutral-white-100 min-h-[440px] container py-10">
      <Swiper
        key={currentLanguageCode}
        loop={true}
        speed={800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        modules={[Autoplay]}
      >
        {heroList.map((heroItem, index) => (
          <SwiperSlide key={index} className="min-h-[50vh]">
            <Hero_Item data={heroItem} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
const Hero_Item = ({ data }: HeroItemComponentProps) => {
  const { t } = useTranslation();
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-[1fr_400px] gap-10 sm:gap-6 h-full content-center justify-center items-center  min-h-[50vh]">
      <div>
        <div className="flex flex-col gap-2 text-center sm:text-start">
          <h2 className="h2 font-semibold text-neutral-black-800">
            {t(data.title)}
          </h2>
          <p className="text-neutral-black-600 line-clamp-1 body">
            {t(data.description)}
          </p>
        </div>
      </div>
      <figure className="relative overflow-hidden h-[300px] md:h-[340px] flex flex-col justify-center items-center ">
        <img
          src={data.img}
          aria-label={t(data.title)}
          alt={t(data.title)}
          className={`h-[280px] md:h-[300px] lg:h-[300px] absolute bottom-0 z-10   ${currentLanguageCode === "en" ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"}  `}
        />
        <div className="h-[300px] w-[300px] md:w-[340px] md:h-[340px] rounded-full bg-neutral-white-200 absolute z-[1] opacity-60" />
      </figure>
    </div>
  );
};
export default Hero;
