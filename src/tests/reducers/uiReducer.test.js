import { uiReducer } from "../../reducers/uiReducer";
import { uiOpenModal, uiCloseModal } from "../../actions/ui";

const initState = {
  modalOpen: false,
};

describe("Pruebas en uiReducer", () => {
  test("debe de retornar el estado por defecto", () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test("debe de abrir y cerrar el modal", () => {
    //llamamos la accion open modal
    const modalOpen = uiOpenModal();

    //mandamos la accion al state
    const state = uiReducer(initState, modalOpen);

    // se espera uqe una vez enviado el open modal cambien el valor de modalOpen a true
    // se simula el cambio del state
    expect(state).toEqual({ modalOpen: true });

    // Se hace mo mismo pero queremos simular que se cierra la venta mediante
    // el cambio del state con la accion cel close modal
    const modalClose = uiCloseModal();
    const stateClose = uiReducer(state, modalClose);
    expect(stateClose).toEqual({ modalOpen: false });
  });
});
