import bicycle from '../assets/bicycle.png';

interface LoadingSpinnerProps {
    width: number,
    height: number,
}

const LoadingSpinner = ({ width, height} : LoadingSpinnerProps) => {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className={`w-${width} h-${height} border-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin`}>
            {/* Hier kannst du dein PNG-Bild einfügen */}
            <img src={bicycle} alt="Ladebild" /> 
          </div>
        </div>
      );
    };
export default LoadingSpinner;