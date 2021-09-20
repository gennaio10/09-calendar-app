import { types } from "../../types/types";

describe("Pruebas en Types", () => {
  test("los types deben de ser iguales", () => {
    expect(types).toEqual({
      uiOpenModal: "[UI] Open modal",
      uiCloseModal: "[UI] Close modal",

      eventLogout: "[Event] Event Logout",
      eventSetActive: "[Event] Set active",
      eventstartAddNew: "[Event] start add new",
      eventAddNew: "[Event] Add new",
      eventClearActiveEvent: "[Event] Clear active event",
      eventUpdated: "[Event] Updated",
      eventDeleted: "[Event] Deleted",
      eventLoaded: "[Event] Event loaded",

      authCheckingFinish: "[Auth] Finish Checking login state",
      authStartLogin: "[Auth] Start Login",
      authLogin: "[Auth] Login",
      authStartRegister: "[Auth] Start Register",
      authStartTokenRenew: "[Auth] Start Token Renew",
      authLogout: "[Auth] Logout",
    });
  });
});
