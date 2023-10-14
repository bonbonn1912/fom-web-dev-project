
import bicycle from "../../assets/bicycle.png";
import Google from "../../components/fields/Google";
import Strava from "../../components/fields/Strava";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { initLanguage } from "../../helper/i18n";
//TODO Forget Password
const Login = () => {
const { t, i18n } = useTranslation();
useEffect(() => {
 initLanguage(i18n);
}, []);
  return (
    <>
      <div className="flex flex-1 h-full">
        <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="w-full max-w-sm mx-auto lg:w-96">
            <div>
              <img className="w-auto h-14" src={bicycle} alt="Your Company" />
              <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {t('language_landing_page_sign_in_message')}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
              {t('language_landing_page_not_a_member')}{" "}
                <a
                  href="/register"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {t('language_landing_page_sign_up')}
                </a>
              </p>
            </div>

            <div className="mt-6">
              <div>
                <form action="/auth/local" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                       {t('language_landing_page_email_input')}
                    </label>
                    <div className="mt-2">
                      <input
                        id="mail"
                        name="mail"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                     {t('language_landing_page_password_input')}
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="block ml-3 text-sm leading-6 text-gray-700"
                      >
                         {t('language_landing_page_remember_me')}
                      </label>
                    </div>

                    <div className="text-sm leading-6">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                          {t('language_landing_page_forgot_password')}
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {t('language_landing_page_sign_in_button')}
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="px-6 text-gray-900 bg-white">
                    {t('language_landing_page_continue_with')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Strava href="/auth/log/strava" />
                  <Google href="/auth/log/google"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex-1 hidden w-0 lg:block">
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1609605988071-0d1cfd25044e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Login;
