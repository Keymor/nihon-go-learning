export default function Loading() {
    return (
        <div className="z-10 flex size-full absolute top-0 left-0">
            <div className="flex bg-gray-100/60 size-full animate-[logoUp_0.3s_forwards]">
                <div className="animate-[homeCards_1s_forwards] mx-auto m-auto">
                    <div className="loader scale-150"></div>
                </div>
            </div>
        </div>
    )
}