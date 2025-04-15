import { PLASMIC } from "@/plasmic-init";
import { auth } from "@/auth";
import { PlasmicClientRootProvider } from "@/plasmic-init-client";
import { PlasmicComponent } from "@plasmicapp/loader-nextjs";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { protectedRouteBase } from "@/config";

interface Params {
  /**
   * Array of path segments (e.g. `["a", "b"]` for "/a/b", or `undefined` if path is empty (i.e. "/").
   *
   * Note we use `undefined` instead of an empty array `[]` because
   * Next.js would convert the empty array to `undefined` (not sure why they do that).
   */
  catchall: string[] | undefined;
}

export default async function PlasmicLoaderPage({
  params,
  searchParams,
}: {
  params?: Params;
  searchParams?: Record<string, string | string[]>;
}) {
  const session = await auth();
  const componentData = await fetchComponentData(params?.catchall);
  if (!componentData) {
    notFound();
  }

  if (componentData.entryCompMetas.length === 0) {
    notFound();
  }

  const pageMeta = componentData.entryCompMetas[0];
  return (
    <SessionProvider session={session}>
      <PlasmicClientRootProvider
        prefetchedData={componentData}
        pageParams={pageMeta.params}
        pageQuery={searchParams}
      >
        <PlasmicComponent component={pageMeta.displayName} />
      </PlasmicClientRootProvider>
    </SessionProvider>
  );
}

async function fetchComponentData(catchall: string[] | undefined) {
  const plasmicPath = catchall
    ? `${protectedRouteBase}/${catchall.join("/")}`
    : protectedRouteBase;
  const prefetchedData = await PLASMIC.maybeFetchComponentData(plasmicPath);
  if (!prefetchedData) {
    notFound();
  }

  return prefetchedData;
}
