import bicycle from "../assets/bicycle.png";

interface LoadingSpinnerProps {
  width: number;
  height: number;
}

const LoadingSpinner = ({ width, height }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center h-screen p-10">
      <div
        className={`md:w-[${width/2}px] w-[${width/4}px] h-[${
          height/4
        }px] md:h-[${height/2}px] border-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin`}
      >
        {/* Hier kannst du dein PNG-Bild einfügen */}
        <img src={bicycle} alt="Ladebild" />
      </div>
    </div>
  );
};
export default LoadingSpinner;
