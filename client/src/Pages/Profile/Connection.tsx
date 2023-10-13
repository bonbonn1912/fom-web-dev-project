
import { MinusIcon } from '@heroicons/react/20/solid'


const connections = [
  {
    name: 'Strava',
    role: 'since 12/10/2023',
    imageUrl:
      'https://cdn.icon-icons.com/icons2/2108/PNG/512/strava_icon_130820.png',
  }
]

const Connection = () => {
  return (
    <div className="">
      <div className="mt-6">
        <ul role="list" className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {connections.map((person, personIdx) => (
            <li key={personIdx}>
              <button
                type="button"
                className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="flex min-w-0 flex-1 items-center space-x-3">
                  <span className="block flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                  </span>
                  <span className="block min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-gray-900">{person.name}</span>
                    <span className="block truncate text-sm font-medium text-gray-500">{person.role}</span>
                  </span>
                </span>
                <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                  <MinusIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Connection
