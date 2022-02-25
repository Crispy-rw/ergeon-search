import { setupServer, SetupServerApi } from "msw/node";
import { handlers } from "./handlers";

// Setup requests interception using the given handlers.
export const server: SetupServerApi = setupServer(...handlers);
