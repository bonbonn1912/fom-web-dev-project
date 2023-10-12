import LoginWithButton, {
  GoogleButtonProps,
  StravaButtonProps,
} from "../Button/LoginWithButton";
import { MdDirectionsBike } from "react-icons/md";
import InputField, {
  userNameProps,
  passwordProps,
  emailProps,
} from "../Input/InputField";
import SubmitButton from "../Button/SubmitButton";
import { useState } from "react";

const LoginForm = () => {
  const [mode, setMode] = useState(true);
  const handleMode = () => {
    setMode(!mode);
  };

  return (
    <div id="LoginFormWrapper" className="w-[500px] h-full py-5 bg-slate-200 rounded-xl">
      <div className="flex justify-center">
        <MdDirectionsBike size={90} />
      </div>
      <div className="flex justify-center w-full text-5xl font-bold font-baloo">
        {mode ? "Log In" : "Sign Up"}
      </div>
      <div className="flex justify-center w-full mt-2 font-bold font-baloo text-l">
        {mode ? "Don't have an account ?" : "Already have an account ?"}
        <button className="text-orange-600" onClick={handleMode}>
          &nbsp; {mode ? "Sign Up" : "Log In"}
        </button>
      </div>
      <div className="pl-5 pr-5 mt-2">
        {" "}
        <LoginWithButton props={GoogleButtonProps} />
      </div>
      <div className="pl-5 pr-5 mt-2">
        <LoginWithButton props={StravaButtonProps} />
      </div>
      <div className="pl-5 pr-5">
        <div className="flex justify-between trennline">
          <hr className="w-1/4 h-px bg-gray-200 border-0 md:w-1/5 my-9 lg:w-1/5 dark:bg-gray-700"></hr>
          <span className="flex items-center">
            {!mode ? "Sign Up with Email" : "Log In with Email"}{" "}
          </span>
          <hr className="w-1/4 h-px bg-gray-200 border-0 md:w-1/5 my-9 lg:w-1/4 dark:bg-gray-700"></hr>
        </div>
        <div>
          <InputField props={emailProps} />
        </div>

        {mode ? (
          ""
        ) : (
          <div className="mt-3">
            <InputField props={userNameProps} />
          </div>
        )}
        <div className="mt-3">
          <InputField props={passwordProps} />
        </div>
        <div className="mt-5">
          <SubmitButton />
        </div>
        {!mode ? (
          ""
        ) : (
          <div className="flex justify-center w-full mt-2 font-bold font-baloo text-l">
            Forgot your password ?{"  "}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
