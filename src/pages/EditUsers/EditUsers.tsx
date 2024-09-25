import { Form, Formik } from "formik";
import css from "./EditUsers.module.css";

const EditUsers = () => {
  return (
    <div className={css.container}>
      <div className={css.editUsersBox}>
        <h2 className={css.titleEditUsers}>EDIT USERS </h2>
      </div>
      <Formik>
        <Form></Form>
      </Formik>
    </div>
  );
};

export default EditUsers;
