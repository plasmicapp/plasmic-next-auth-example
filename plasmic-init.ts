import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { UserSession } from "./components/CodeComponents/GlobalContexts/UserSession";

const plasmicProjectId = process.env.PLASMIC_PROJECT_ID ?? "";
const plasmicApiToken = process.env.PLASMIC_TOKEN ?? "";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: plasmicProjectId,
      token: plasmicApiToken,
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
