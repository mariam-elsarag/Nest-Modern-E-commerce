import { useTranslation } from "react-i18next";

const Page_Title = ({ title }) => {
  const { t } = useTranslation();
  return (
    <h1 className="h4 text-neutral-black-900 font-medium pb-4 border-b border-neutral-white-200 px-4">
      {t(title)}
    </h1>
  );
};

export default Page_Title;
