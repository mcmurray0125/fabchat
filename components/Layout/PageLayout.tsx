import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import ChannelBar from "../common/ChannelBar";
import FriendsBar from "../common/FriendsBar";
import ServerBar from "../common/ServerBar";

function PageLayout({ children }: { children: ReactNode }) {
    const [server, setServer] = useState("");
    const router = useRouter()
    useEffect(() => {
        if (!router.isReady) return;
        // codes using router.query
        setServer(router.query["server"] as string);
    }, [router.isReady]);
    return (
        <div className="h-screen w-screen overflow-hidden flex-col">
            <div className="h-[10%] w-full">
                <ServerBar />
            </div>
            <div className="h-[30%] w-full">
                {server ? <ChannelBar /> : <FriendsBar />}
            </div>
            <div className="h-full w-full">{children}</div>
        </div>
    );
}

export default PageLayout;
