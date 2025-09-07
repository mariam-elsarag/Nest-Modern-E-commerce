import React, { useEffect } from "react";
import { languages } from "./common/constant/constant";
import { currentLanguageCode, switchLang } from "./common/utils/switchLang";

import Cookies from "js-cookie";

const App = () => {
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";

    Cookies.set("i18next", currentLanguageCode);
  }, [currentLanguage]);
  return <>ddd</>;
};

export default App;
