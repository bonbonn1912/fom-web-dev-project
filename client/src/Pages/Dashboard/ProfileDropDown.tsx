import {  Menu, Transition } from '@headlessui/react'
import {Fragment} from 'react'
import { useUser } from '../../Context/UserContext'

  import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useTranslation } from 'react-i18next';
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}



const ProfileDropDown = () =>{
    const { user } = useUser();
    const { t } = useTranslation();
    const userNavigation = [
        { name: t("language_profile_dropdown_profile"), href: '#' },
        { name: t("language_profile_dropdown_signout"), href: '/logout' },
    ]

       
    return (<Menu as="div" className="relative">
    <Menu.Button className="-m-1.5 flex items-center p-1.5">
      <span className="sr-only">Open user menu</span>
      <img
        className="w-8 h-8 rounded-full bg-gray-50"
        src={user?.profilePicture}
        alt=""
      />
      <span className="hidden lg:flex lg:items-center">
        <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
          {user?.displayName}
        </span>
        <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400" aria-hidden="true" />
      </span>
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
        {userNavigation.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              <a
                href={item.href}
                className={classNames(
                  active ? 'bg-gray-50' : '',
                  'block px-3 py-1 text-sm leading-6 text-gray-900'
                )}
              >
                {item.name}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>)

}

export default ProfileDropDown;