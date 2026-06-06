import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer_List = ({ title, links }) => {
  const t = useTranslations();
  return (
    <nav className="flex flex-col gap-6 lg:gap-10">
      <h2 className="body font-medium text-neutral-black-300 uppercase">
        {t(title)}
      </h2>
      <div className="flex flex-col gap-4">
        {links?.map((item) => (
          <Link
            className="body font-medium text-neutral-black-500"
            key={item.to}
            href={item.to}
          >
            {t(item.label)}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Footer_List;
