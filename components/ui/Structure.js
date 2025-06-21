import {FileText, User} from "lucide-react";

export const DashboardScrollable = ({children}) => {
    return (
        <div className="w-full h-screen overflow-y-scroll">{children}</div>
    )
}

export const DashboardWorkspace = ({extraClasses, children}) => {
    return <div className={`flex-col w-full max-w-screen-xl p-4 lg:p-10 mx-auto ${extraClasses}`}>{children}</div>
}

export const DashboardWorkspaceBlock = ({extraClasses, children}) => {
    return <div className={`w-full bg-gray-900 border border-gray-800 p-6 flex-col ${extraClasses}`}>{children}</div>
}

export const PageTitle = ({heading, description}) => {
    return (
        <div className="mb-6 gap-1 flex-col">
            <div className="text-4xl font-bold">{heading}</div>
            <div className="text-sm text-gray-dark">{description}</div>
        </div>
    )
}

export const DashboardParent = ({children}) => {
    return <div className="w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-mosaic">{children}</div>
}

export const DashboardHeading = ({children}) => {
    return <div className="text-2xl mb-1 font-bold gap-2">{children}</div>
}

export const ExpandableTextInputGroup = ({title, isRequired=true, name, value, onChange, placeholder, readonly=false}) => {
    return (
        <div className="flex-col flex-1">
            <div className="font-light gap-1">{title} {isRequired && <div className="text-red-500">*</div>}</div>
            <input
                readOnly={readonly}
                name={name}
                className={` ${readonly ? "bg-gray-700 text-gray-medium" : "bg-gray-800 text-white" }  text-sm flex-1 flex border-gray-700 border  placeholder-gray-medium p-2 outline-0`}
                type={"text"}
                value={value}
                onChange={onChange}
                required={isRequired}
                placeholder={placeholder}
            />
        </div>
    )
}

export const ExpandableSelectInputGroup = ({title, isRequired=true, name, defaultValue, onChange, options}) => {
    return (
        <div className="flex-col flex-1">
            <div className="font-light gap-1">{title} {isRequired && <div className="text-red-500">*</div>}</div>
            <select
                name={name}
                className={" text-sm flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2"}
                // value={value}
                required={true}
                onChange={onChange}
                defaultValue={defaultValue}
            >
                <option value={""}>Please select {title}</option>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>{o.name}</option>
                ))}
            </select>
        </div>
    )
}

export const ExpandableTextAreaGroup = ({title, name, value, onChange, isRequired=true, placeholder}) => {
    return (
        <div className="flex-col flex-1">
            <div className="font-light gap-1">{title} {isRequired && <div className="text-red-500">*</div>}</div>
            <textarea
                name={name}
                className={"flex-1 flex border-gray-700 border bg-gray-800 text-white placeholder-gray-medium p-2 text-sm"}
                value={value}
                onChange={onChange}
                required={isRequired}
                rows={7}
                placeholder={placeholder}
            />
        </div>
    )
}

export const SmallIconTextButton = ({Icon, text, onClick, extraClasses}) => {
    return <button onClick={onClick} className={`gap-1 text-sm bg-white text-gray-dark items-center w-min text-nowrap flex p-2 font-semibold duration-200 cursor-pointer hover:text-black ${extraClasses} `}>
        {Icon && <Icon size={15} className={"flex items-center"}/>}
        {text}
    </button>
}

export default function ContentGuidelines({ title, lines }) {
    return (
        <div className="mb-4 flex-col">
            <div>{title}</div>
            {lines.map((line, index) => (
                <li key={index} className="text-gray-medium">{line}</li>
            ))}
        </div>
    );
}

export const DashboardStatsBlock = ({title, count, Icon}) => {
    return (
        <div className="bg-gray-900 border border-gray-800 p-5 flex-1">
            <div className="justify-between items-center w-full">
                <div className="flex-col gap-2">
                    <div className="text-sm text-gray-dark">{title}</div>
                    <div className="text-4xl font-bold">{count}</div>
                </div>
                <Icon className={"bg-gray-700 rounded-full p-2"} size={40}/>
            </div>
        </div>
    )
}