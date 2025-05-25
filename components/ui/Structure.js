export const DashboardScrollable = ({children}) => {
    return (
        <div className="w-full h-screen overflow-y-scroll">{children}</div>
    )
}

export const DashboardWorkspace = ({extraClasses, children}) => {
    return <div className={`flex-col w-full md:w-4/5 lg:w-3/5 p-4 lg:p-10 mx-auto ${extraClasses}`}>{children}</div>
}

export const PageTitle = ({heading, description}) => {
    return (
        <div className="mb-6 gap-1 flex-col">
            <div className="text-4xl font-bold">{heading}</div>
            <div className="text-sm text-gray-dark">{description}</div>
        </div>
    )
}