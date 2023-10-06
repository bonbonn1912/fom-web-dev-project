import { FcGoogle } from "react-icons/fc";
import { LiaStrava } from "react-icons/lia";

const GoogleButtonProps: LoginWithButtonProps = {
    bg: "bg-blue-600",
    hoverBg: "hover:bg-blue-800",
    icon: "google",
    iconSize: 28,
    buttonWidth: "w-full",
    buttonHeight: "h-10",
    text: "Continue With Google",
    iconHeight: "h-9",
    iconWidth: "w-9",
}

const StravaButtonProps: LoginWithButtonProps = {
    bg: "bg-[#fc4c02]",
    hoverBg: "hover:bg-[#ff7032]",
    icon: "strava",
    iconSize: 28,
    buttonWidth: "w-full",
    buttonHeight: "h-10",
    text: "Continue With Strava",
    iconHeight: "h-9",
    iconWidth: "w-9",
}

interface LoginWithButtonProps {
  onClick?: () => void;
  bg: string;
  hoverBg: string;
  text: string;
  icon: string;
  iconSize: number;
  iconWidth: string;
  iconHeight: string;
  buttonWidth: string;
  buttonHeight: string;
}

interface props { 
    props: LoginWithButtonProps
}

const renderIcon = (iconName: string, iconSize: number) => {
  switch (iconName) {
    case "google":
      return <FcGoogle size={iconSize} />;
    case "strava":
      return <LiaStrava color="fc4c02" size={iconSize} />;
  }
};

const LoginWithButton = ({
    props
}: props) => {
  return (
    <button
      className={`flex items-center justify-center ${props.bg} ${props.hoverBg} text-white font-bold ${props.buttonWidth} ${props.buttonHeight} rounded-lg`}
    >
      <div
        className={`bg-white ml-0.5 rounded-l-md flex ${props.iconWidth} ${props.iconHeight} justify-center items-center`}
      >
        {renderIcon(props.icon, props.iconSize)}
      </div>
      <div className="flex-grow">
        <span className="mr-2 font-semibold">{props.text}</span>
      </div>
    </button>
  );
};
export {
    GoogleButtonProps,
    StravaButtonProps
}
export default LoginWithButton;
