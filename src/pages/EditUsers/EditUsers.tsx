import { Field, Form, Formik } from "formik";
import css from "./EditUsers.module.css";
import * as Yup from "yup";

const INITIAL_VALUES = {};

const ProfileValidationSchema = Yup.object().shape({});

const EditUsers = () => {


  const handleChange = () => {};

  return (
    <div className={css.container}>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, actions) => {}}
        validationSchema={ProfileValidationSchema}
      >
        <Form className={css.form}>
          <h2 className={css.titleEditUsers}>EDIT USERS </h2>

          <label>
            <span className={css.span}>User</span>
            <select
              className={css.selectField}
              name="user"
              value=""
              onChange={handleChange}
            >
              <option value="">Oleg Schevchenko</option>
            </select>
          </label>
          <h2 className={css.userInformationTitle}>User Information</h2>

          <div className={css.formWrap}>
            <div className={css.formGroup}>
              <label>
                <span className={css.span}>Full Name</span>
                <Field
                  className={css.userInput}
                  type="text"
                  name="fullName"
                  placeholder=""
                />
              </label>

              <label>
                <span className={css.span}>Department</span>
                <select
                  className={css.selectField}
                  name="department"
                  onChange={handleChange}
                >
                  <option  value="disabled">Select departament</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Development">Development</option>
                </select>
              </label>
            </div>
            <div className={css.formGroup}>
              <label>
                <span className={css.span}>Country</span>
                <select
                  className={css.selectField}
                  name="country"
                  onChange={handleChange}
                >
                  <option value="Select country">Select country</option>
                  <option value="United States">United States</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="Poland">Poland</option>
                </select>
              </label>

              <label>
                <span className={css.span}>Status</span>
                <select
                  className={css.selectField}
                  name="status"
                  onChange={handleChange}
                >
                  <option value="Select active">Select active</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>
          </div>

          <div className={css.wrapBtn}>
            <button className={css.undoBtn} type="submit">
              Undo
            </button>
            <button className={css.saveBtn} type="submit">
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditUsers;
