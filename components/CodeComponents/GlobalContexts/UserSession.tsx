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
        {isLoaded && children}
      </DataProvider>
    </GlobalActionsProvider>
  );
}
