import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";

import "@testing-library/jest-dom";

import { startLogin, startRegister, startChecking } from "../../actions/auth";
import { types } from "../../types/types";
import * as fetchModule from "../../helpers/fetch";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

let token = "";

describe("Pruebas en las acciones Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("startLogin correcto", async () => {
    await store.dispatch(startLogin("julian@julian.com", "123456"));

    //Validar que hay devuelto el objeto correcto
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    //validar haya almacenado el token en el localstorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );

    //validar haya almacenado la fecha de inicio del token en el localstorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    // Recuperar los argumentos con lo que fueran llamadas las funciones de jest
    // Ver que haya almacenado el token en la primera parte del storage
    // console.log(localStorage.setItem.mock.calls);
    // console.log(localStorage.setItem.mock.calls[0][1]);
    // token = localStorage.setItem.mock.calls[0][1];
  });

  test("startLogin incorrecto", async () => {
    //probar password incorrecto
    await store.dispatch(startLogin("julian@julian.com", "123456789"));
    let actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      text: "Usuario y/o password no son corectos",
      timer: 5000,
      timerProgressBar: true,
      title: "Error",
      toast: true,
    });

    //probar correo incorrecto
    await store.dispatch(startLogin("julian@pororo.com", "123456"));
    actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      text: "Usuario y/o password no son corectos",
      timer: 5000,
      timerProgressBar: true,
      title: "Error",
      toast: true,
    });
  });

  test("startRegister correcto", async () => {
    // MOCK que simula que el fetchSinToken sea exitoso siempre
    // Simula un login exitoso siempre
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "carlos",
          token: "ABC123ABC123",
        };
      },
    }));

    // ya que el login se simulo exitoso y retorno el usuario logeado debe
    // llamar el startRegister y cambiar el estado en el store de redux
    await store.dispatch(startRegister("test2@test.com", "123456", "test"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "carlos",
      },
    });

    // Se espera grabe el token en el localstorage con el token simulado en el MOCK
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC123ABC123");

    // Se espera grabe la fecha del token en el localstorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking correcto", async () => {
    // mock que simula que se reovo el token y devolcio el usuario
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "carlos",
          token: "ABC123ABC123",
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "carlos",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC123ABC123");
  });
});
