interface StravaProps {
  href: string;
}


const Strava = ({href}: StravaProps) =>{
    return (
      <a
        href={href}
        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#fc4c01] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
      >
        <svg className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Strava"
          role="img"
          viewBox="0 0 512 512"
        >
          <rect width="512" height="512" rx="15%" fill="#fc4c01" />
          <path fill="#ffffff" d="M120 288L232 56l112 232h-72l-40-96-40 96z" />
          <path fill="#fda580" d="M280 288l32 72 32-72h48l-80 168-80-168z" />
        </svg>
        <span className="text-sm font-semibold leading-6">Strava</span>
      </a>
    );
  }

  export default Strava;
  