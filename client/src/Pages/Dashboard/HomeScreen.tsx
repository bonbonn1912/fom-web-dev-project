import { useState, useEffect} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import FTPperKG from "./Charts/FTPperKG.tsx";
import { convertTimestampsToChartLabels} from "../../helper/time.ts";
import ProgressChart from "./Charts/ProgressChart.tsx";

const HomeScreen = () =>{
    const [isLoading, setIsLoading] = useState(true);
    // @ts-ignore
    const [ftpPerKG, setFtpPerKG] = useState<number[]>([0]);
    const [ftpPerKGLabels, setFtpPerKGLabels] = useState<string[]>([""]);
    const [ftpProgress, setFtpProgress] = useState<number[]>([0]);
    const [weightProgress, setWeightProgress] = useState<number[]>([0]);
    const [restingHeartRateProgress, setRestingHeartRateProgress] = useState<number[]>([0]);
    const [maxHeartRateProgress, setMaxHeartRateProgress] = useState<number[]>([0]);
    const [gender, setGender] = useState<"male" | "female" | "other">("male")
    useEffect(() => {
        getExtendedUserInfo();
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
        console.log(ftpPerKG)

        setIsLoading(false)

    }


    if(isLoading) return(<LoadingSpinner width={500} height={500}/>)

    return(
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 col-span-full bg-amber-50 flex justify-center items-center h-[350px]">Summary Placeholder</div>
            <div className="md:col-span-1 col-span-full h-fit">
                <div className="w-full h-[350px]">
                    <FTPperKG gender={gender} labels={ftpPerKGLabels} values={ftpPerKG}/>
                </div>
            </div>
            <div className="md:col-span-1 col-span-full h-fit">
                <div className="w-full h-[350px]">
                    <ProgressChart values={weightProgress} labels={ftpPerKGLabels} title={"Your Weight Progress"} color={'rbga(255,255,255)'}/>
                </div>
            </div>
            <div className="md:col-span-1 col-span-full h-fit">
                <div className="w-full h-[350px]">
                    <ProgressChart values={restingHeartRateProgress} labels={ftpPerKGLabels} title={"Your Resting Heart Rate Progress"} color={'rgba(0,0,255)'}/>
                </div>
            </div>

            <div className="md:col-span-1 col-span-full h-fit">
                <div className="w-full h-[350px]">
                    <ProgressChart values={maxHeartRateProgress} labels={ftpPerKGLabels} title={"Your Max Heart Rate Progress"} color={'rgba(0,255,0)'}/>
                </div>
            </div>
            <div className="md:col-span-1 col-span-full h-fit">
                <div className="w-full h-[350px]">
                    <ProgressChart values={ftpProgress} labels={ftpPerKGLabels} title={"Your FTP Progress"} color={'rgb(255,0,0)'}/>
                </div>
            </div>
            <div className="md:col-span-1 col-span-full h-fit">
                <div className="w-full h-[350px] flex justify-center items-center bg-amber-50">
                    Material Placeholder
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;