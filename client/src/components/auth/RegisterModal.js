import React, { useState, useEffect } from "react";
import {
  Alert,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../../redux/sagas/sagaActions";

const RegisterModal = () => {
  const [modal, setModal] = useState(false);
  const [form, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [localMsg, setLocalMsg] = useState("");
  const dispatch = useDispatch();
  const { errorMsg } = useSelector((state) => state.auth);

  const handleToggle = () => {
    dispatch({ type: sagaActions.CLEAR_ERROR_REQUEST });
    //dispatch(clearErrorRequest());
    setModal(!modal);
  };

  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.error(e);
    }
  }, [errorMsg]);

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = form;
    const user = { name, email, password };
    console.log(user);
    dispatch({ type: sagaActions.REGISTER_REQUEST, payload: user });
  };

  return (
    <div>
      <NavLink onClick={handleToggle} href="#" className="p-1">
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Register</ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onChange}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;
