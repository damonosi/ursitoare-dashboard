import React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import "../styles/globals.css";
import Spinner from "./../components/spinner/Spinner";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {" "}
      {Component.Auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}
function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <Spinner />;
  }
  return children;
}
export default MyApp;
