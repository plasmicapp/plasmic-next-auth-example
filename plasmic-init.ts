import { initPlasmicLoader } from "@plasmicapp/loader-nextjs/react-server-conditional";
import * as NextNavigation from "next/navigation";

export const PLASMIC = initPlasmicLoader({
  nextNavigation: NextNavigation,
  projects: [
    {
      id: "21yfH8a5FQ3G5YYAEZCSx",
      token:
        "bjRLboW5FpRUElrTHddRVH2XxFcckluvWqsa86akwL22M8VDEpEXP9V23fWKPVNCfkOZkjCXC0CFsxqyUyQ7g",
    },
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
});
