import { useState, useEffect} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import FTPperKG from "./Charts/FTPperKG.tsx";
import { convertTimestampsToChartLabels} from "../../helper/time.ts";
import ProgressChart from "./Charts/ProgressChart.tsx";
import { sumValues} from "../../helper/sumValues.tsx";
import MySummary from "./Summary.tsx";
import {FaWeightScale} from "react-icons/fa6";
import {ImPowerCord} from "react-icons/im";
import {FaHeartbeat} from "react-icons/fa";
import {GiHeartBeats} from "react-icons/gi";
import { authenticate} from "../Auth/authContext.tsx";

const HomeScreen = () =>{
    const [isLoading, setIsLoading] = useState(true);
    const [ftpPerKG, setFtpPerKG] = useState<number[]>([0]);
    const [ftpPerKGLabels, setFtpPerKGLabels] = useState<string[]>([""]);
    const [ftpProgress, setFtpProgress] = useState<number[]>([0]);
    const [weightProgress, setWeightProgress] = useState<number[]>([0]);
    const [restingHeartRateProgress, setRestingHeartRateProgress] = useState<number[]>([0]);
    const [maxHeartRateProgress, setMaxHeartRateProgress] = useState<number[]>([0]);
    const [gender, setGender] = useState<"male" | "female" | "other">("male")
    const [totalTime, setTotalTime] = useState<number>(0);
    const [totalCalories, setTotalCalories] = useState<number>(0);
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [ftp, setFtp] = useState<number>(0);
    const [restingHeartRate, setRestingHeartRate] = useState<number>(0);
    const [maxHeartRate, setMaxHeartRate] = useState<number>(0);
    useEffect(() => {
        authenticate().then(() => {
            getExtendedUserInfo()
        })
    }, []);

    const getExtendedUserInfo = async () => {
        const res = await fetch("/api/user/dashboard/extended")
        if(!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        const ftpPerKG = data.ftpProgress.slice(-10).map((value: number) =>parseFloat((value/data.weight).toFixed(2)))
        setFtpPerKG(ftpPerKG)
        setFtpPerKGLabels(convertTimestampsToChartLabels(data.ftpProgressDate.slice(-10)));
        setGender(data.gender)
        setRestingHeartRateProgress(data.restingHeartRateProgress.slice(-10))
        setMaxHeartRateProgress(data.maxHeartRateProgress.slice(-10))
        setWeightProgress(data.weightProgress.slice(-10))
        setFtpProgress(data.ftpProgress.slice(-10));
        const {totalTime, totalCalories, totalDistance} = sumValues(data.activityDictionary);
        setTotalTime(totalTime)
        setTotalCalories(totalCalories)
        setTotalDistance(totalDistance)
        setIsLoading(false)
        setFtp(data.ftp)
        setWeight(data.weight)
        setRestingHeartRate(data.restingHeartRate)
        setMaxHeartRate(data.maxHeartRate)
    }


    if(isLoading) return(<LoadingSpinner callFrom={"HomeScreen"} width={500} height={500}/>)

    return(
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-3 col-span-full h-fit"><MySummary totalDistance={totalDistance} totalCalories={totalCalories} totalTime={totalTime}/></div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300 col-span-full"/>
            <div className="md:col-span-3 col-span-full h-fit mt-5">
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <dl className="grid grid-cols-3 gap-x-10 text-center lg:grid-cols-4 items-center">
                            <div key={1} className="mx-auto flex max-w-xs flex-col gap-y-4 md:col-span-1 col-span-full">
                                <dt className="text-base leading-7 text-gray-600">FTP</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    <div className="flex items-center">
                                        {<ImPowerCord size={35}/>} <div className="ml-2">{ftp} watts</div>
                                    </div>
                                </dd>
                            </div>
                            <div className="w-full h-[350px] md:col-span-2 col-span-full">
                                <FTPperKG gender={gender} labels={ftpPerKGLabels} values={ftpPerKG}/>
                            </div>
                            <div className="w-full h-[350px] md:col-span-1 col-span-full">
                                <ProgressChart values={ftpProgress} labels={ftpPerKGLabels} title={"Your FTP Progress"} color={'rgb(255,0,0)'}/>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300 col-span-full"/>
            <div className="md:col-span-3 col-span-full h-fit mt-5">
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <dl className="grid grid-cols-3 gap-x-10 text-center lg:grid-cols-4 items-center">
                            <div key={1} className="mx-auto flex max-w-xs flex-col gap-y-2 md:col-span-1 col-span-full">
                                <dt className="text-base leading-7 text-gray-600">Weight</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    <div className="flex items-center">
                                        {<FaWeightScale size={35}/>} <div className="ml-2">{weight} kg</div>
                                    </div>

                                </dd>
                            </div>
                            <div className="w-full h-[350px] md:col-span-2 col-span-full">
                                <ProgressChart values={weightProgress} labels={ftpPerKGLabels} title={"Your Weight Progress"} color={'rbga(255,255,255)'}/>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300 col-span-full"/>
            <div className="md:col-span-3 col-span-full h-fit mt-5">
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <dl className="grid grid-cols-3 gap-x-10 text-center lg:grid-cols-4 items-center">
                            <div key={1} className="mx-auto flex max-w-xs flex-col gap-y-4 md:col-span-1 col-span-full">
                                <dt className="text-base leading-7 text-gray-600">Resting Heart Rate</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    <div className="flex items-center">
                                        {<FaHeartbeat size={35}/>} <div className="ml-2">{restingHeartRate} bpm</div>
                                    </div>
                                </dd>
                            </div>
                            <div className="w-full h-[350px] md:col-span-2 col-span-full">
                                <ProgressChart values={restingHeartRateProgress} labels={ftpPerKGLabels} title={"Your Resting Heart Rate Progress"} color={'rgba(0,0,255)'}/>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300 col-span-full"/>
            <div className="md:col-span-3 col-span-full h-fit mt-5">
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <dl className="grid grid-cols-3 gap-x-10 text-center lg:grid-cols-4 items-center">
                            <div key={1} className="mx-auto flex max-w-xs flex-col gap-y-4 md:col-span-1 col-span-full">
                                <dt className="text-base leading-7 text-gray-600">Max Heart Rate</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    <div className="flex items-center">
                                        {<GiHeartBeats size={35}/>} <div className="ml-2">{maxHeartRate} bpm</div>
                                    </div>
                                </dd>
                            </div>
                            <div className="w-full h-[350px] md:col-span-2 col-span-full">
                                <ProgressChart values={maxHeartRateProgress} labels={ftpPerKGLabels} title={"Your Max Heart Rate Progress"} color={'rgba(0,255,0)'}/>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300 col-span-full"/>
            <div className="md:col-span-1 col-span-full h-fit">
                <div className="w-full h-[350px] flex justify-center items-center bg-amber-50">
                    Material Placeholder
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;