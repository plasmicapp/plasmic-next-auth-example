import { PLASMIC } from "@/plasmic-init";
import { auth } from "@/auth";
import { PlasmicClientRootProvider } from "@/plasmic-init-client";
import { PlasmicComponent } from "@plasmicapp/loader-nextjs";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";

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
  const staticProps = await fetchData(params?.catchall);
  if (!staticProps) {
    notFound();
  }

  const { prefetchedData } = staticProps;
  if (prefetchedData.entryCompMetas.length === 0) {
    notFound();
  }

  const pageMeta = prefetchedData.entryCompMetas[0];
  return (
    <SessionProvider session={session}>
      <PlasmicClientRootProvider
        prefetchedData={prefetchedData}
        pageParams={pageMeta.params}
        pageQuery={searchParams}
      >
        <PlasmicComponent component={pageMeta.displayName} />
      </PlasmicClientRootProvider>
    </SessionProvider>
  );
}

async function fetchData(catchall: string[] | undefined) {
  const plasmicPath = catchall ? `/${catchall.join("/")}` : "/";
  const prefetchedData = await PLASMIC.maybeFetchComponentData(plasmicPath);
  if (!prefetchedData) {
    notFound();
  }

  // Prefetching query data is no longer required, because React Server Components does that for us now!
  const prefetchedQueryData = undefined;

  return { prefetchedData, prefetchedQueryData };
}

export async function generateStaticParams(): Promise<Params[]> {
  const pageModules = await PLASMIC.fetchPages();
  return pageModules.map((mod) => {
    const catchall =
      mod.path === "/" ? undefined : mod.path.substring(1).split("/");
    return {
      catchall,
    };
  });
}
