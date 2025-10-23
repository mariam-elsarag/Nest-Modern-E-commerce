import { useTranslation } from "react-i18next";
import type { PagePropsTitle } from "./Page_Title.types";

const Page_Title = ({ title, children }: PagePropsTitle) => {
  const { t } = useTranslation();
  return (
    <header className="pb-4 border-b border-neutral-white-200 px-4 flex items-center gap-4 justify-between">
      <h1 className="h4 text-neutral-black-900 font-medium ">{t(title)}</h1>
      {children}
    </header>
  );
};

export default Page_Title;
