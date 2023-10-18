
import { MinusIcon } from '@heroicons/react/20/solid'
import {useEffect, useState} from "react";
import Strava from "../../components/fields/Strava.tsx";
import { useTranslation} from "react-i18next";


interface IConnection {
    name: string;
    role: string;
    imageUrl: string;
}

const Connection = () => {

    const deleteStravaConnection = async () => {
        let response = await fetch('/api/user/strava-delete', {
            method: 'DELETE',
        });
        if(response.status == 204) {
            window.location.reload();
        }
    }

    const { t } = useTranslation();
 // const [ isConnected, setIsConnected ] = useState(false);
  const [ connections, setConnections  ] = useState<IConnection[]>([]);
  const getStravaInfo = async () => {
    const response = await fetch('/api/user/strava-info');
    if (response.status != 200) {
      return;
    }
    const data = await response.json();
    const date = data.connectedSince.split("T")[0].split("-");
    setConnections([
      {
        name: 'Strava',
        role: `${date[2]}/${date[1]}/${date[0]}`,
        imageUrl:
            'https://cdn.icon-icons.com/icons2/2108/PNG/512/strava_icon_130820.png',
      }
    ]);


  }
  useEffect(() => {
    getStravaInfo()
  }, []);

  return (
      <div className="">
        <div className="mt-6">
          {connections.length === 0 ? (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3">
                    <Strava href="/auth/strava/connect" title={t("language_profile_connections_connect_with_strava")}/>
                  </div>

          ) : (
              <ul role="list" className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {connections.map((person, personIdx) => (
                    <li key={personIdx}>
                      <button onClick={()=>deleteStravaConnection()}
                          type="button"
                          className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                <span className="flex min-w-0 flex-1 items-center space-x-3">
                  <span className="block flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                  </span>
                  <span className="block min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-gray-900">{person.name}</span>
                    <span className="block truncate text-sm font-medium text-gray-500">{`${t("language_profile_connections_connected_with_strava_since")}${person.role}`}</span>
                  </span>
                </span>
                        <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                  <MinusIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                </span>
                      </button>
                    </li>
                ))}
              </ul>
          )}
        </div>
      </div>
  );

}

export default Connection
