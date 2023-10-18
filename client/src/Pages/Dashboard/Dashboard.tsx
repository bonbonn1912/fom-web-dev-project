// @ts-ignore
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// @ts-ignore
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// @ts-ignore
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  // @ts-ignore
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
// @ts-ignore
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import bicycle from '../../assets/bicycle.png'
import Workout from '../Workout/Workout';
import Profile from '../Profile/Profile';
import ProfileDropDown from './ProfileDropDown';
import LanSettings from './LanSettings';
import { useTranslation } from 'react-i18next';
import { initLanguage } from '../../helper/i18n';
import { useUser} from "../../Context/UserContext.tsx";
// @ts-ignore
import DetailedWorkout from "../Workout/DetailedWorkout.tsx";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Dashboard = () => {
 const {  setUser} = useUser();
  const getDashboardData = async () =>{
    const response = await fetch("/api/user/dashboard");
    const data = await response.json();
    const displayName = data.displayName;
    const profilePicture = data.profilePicture;
    setUser({
      displayName: displayName,
        profilePicture: `data:image/jpeg;base64,${profilePicture}`,
    });

  }
    const location = useLocation();
    const { t, i18n } = useTranslation();

    useEffect(() => {
    initLanguage(i18n);
    getDashboardData();
     setNavigation([
    { name: t("language_dashboard_root"), href: '/dashboard', icon: HomeIcon, current: location.pathname === '/dashboard'},
    { name: t("language_dashboard_workout"), href: '/dashboard/workouts', icon: UsersIcon, current: location.pathname.startsWith('/dashboard/workouts')},
    { name: t("language_dashboard_equipment"), href: '/dashboard/equip', icon: CalendarIcon, current: false },
    { name: t("language_dashboard_ai"), href: '/dashboard/ai', icon: DocumentDuplicateIcon, current: false },
    { name: t("language_dashboard_profile"), href: '/dashboard/profile/account', icon: FolderIcon, current: location.pathname.startsWith('/dashboard/profile')},
    
    ])
     }, [i18n.language]);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navigation, setNavigation] = useState([
    { name: t("language_dashboard_root"), href: '/dashboard', icon: HomeIcon, current: location.pathname === '/dashboard'},
    { name: t("language_dashboard_workout"), href: '/dashboard/workouts', icon: UsersIcon, current: location.pathname.startsWith('/dashboard/workouts')},
    { name: t("language_dashboard_equipment"), href: '/dashboard/equip', icon: CalendarIcon, current: false },
    { name: t("language_dashboard_ai"), href: '/dashboard/ai', icon: DocumentDuplicateIcon, current: false },
    { name: t("language_dashboard_profile"), href: '/dashboard/profile/account', icon: FolderIcon, current: location.pathname.startsWith('/dashboard/profile')},
  
  ]);
  const handleNavClick = (index: any) => {
    const newNavigation = navigation.map((item, i) => {
        if (i === index) {
            return { ...item, current: true };
        }
        return { ...item, current: false };
    });
    setNavigation(newNavigation);
  }
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="w-6 h-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white grow gap-y-5">
                    <div className="flex items-center h-16 shrink-0">
                      <img
                        className="w-auto h-8"
                        src={bicycle}
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-col flex-1">
                      <ul role="list" className="flex flex-col flex-1 gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-50 text-indigo-600'
                                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <LanSettings/>
                       
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
            <div className="flex items-center h-16 shrink-0">
              <img
                className="w-auto h-8"
                src={bicycle}
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-col flex-1">
              <ul role="list" className="flex flex-col flex-1 gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item, index) => (
                      <li key={item.name} onClick={() =>{handleNavClick(index)}}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
               
               <LanSettings/>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-200 lg:hidden" aria-hidden="true" />

            <div className="flex self-stretch flex-1 gap-x-4 lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
               
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

                {/* Profile dropdown */}
                <ProfileDropDown/>
              </div>
            </div>
          </div>
          <main className="py-2">
            <div className="px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/workouts" element={ <Workout/>}/>
                <Route path="/workouts/:id" element={<DetailedWorkout />} />
                <Route path="/profile/*" element={<Profile />}/>

              </Routes>
                               
                </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Dashboard;
