import { DataProvider, GlobalActionsProvider } from "@plasmicapp/loader-nextjs";
import { signIn, signOut, useSession } from "next-auth/react";

import React from "react";

export function UserSession({
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const session = useSession();
  const isLoaded = session?.status !== "loading";

  const logout = async (redirectTo = "/login") => {
    await signOut();
    window.location.pathname = redirectTo;
  };

  const login = async (provider = "google", redirectTo = "/") => {
    signIn(provider, { callbackUrl: redirectTo });
  };

  const actions = React.useMemo(
    () => ({
      logout,
      login,
    }),
    [],
  );

  return (
    <GlobalActionsProvider contextName="UserSession" actions={actions}>
      <DataProvider name="auth" data={session || {}}>
        {/* This condition is placed in here to make sure that we don't see a flash of content for unauthenticated user
         when user session is still loading. 
         It prevents the page from being render on the server side!
         If you need the SSR capabilities - remove the isLoaded condition, and consider using Codegen*/}
        {isLoaded && children}
      </DataProvider>
    </GlobalActionsProvider>
  );
}
