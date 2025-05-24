export function Input({type, placeholder, value, onChange, icon, required=false}) {
    return (
        <div className={"flex-1 border-border-color border bg-gray-900 text-white placeholder-gray-medium"}>
            <div className="p-2">
                {!!icon ? icon : ""}
            </div>
            <input
                required={required}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={"flex-1 flex p-2"}
            />
        </div>
    )

}

export function RadioGroup({ options, name, value, onChange, extraClasses }) {
    return (
        <div className={`${extraClasses} grid grid-cols-1 sm:grid-cols-3 gap-4`}>
            {options.map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                    <input
                        type="radio"
                        id={`${name}-${item.value}`}
                        name={name}
                        value={item.value}
                        checked={value === item.value}
                        onChange={onChange}
                        className="hidden peer"
                    />
                    <span className="w-4 h-4 mr-2 border-2 border-gray-500 rounded-full peer-checked:bg-white flex items-center justify-center">
                        <span className="w-2 h-2 bg-white rounded-full hidden peer-checked:block"></span>
                    </span>
                    <label htmlFor={`${name}-${item.value}`} className="cursor-pointer text-sm">
                        {item.name}
                    </label>
                </div>
            ))}
        </div>
    );
}
