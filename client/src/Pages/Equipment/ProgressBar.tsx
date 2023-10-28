interface ProgressBarProps {
    maxDistance: number;
    currentDistance: number;
}

const ProgressBar = ({ maxDistance, currentDistance } : ProgressBarProps) => {
    // Berechnung der Position des schwarzen Strichs in Prozent
    const markerPosition = Math.min((currentDistance / maxDistance) * 100, 100);

    return (
        <div className="relative pt-1 sm:w-full sm:mt-2 mt-0">
            <div className="flex mb-2 items-center sm:justify-between">
                <div>
          <span className="hidden text-xs font-semibold sm:inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
            Distanz
          </span>
                </div>
                <div className="text-right">
          <span className="text-xs font-semibold inline-block text-teal-600">
            {currentDistance}/{maxDistance}
          </span>
                </div>
            </div>
            <div className="overflow-hidden sm:block hidden h-2 mb-4 text-xs flex rounded bg-gradient-to-r from-green-400 via-yellow-500 to-red-500 relative w-full">
                <div style={{ left: `${markerPosition}%` }} className="absolute h-full w-1 bg-black"></div>
            </div>
        </div>
    );
};

export default ProgressBar;
