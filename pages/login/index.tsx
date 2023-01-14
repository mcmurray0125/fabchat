import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { auth, provider } from "../../serverless/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Head from "next/head";

function Login() {
    const signIn = () => {
        signInWithPopup(auth, provider);
    };

    const [user] = useAuthState(auth);

    const router = useRouter();

    useEffect(() => {
        if (user) router.push("/app");
        return () => {};
    }, [user]);

    return (
        <div className="h-screen w-screen bg-grape-background grid place-items-center">
            <Head>
                <title>Fabchat</title>
            </Head>
            <div className="h-[40%] w-[40%] rounded-xl bg-grape-hoverPrimary p-4 flex flex-col items-center justify-evenly">
                <div>
                    <h1 className="text-4xl text-center font-serif text-fabchat-text">
                        Welcome to Fabchat
                    </h1>
                    <h2 className="text-center text-white font-mono">
                        We are so excited to see you!
                    </h2>
                </div>
                <div className="w-full flex justify-center">
                    <button
                        onClick={signIn}
                        className="mx-auto bg-grape-primary hover:bg-grape-hoverBackground rounded-full px-12 py-4 text-white font-extrabold"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
