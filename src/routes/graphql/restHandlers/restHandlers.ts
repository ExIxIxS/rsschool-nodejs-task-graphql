import { memberHandlers } from "./memberHandlers.js";
import { postHandlers } from "./postHandlers.js";
import { profileHandlers } from "./profileHandlers.js";
import { userHandlers } from "./userHandlers.js";

function getAllRestHandlers() {
  return {
    ...memberHandlers,
    ...postHandlers,
    ...profileHandlers,
    ...userHandlers,
  }
}

export { getAllRestHandlers };
