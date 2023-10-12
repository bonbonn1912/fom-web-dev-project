import LoginForm from "./LoginForm";

const LandingPage = () => {
  return (
    <div className="flex flex-col-reverse w-full md:h-screen md:flex md:flex-row md:justify-end md:items-center">
      <div id="leftWrapper" className="flex justify-center md:grow">
        <img
          className="w-[700px] h-[700px]"
          src="https://upload.wikimedia.org/wikipedia/commons/4/47/VU-Banana-1000x1000.png"
        />
      </div>
      <div
    id="rightWrapper"
    className="h-fit md:w-[500px] pl-2 pr-2 transition-all duration-300 ease-in-out lg:mr-24 lg:p-5 flex justify-center pt-3 md:pt-0"
  >
    <LoginForm />
  </div>
    </div>
  );
};

export default LandingPage;
