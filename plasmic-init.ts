import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { UserSession } from "./components/CodeComponents/GlobalContexts/UserSession";

export const PLASMIC = initPlasmicLoader({
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

PLASMIC.registerGlobalContext(UserSession, {
  name: "UserSession",
  providesData: true,
  props: {},
  globalActions: {
    login: {
      parameters: [
        {
          name: "provider",
          type: {
            type: "choice",
            options: ["google"],
          },
        },
        {
          name: "redirectTo",
          type: "string",
        },
      ],
    },
    logout: {
      parameters: [
        {
          name: "redirectTo",
          type: "string",
        },
      ],
    },
  },
});
