export function ScreenSizeGetter() {
    return (
        <div className="bg-white p-2 uppercase text-black font-bold duration-300 h-min fixed! top-1 right-1 z-600">
            <div className="hidden! sm:hidden! md:hidden! lg:hidden! xl:hidden! 2xl:flex!">2XL (1344)</div>
            <div className="hidden! sm:hidden! md:hidden! lg:hidden! xl:flex! 2xl:hidden!">XL (1120)</div>
            <div className="hidden! sm:hidden! md:hidden! lg:flex! xl:hidden! 2xl:hidden!">LG (896)</div>
            <div className="hidden! sm:hidden! md:flex! lg:hidden! xl:hidden! 2xl:hidden!">MD (672)</div>
            <div className="hidden! sm:flex! md:hidden! lg:hidden! xl:hidden! 2xl:hidden!">SM (560)</div>
            <div className="flex! sm:hidden! md:hidden! lg:hidden! xl:hidden! 2xl:hidden!">MO</div>
        </div>
    )
}