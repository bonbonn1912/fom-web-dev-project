import {useUser} from "../../Context/UserContext.tsx";
import {useEffect, useState} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import {authenticate} from "../Auth/authContext.tsx";
import {useTranslation} from "react-i18next";
import {initLanguage} from "../../helper/i18n.ts";

const errorFeedbacks = ["Your new Password doesnt match", "Your current password is incorrect"]

const Settings = () => {
  const { t, i18n } = useTranslation();
  const {user} = useUser();
  const [ isLoading, setIsLoading ] = useState(true)
  const [disabled] = useState(false)
  const [errorFeedbackVisible, setErrorFeedbackVisible] = useState(false)
  const [errorFeedback, setErrorFeedback] = useState("")
  const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      weight: "23",
      ftp: "0",
      restingHeartRate: "0",
      maxHeartRate: "0",
    });
  const [credentials, setCredentials] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const fetchUserData = async () => {
    const response = await fetch("/api/user/info", {
      method: "GET",
    });
    const data = await response.json();
    const { firstName, lastName, weight, ftp, restingHeartRate, maxHeartRate } = data;
    setFormData({
        firstName,
        lastName,
        weight,
        ftp,
        restingHeartRate,
        maxHeartRate,
    });
    setIsLoading(false);
  }

  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    const {name, value} = e.target;
    setCredentials((prevState) => ({...prevState, [name]: value}));
   // setFormData((prevState) => ({...prevState, [name]: value}));
  }
  const submitPasswordChange = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    for (const [key, value] of Object.entries(credentials)) {
      data.append(key, value);
      console.log(key + " " +  value)
    }
    if(credentials.new_password !== credentials.confirm_password){
       setErrorFeedbackVisible(true);
         setErrorFeedback(errorFeedbacks[0]);

        return;
    }
    let response = await fetch("/api/account/update-password", {
      method: "POST",
      body: data,
    });
    if (response.status === 200) {
      window.location.reload();
    }else{
      setErrorFeedbackVisible(true);
      setErrorFeedback(errorFeedbacks[1]);
    }
  }
    const deleteAccount = async (e: any) => {
        e.preventDefault();
        let response = await fetch("/api/account/delete", {
        method: "DELETE",
        });
        if (response.status === 200) {
        window.location.reload();
        }
    }

  useEffect(() => {
    authenticate().then(() => {
        initLanguage(i18n);
        fetchUserData();
    })
  }, []);
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({...prevState, [name]: value}));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    for (const [key, value] of Object.entries(formData)) {

      data.append(key, value);
    }
    let response = await fetch("/api/account/update", {
      method: "POST",
      body: data,
    });
if (response.status === 200) {
  window.location.reload();
}else{
  console.log("could not update user")
}

  }
  if(isLoading) return <LoadingSpinner callFrom={"Settings"} width={500} height={500}/>
  else{
    // @ts-ignore
    return (
        <div className="divide-y divide-gray/5">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray">
                {t("language_account_personal_information")}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                {t("language_account_personal_informatiion_desc")}
              </p>
            </div>

            <form className="md:col-span-2" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full flex items-center gap-x-8">
                  <img
                      src={user?.profilePicture}
                      alt=""
                      className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                  />
                  <div>
                    {/* <div className="flex items-center">

                      <button
                        type="button"
                        className="rounded-md bg-gray/10 px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-gray/20"
                    >
                      Change avatar
                    </button>
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                     */}


                  </div>
                </div>

                <div className="sm:col-span-3 col-span-2">
                  <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray"
                  >
                    {t("language_account_first_name")}
                  </label>
                  <div className="mt-2">
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        defaultValue={user?.displayName.split(" ")[0]}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 col-span-2">
                  <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray"
                  >
                    {t("language_account_last_name")}
                  </label>
                  <div className="mt-2">
                    <input
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        id="lastName"
                        defaultValue={user?.displayName.split(" ")[1]}
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                      className="block text-sm font-medium leading-6 text-gray"
                  >
                    {t("language_account_weight")}
                  </label>
                  <div className="mt-2">
                    <input
                        id="weight"
                        name="weight"
                        onChange={handleChange}
                        type="number"
                        defaultValue={user?.weight}
                        min={40}
                        max={150}
                        className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                      className="block text-sm font-medium leading-6 text-gray"
                  >
                    {t("language_account_ftp")}
                  </label>
                  <div className="mt-2">
                    <input
                        id="ftp"
                        name="ftp"
                        onChange={handleChange}
                        type="number"
                        defaultValue={user?.ftp}
                        min={70}
                        max={500}
                        className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                      className="block text-sm font-medium leading-6 text-gray"
                  >
                    {t("language_account_resting_heartrate")}
                  </label>
                  <div className="mt-2">
                    <input
                        id="restingHeartRate"
                        name="restingHeartRate"
                        onChange={handleChange}
                        type="number"
                        defaultValue={user?.restingHeartRate}
                        min={20}
                        max={100}
                        className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                      className="block text-sm font-medium leading-6 text-gray"
                  >
                    {t("language_account_max_heartrate")}
                  </label>
                  <div className="mt-2">
                    <input
                        id="maxHeartRate"
                        name="maxHeartRate"
                        onChange={handleChange}
                        type="number"
                        defaultValue={user?.maxHeartRate}
                        min={130}
                        max={220}
                        className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>


              </div>

              <div className="mt-8 flex col-span-2">
                <button
                    type="submit"
                    disabled={disabled}
                    className={`p-2 w-full sm:w-[158px] text-white ${disabled ? "bg-blue-500 opacity-40" : "bg-blue-500 hover:bg-blue-600"}  rounded-md`}
                >
                    {t("language_account_save_changes")}
                </button>
              </div>
            </form>
          </div>

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray">
                {t("language_account_change_password")}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                {t("language_account_change_password_desc")}
              </p>
            </div>

            <form className="md:col-span-2" onSubmit={submitPasswordChange}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                      htmlFor="current-password"
                      className="block text-sm font-medium leading-6 text-gray"
                  >
                    {t("language_account_current_password")}
                  </label>
                  <div className="mt-2">
                    <input
                        onChange={handlePasswordChange}
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
                    {t("language_account_new_password")}
                  </label>
                  <div className="mt-2">
                    <input
                        onChange={handlePasswordChange}
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
                    {t("language_account_confirm_new_password")}
                  </label>
                  <div className="mt-2">
                    <input
                        onChange={handlePasswordChange}
                        id="confirm-password"
                        name="confirm_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md border-0 bg-gray/5 py-1.5 text-gray shadow-sm ring-1 ring-inset ring-gray/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              {
                errorFeedbackVisible ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3" role="alert">
                  <span className="block sm:inline">{errorFeedback}</span>
                </div> : null
              }
              <div className="mt-3 flex">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    {t("language_account_change_password")}
                </button>
              </div>
            </form>
          </div>



          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray">
                {t("language_account_delete_account")}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                {t("language_account_delete_account_desc")}
              </p>
            </div>

            <form className="flex items-start md:col-span-2">
              <button
                  onClick={deleteAccount}
                  type="submit"
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray shadow-sm hover:bg-red-400"
              >
                {t("language_account_delete_account_button")}
              </button>
            </form>
          </div>
        </div>)
  }

}

export default Settings;