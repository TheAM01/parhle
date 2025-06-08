export default function Preference({title, description, defaultChecked=false}) {
    return (
        <div className="items-center w-full justify-between">
            <div className="flex-col">
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-gray-dark">
                    {description}
                </div>
            </div>

            <label className="inline-flex items-center cursor-pointer z-1">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked={defaultChecked}/>
                <div
                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>

            </label>

        </div>
    )
}