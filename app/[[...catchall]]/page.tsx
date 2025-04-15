import { PLASMIC } from "@/plasmic-init";
import { PlasmicClientRootProvider } from "@/plasmic-init-client";
import { PlasmicComponent } from "@plasmicapp/loader-nextjs";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { protectedRouteBase } from "@/config";

export const revalidate = 300;

interface Params {
  catchall: string[] | undefined;
}

export default async function PlasmicLoaderPage({
  params,
  searchParams,
}: {
  params?: Params;
  searchParams?: Record<string, string | string[]>;
}) {
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
    <SessionProvider>
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

  return { prefetchedData };
}

export async function generateStaticParams(): Promise<Params[]> {
  const pageModules = await PLASMIC.fetchPages();
  return pageModules
    .filter(
      (mod) =>
        mod.path !== protectedRouteBase &&
        !mod.path.startsWith(`${protectedRouteBase}/`),
    )
    .map((mod) => {
      const catchall =
        mod.path === "/" ? undefined : mod.path.substring(1).split("/");
      return {
        catchall,
      };
    });
}
