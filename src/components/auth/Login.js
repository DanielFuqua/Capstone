import React, { useRef, useState } from "react";
import "./Login.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Register from "./Register";

const Login = (props) => {
  const username = useRef();
  const password = useRef();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const existingUserCheck = () => {
    return fetch(
      `http://localhost:8088/users?username=${username.current.value}`
    )
      .then((_) => _.json())
      .then((user) => {
        if (user.length) {
          return user[0];
        }
        return false;
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    existingUserCheck().then((exists) => {
      if (exists && exists.password === password.current.value) {
        localStorage.setItem("pal_id", exists.id);
        props.toggle();
      } else if (exists && exists.password !== password.current.value) {
        window.alert("Password does not match");
      } else if (!exists) {
        window.alert("User account does not exist");
      }
    });
  };

  return (
    <>
      <main className="container--login">
        <form className="form--login" onSubmit={handleLogin}>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="inputUsername"> Username </label>
            <input
              ref={username}
              type="username"
              id="username"
              className="form-control"
              placeholder="Username"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input
              ref={password}
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </fieldset>
          <fieldset>
            <button type="submit">Sign in</button>
          </fieldset>
          <fieldset>
            <div className="fakeLink href" onClick={toggleModal}>
              Register an Account
            </div>
          </fieldset>
        </form>
      </main>

      <Modal isOpen={modal} toggleModal={toggleModal}>
        <ModalHeader toggleModal={toggleModal}>Get Registered</ModalHeader>
        <ModalBody>
          <Register toggle={props.toggle} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Login;
