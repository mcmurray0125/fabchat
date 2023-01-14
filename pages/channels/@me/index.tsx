import { collection, query, where } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { InviteServer } from "../../../components/home/InviteServer";
import PageLayout from "../../../components/Layout/PageLayout";
import { selectUser } from "../../../redux/user/userSlice";
import { db } from "../../../serverless/firebase";
import { redirectToLogin } from "../../../utils/functions";

function index() {
    const user = useSelector(selectUser);
    const router = useRouter();
    useEffect(() => {
        if (!user.email) {
            redirectToLogin(router);
        }
    }, [user]);

    const [invites] = useCollection(
        query(collection(db, "invites"), where("emailId", "==", user.email))
    );
    return (
        <PageLayout>
            <div className="bg-grape-hoverBackground h-full w-full">
                <Head>
                    <title>Fabchat</title>
                </Head>
                <div className="p-4 text-fabchat-text">
                    <h1 className="my-4 text-2xl font-bold text-grape-subtext uppercase">Invitations</h1>
                    {invites?.docs?.length ? (
                        invites?.docs?.map((doc) => <InviteServer doc={doc} key={doc.id} />)
                    ) : (
                        <p>
                            You have no inivitation from any server, Join a
                            community NOW!
                        </p>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}

export default index;
