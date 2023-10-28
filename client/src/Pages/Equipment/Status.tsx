

interface PartStatusProps {
    active: boolean;
}

const PartStatus= ({ active } : PartStatusProps ) => {
    return (
        <div className={`flex ml-2 mr-2 w-20 items-center justify-center rounded-xl sm:p-2 p-0 sm:mb-0 mb-1 ${active ? 'bg-green-300' : 'bg-red-300'}`}>
            <span className="font-light">{active ? 'Aktiv' : 'Inaktiv'}</span>
        </div>
    );
};

export default PartStatus;