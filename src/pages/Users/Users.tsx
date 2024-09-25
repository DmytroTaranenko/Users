import { useState } from "react";
import css from "./Users.module.css";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import Modal from "react-modal";
import { Field, Form, Formik } from "formik";

const customStyles = {
  content: {
    width: "720px",
    height: "444px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    border: "1px solid #000",
    padding: "40px 60px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const INITIAL_VALUES = {};

const ProfileValidationSchema = {};

const Users = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log("Елемент видалено");
    // Тут можна додати логіку видалення рядка
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <h1 className={css.usersTitle}>USERS</h1>
        <p className={css.paragraph}>
          Please add at least 3 departmetns to be able to proceed next steps.
        </p>
        <div className={css.wrapper}>
          <ul className={css.selectList}>
            <li>
              <select className={css.select} name="departments">
                <option value="Select departament">Select departament</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Development">Development</option>
              </select>
            </li>
            <li>
              <select className={css.select} name="country">
                <option value="Select country">Select country</option>
                <option value="United States">United States</option>
                <option value="Ukraine">Ukraine</option>
                <option value="Poland">Poland</option>
              </select>
            </li>
            <li>
              <select className={css.select} name="status">
                <option value="Select active">Select active</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </li>
            <li>
              <button className={css.deleteBtn}>Delete</button>
            </li>
          </ul>
          <button className={css.addUserBtn} type="button" onClick={openModal}>
            Add User
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Andrey Olishchuck</TableCell>
                <TableCell>Digital marketing</TableCell>
                <TableCell>Ukraine</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={handleDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 className={css.addUserTitle}>ADD USER</h2>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={(values, actions) => {}}
          validationSchema={ProfileValidationSchema}
        >
          <Form>
            <div className={css.formGroup}>
              <label>
                <span className={css.span}>Full Name</span>
                <Field
                  className={css.userInput}
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                />
              </label>
              <label>
                <span className={css.span}>Departament</span>
                <select className={css.selectField} name="depatrament">
                  <option value="Select departament">Select departament</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Development">Development</option>
                </select>
              </label>
            </div>

            <div className={css.formGroup}>
              <label>
                <span className={css.span}>Country</span>
                <select className={css.selectField} name="country">
                  <option value="Select country">Select country</option>
                  <option value="United States">United States</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="Poland">Poland</option>
                </select>
              </label>
              <label>
                <span className={css.span}>Status</span>
                <select className={css.selectField} name="status">
                  <option value="Select active">Select active</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>

            <div className={css.wrapBtn}>
              <button
                className={css.cancelBtn}
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button className={css.addBtn} type="submit">
                Add
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default Users;
