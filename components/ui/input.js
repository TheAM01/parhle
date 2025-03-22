export default function Input({type, placeholder, value, onChange, icon, required=false}) {
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