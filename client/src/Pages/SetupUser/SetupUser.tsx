import {useState, ChangeEvent} from "react";
import defaultProfileIcon from "../../assets/defaultProfileIcon.png";

const SetupUser = () => {
    const [disabled, setDisabled] = useState(true)
    const [selectedImage, setSelectedImage] = useState(defaultProfileIcon);
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        gender: "",
        firstName: "",
        lastName: "",
        age: "",
        weight: "",
        ftp: "",
        restingHeartRate: "",
        maxHeartRate: "",
    });

    const validateInputs = () => {
        let firstNameValid = formData.firstName !== "" && formData.firstName.length > 3;
        let lastNameValid = formData.lastName !== "" && formData.lastName.length > 3;
        let ageValid = formData.age !== "" && parseInt(formData.age) > 0 && parseInt(formData.age) < 100;
        let weightValid = formData.weight !== "" && parseInt(formData.weight) > 0 && parseInt(formData.weight) < 300;
        let ftpValid = formData.ftp !== "" && parseInt(formData.ftp) > 0 && parseInt(formData.ftp) < 500;
        let restingHeartRateValid = formData.restingHeartRate !== "" && parseInt(formData.restingHeartRate) > 20 && parseInt(formData.restingHeartRate) < 100;
        let maxHeartRateValid = formData.maxHeartRate !== "" && parseInt(formData.maxHeartRate) > 130 && parseInt(formData.maxHeartRate) < 220;
        let fileValid = file !== null;

        if (firstNameValid && lastNameValid && ageValid && weightValid && ftpValid && restingHeartRateValid && maxHeartRateValid && fileValid) {
            setDisabled(false);
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file && file.size <= 1024 * 1024) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setFile(file);
                    setSelectedImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {

            event.target.value = '';
            alert('Die Datei muss kleiner als 1 MB sein.');
        }
    };

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({...prevState, [name]: value}));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = new FormData();
        if (file) {
            data.append('profilePicture', file);
        }
        for (const [key, value] of Object.entries(formData)) {
            data.append(key, value);
        }
        let response = await fetch("/api/account/setup", {
            method: "POST",
            body: data,

        });
        if (response.status == 201) {
            window.location.href = "/dashboard";
        } else {
            window.location.href = "/logout";
        }

    };
//TODO Add switch to use default profile picture
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-md">
                <div className="mb-6">
                    <h2 className="mb-2 text-lg font-semibold">Willkommen!</h2>
                    <p>Wir benötigen noch ein paar Informationen von Ihnen.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center mb-4">
                        <img
                            src={selectedImage}
                            alt="User Avatar"
                            className="w-20 h-20 mr-4 rounded-full"
                        />
                        <div>
                            <div className="mb-2 text-sm text-gray-600">
                                <input
                                    onBlur={validateInputs}
                                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-50 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-blue-600 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-blue-500 dark:file:text-neutral-100 dark:focus:border-primary"
                                    type="file"
                                    name="profilePicture"
                                    id="formFile" accept="image/png, image/jpeg" onChange={handleFileChange}
                                />
                            </div>
                            <div className="text-sm text-gray-400">JPG or PNG. 1MB max.</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* ------ */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-600">
                                Vorname
                            </label>
                            <input
                                onBlur={validateInputs}
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-gray-600">
                                Nachname
                            </label>
                            <input
                                onBlur={validateInputs}
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-semibold text-gray-600">
                            Geschlecht
                        </label>
                        <select
                            onBlur={validateInputs}
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">Bitte auswählen</option>
                            <option value="male">Männlich</option>
                            <option value="female">Weiblich</option>
                            <option value="other">Anderes</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-600">
                                Alter
                            </label>
                            <input
                                onBlur={validateInputs}
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-600">
                                Gewicht
                            </label>
                            <input
                                onBlur={validateInputs}
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-gray-600">
                                FTP in Watt
                            </label>
                            <input
                                onBlur={validateInputs}
                                type="number"
                                name="ftp"
                                value={formData.ftp}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-600">
                                Ruheherzfrequenz
                            </label>
                            <input
                                onBlur={validateInputs}
                                type="number"
                                name="restingHeartRate"
                                value={formData.restingHeartRate}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold text-gray-600">
                                Max. Herzfrequenz
                            </label>
                            <input
                                onBlur={validateInputs}
                                type="number"
                                name="maxHeartRate"
                                value={formData.maxHeartRate}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={disabled}
                        className={`w-full p-2 text-white ${disabled ? "bg-blue-500 opacity-40" : "bg-blue-500 hover:bg-blue-600"}  rounded-md`}
                    >
                        Weiter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetupUser;
