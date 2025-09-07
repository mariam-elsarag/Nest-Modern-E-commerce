import React from "react";
import {
  DeliveryIcon,
  ShieldCheckIcon,
  StarBadgeIcon,
} from "~/assets/icons/Icon";
import type {
  FeatureItemComponentProps,
  FeatureListProps,
} from "./features.types";
import { useTranslation } from "react-i18next";

const FeatureList: FeatureListProps[] = [
  {
    icon: <DeliveryIcon />,
    title: "features.title_1",
    description: "features.des_1",
  },
  {
    icon: <StarBadgeIcon />,
    title: "features.title_2",
    description: "features.des_2",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "features.title_3",
    description: "features.des_3",
  },
];
const Features = () => {
  return (
    <section className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {FeatureList.map((feature, index) => (
        <Feaure_Box data={feature} key={index} />
      ))}
    </section>
  );
};

const Feaure_Box = ({ data }: FeatureItemComponentProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6 items-center justify-center text-center sm:items-start sm:justify-baseline sm:text-start">
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-white-100">
        {data.icon}
      </span>
      <div className="flex flex-col gap-4">
        <h2 className="text-neutral-black-800 h5 font-semibold ">
          {t(data.title)}
        </h2>
        <p className="text-neutral-black-500 body max-w-[272px]">
          {t(data.description)}
        </p>
      </div>
    </div>
  );
};
export default Features;
