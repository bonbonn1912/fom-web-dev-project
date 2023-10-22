import {useUser} from "../../Context/UserContext.tsx";

const Settings = () => {
    const {user} = useUser();
    return (<div className="divide-y divide-gray/5">
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Use a permanent address where you can receive mail.
        </p>
      </div>

      <form className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full flex items-center gap-x-8">
            <img
                src={user?.profilePicture}
              alt=""
              className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
            />
            <div>
              <button
                type="button"
                className="rounded-md bg-gray/10 px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-gray/20"
              >
                Change avatar
              </button>
              <p className="mt-2 text-xs leading-5 text-gray-400">
                JPG, GIF or PNG. 1MB max.
              </p>
            </div>
          </div>

          <div className="sm:col-span-3 col-span-2">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3 col-span-2">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray"
            >
              Weight
            </label>
            <div className="mt-2">
              <input
                id="weight"
                name="weight"
                type="number"
                className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray"
            >
              FTP
            </label>
            <div className="mt-2">
              <input
                  id="ftp"
                  name="ftp"
                  type="number"
                  className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray"
            >
              Resting Heart Rate
            </label>
            <div className="mt-2">
              <input
                  id="resting-heart-rate"
                  name="resting-heart-rate"
                  type="number"
                  className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray"
            >
              Max Heart Rate
            </label>
            <div className="mt-2">
              <input
                  id="max-heart-rate"
                  name="max-heart-rate"
                  type="number"
                  className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


        </div>

        <div className="mt-8 flex">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>

    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray">
          Change password
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Update your password associated with your account.
        </p>
      </div>

      <form className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="current-password"
              className="block text-sm font-medium leading-6 text-gray"
            >
              Current password
            </label>
            <div className="mt-2">
              <input
                id="current-password"
                name="current_password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium leading-6 text-gray"
            >
              New password
            </label>
            <div className="mt-2">
              <input
                id="new-password"
                name="new_password"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-gray"
            >
              Confirm password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>



    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray">
          Delete account
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          No longer want to use our service? You can delete your
          account here. This action is not reversible. All information
          related to this account will be deleted permanently.
        </p>
      </div>

      <form className="flex items-start md:col-span-2">
        <button
          type="submit"
          className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-red-400"
        >
          Yes, delete my account
        </button>
      </form>
    </div>
  </div>)
}

export default Settings;