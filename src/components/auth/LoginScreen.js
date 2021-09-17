import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import "./login.css";
import { startLogin, startRegister } from "../../actions/auth";
import { showError } from "../../actions/ui";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "",
    lPassword: "",
  });
  const { lEmail, lPassword } = formLoginValues;

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: "",
    rEmail: "",
    rPassword1: "",
    rPassword2: "",
  });
  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();

    if (isFormValidLogin()) {
      dispatch(startLogin(lEmail, lPassword));
    }
  };

  const isFormValidLogin = () => {
    let msgErrorForm = "Validaciones superadas...";
    let valid = true;

    if (!validator.isEmail(lEmail) && valid) {
      msgErrorForm = "mail is not valid";
      valid = false;
    }

    if (lPassword.trim().length === 0 && valid) {
      msgErrorForm = "Password is required";
      valid = false;
    }

    if (!valid) {
      dispatch(showError(msgErrorForm));
    }

    return valid;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValidRegister()) {
      dispatch(startRegister(rEmail, rPassword1, rName));
    }
  };

  const isFormValidRegister = () => {
    let msgErrorForm = "Validaciones superadas...";
    let valid = true;

    if (rName.trim().length === 0 && valid) {
      msgErrorForm = "Name is required";
      valid = false;
    }

    if (!validator.isEmail(rEmail) && valid) {
      msgErrorForm = "mail is not valid";
      valid = false;
    }

    if (rPassword1.trim().length === 0 && valid) {
      msgErrorForm = "Password is required";
      valid = false;
    }

    if (rPassword1 !== rPassword2 && valid) {
      msgErrorForm = "passwords must be the same";
      valid = false;
    }

    if (!valid) {
      dispatch(showError(msgErrorForm));
    }
    return valid;
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="email@email.com"
                name="lEmail"
                autoComplete="off"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                autoComplete="off"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="email@email.com"
                autoComplete="off"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="rPassword1"
                value={rPassword1}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirmar Password"
                name="rPassword2"
                value={rPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
