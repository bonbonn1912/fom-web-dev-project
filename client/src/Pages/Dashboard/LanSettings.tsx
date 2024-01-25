
import {  useState } from "react";
import { useTranslation } from 'react-i18next';
//import { TbBluetoothOff } from "react-icons/tb";

import {
  // @ts-ignore
  ChartPieIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import ToggleLanguage from "./ToggleLanguage";
/*
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}*/
const LanSettings = () => {
const { t } = useTranslation();
  const [showDiv, setShowDiv] = useState(false);
 // const [ allowBluetooth, setAllowBluetooth ] = useState(true);

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };
  return (
    <li className="mt-auto">
      <button
        onClick={toggleDiv}
        className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-700 rounded-md group gap-x-3 hover:bg-gray-50 hover:text-indigo-600"
      >
        <Cog6ToothIcon
          className="w-6 h-6 text-gray-400 shrink-0 group-hover:text-indigo-600"
          aria-hidden="true"
        />
        {t("language_button_settings")}
      </button>
      {showDiv && (

          <div className="absolute grid items-center justify-center h-10 grid-cols-3 gap-3 origin-bottom-left bg-white rounded-md shadow-lg w-fit bottom-14 ring-1 ring-gray-900/5 focus:outline-none">
              <>
              <div className="flex justify-center pl-2 text-sm font-semibold w-fit">{t("language_toggle_german")}</div>
              <div className="flex items-center justify-center">
                  <ToggleLanguage />
              </div>
              <div className="flex justify-center pr-2 text-sm font-semibold w-fit">{t("language_toggle_english")}</div>
              </>
          </div>

      )}
    </li>
  );
};

export default LanSettings;
