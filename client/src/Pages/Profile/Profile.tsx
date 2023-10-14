
import { useState } from "react";

//@ts-ignore
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
//@ts-ignore
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Settings from "./Settings";
import Connection from "./Connection"; 

const secondaryNavigation = [
  { name: "Account", current: true },
  { name: "Connections", current: false },
];
/*
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
} */

const Profile = () => {
    const [profile, setProfile] = useState(true)
    const [navigation, setNavigation] = useState(secondaryNavigation)
    const handleSwitch = (index: number) =>{
        const newNavigation = navigation.map((item, i) => {
            if (i === index) {
                return { ...item, current: true };
            }
            return { ...item, current: false };
        });
        setProfile(!profile)
        setNavigation(newNavigation);
    }
  return (
    <>
      <div>
      

        <div className="">
          <main>
            <header className="border-b border-gray/5">
              {/* Secondary navigation */}
              <nav className="flex py-4 overflow-x-auto">
                <ul
                  role="list"
                  className="flex flex-none min-w-full px-4 text-sm font-semibold leading-6 text-gray-400 gap-x-6 sm:px-6 lg:px-8"
                >
                  {navigation.map((item, index) => (
                    <li key={item.name}>
                      <div
                        onClick={() => handleSwitch(index)}
                        className={`${item.current ? "text-indigo-400" : ""} cursor-pointer`}
                      >
                        {item.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </nav>
            </header>

            {profile ? <Settings/> : <Connection/>}
            
          </main>
        </div>
      </div>
    </>
  );
};
export default Profile;
