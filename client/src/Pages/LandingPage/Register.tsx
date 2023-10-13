import bicycle from "../../assets/bicycle.png";
import Google from "../../components/fields/Google";
import Strava from "../../components/fields/Strava";
import { useState } from "react";
import { getRingColor } from "../../helper/getRingColor";
import { validateInput } from "../../helper/validate";
//import Modal from "./SuccessModal";
//TODO Validate Input (16)
//TODO Remeberme Functionality
const Register = () => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [usernameRingColorClass, setUsernameRingColorClass] = useState("ring-gray-300");
  const [mailRingColorClass, setMailRingColorClass] = useState("ring-gray-300");
  const handleInputBlur = async (e: any, key: string) => {
    e.preventDefault();
    const value = e.target.value;
    if(validateInput(e, key, username, mail)) return; 
    if (value === "") return;
    // check if new value is other then old value

    if (key === "mail") {
      setMail(value);
    }
    if (key === "username") {
      setUsername(value);
    }
    setTimeout(async () => {
      const res = await fetch("/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [key]: value }),
      });
      if (res.status === 204 && key === "username") {
        setUsernameRingColorClass(getRingColor(res.status));
      } else if (res.status === 204 && key === "mail") {
        setMailRingColorClass(getRingColor(res.status));
      } else if (res.status === 200 && key === "username") {
        setUsernameRingColorClass(getRingColor(res.status));
      } else if (res.status === 200 && key === "mail") {
        setMailRingColorClass(getRingColor(res.status));
      }
    }, 1);
  };
  return (
    <>
      <div className="flex flex-1 h-full">
        <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="w-full max-w-sm mx-auto lg:w-96">
            <div>
              <img className="w-auto h-14" src={bicycle} alt="Logo" />
              <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Register Your Account
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Already have an accout?{" "}
                <a
                  href="/"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Sign In
                </a>
              </p>
            </div>

            <div className="mt-6">
              <div>
                <form
                  action="/auth/register"
                  method="POST"
                  className="space-y-6"
                >
                  <div>
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Username
                      </label>
                      <div className="mt-2">
                        <input
                          onBlur={(e) => handleInputBlur(e, "username")}
                          id="username"
                          name="username"
                          type="text"
                          required
                          className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${usernameRingColorClass} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        onBlur={(e) => handleInputBlur(e, "mail")}
                        id="mail"
                        name="mail"
                        type="email"
                        autoComplete="email"
                        required
                        className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${mailRingColorClass} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
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

                  <div>
                    <button
                      type="submit"
                      className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Register
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
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Strava href="/auth/reg/strava" />
                  <Google href="/auth/reg/google" />
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
};

export default Register;
