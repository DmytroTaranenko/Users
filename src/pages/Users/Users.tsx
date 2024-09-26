import { useEffect, useState } from 'react'
import css from './Users.module.css'
import DeleteIcon from '../../assets/images/deleteIcon.svg?react'
import * as Yup from 'yup'
// import DeleteIcon from "@mui/icons-material/Delete";
import Select from 'react-select'
import { IconButton } from '@mui/material'
import { TableVirtuoso } from 'react-virtuoso'
import Modal from 'react-modal'
import { Field, Form, Formik } from 'formik'

type Option = {
    value: string
    label: string
}

type Contact ={
  id: number
  fullName: string
  departament: string
  country: string
  status: string
}

const departamentOptions = [
    { value: 'Digital Marketing', label: 'Digital Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Development', label: 'Development' },
]
const countryOptions = [
    { value: 'United States', label: 'United States' },
    { value: 'Ukraine', label: 'Ukraine' },
    { value: 'Poland', label: 'Poland' },
]
const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
]

const INITIAL_DATA = [
    {
        id: 1,
        fullName: 'John Doe',
        departament: 'Digital Marketing',
        country: 'Ukraine',
        status: 'Inactive',
    },
    {
        id: 2,
        fullName: 'Alla Doe',
        departament: 'Sales',
        country: 'Poland',
        status: 'Active',
    },
    {
        id: 3,
        fullName: 'Sophia Doe',
        departament: 'Development',
        country: 'USA',
        status: 'Active',
    },
    // Більше даних...
]

const customStyles = {
    content: {
        width: '720px',
        height: '444px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        border: '1px solid #000',
        padding: '40px 60px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#root')

const INITIAL_VALUES = {
    fullName: '',
    departament: '',
    country: '',
    status: '',
}

const ProfileValidationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    departament: Yup.string().required('Departament is required'),
    country: Yup.string().required('Country is required'),
    status: Yup.string().required('Status is required'),
})

const Users = () => {


    const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null)
    const [selectedCountry, setSelectedCountry] = useState<Option | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<Option | null>(null)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<Contact[]>(() => {
      const storedData = localStorage.getItem("UserData");
      return storedData ? JSON.parse(storedData) : INITIAL_DATA;
  });


  useEffect(() => {
    localStorage.setItem("UserData", JSON.stringify(data));
  }, [data]);

    const handleDelete = (id: number) => {
        setData(data.filter((item) => item.id !== id))
    }

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    const handleReset = () => {
        setSelectedDepartment(null)
        setSelectedCountry(null)
        setSelectedStatus(null)
    }

    const filteredDataByDepartment = data.filter((item) => {
        if (selectedDepartment === null) return true
        return item.departament === selectedDepartment.value
    })

    const filteredDataByDepartmentAndCountry = filteredDataByDepartment.filter((item) => {
        if (selectedCountry === null) return true
        return item.country === selectedCountry.value
    })

    const filteredDataByDepartmentAndCountryAndStatus = filteredDataByDepartmentAndCountry.filter((item) => {
        if (selectedStatus === null) return true
        return item.status === selectedStatus.value
    })

    return (
        <div className={css.container}>
            <div className={css.wrap}>
                <h1 className={css.usersTitle}>USERS</h1>
                <p className={css.paragraph}>Please add at least 3 departmetns to be able to proceed next steps.</p>
                <div className={css.wrapper}>
                    <ul className={css.selectList}>
                        <li className={css.selectItem}>
                            <Select
                                onChange={(option) => setSelectedDepartment(option)}
                                value={selectedDepartment}
                                options={departamentOptions}
                                className="react-select-container"
                                classNamePrefix={css.reactSelect}
                            />
                        </li>
                        <li>
                            <Select
                                onChange={(option) => setSelectedCountry(option)}
                                value={selectedCountry}
                                options={countryOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </li>
                        <li>
                            <Select
                                onChange={(option) => setSelectedStatus(option)}
                                value={selectedStatus}
                                options={statusOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </li>
                        <li>
                            <button onClick={handleReset} className={css.deleteBtn}>
                                <DeleteIcon />
                            </button>
                        </li>
                    </ul>
                    <button className={css.addUserBtn} type="button" onClick={openModal}>
                        Add User
                    </button>
                </div>
                <TableVirtuoso
                    data={filteredDataByDepartmentAndCountryAndStatus}
                    components={{
                        Table: (props) => <table {...props} style={{ borderCollapse: 'collapse', width: '100%' }} />,
                        TableRow: (props) => <tr {...props} />,
                    }}
                    itemContent={(index, row) => (
                        <>
                            <td>{row.id}</td>
                            <td>{row.fullName}</td>
                            <td>{row.departament}</td>
                            <td>{row.country}</td>
                            <td>{row.status}</td>
                            <td>
                                <IconButton aria-label="delete" color="error" onClick={() => handleDelete(row.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                        </>
                    )}
                    fixedHeaderContent={() => (
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>departament</th>
                            <th>Country</th>
                            <th>Status</th>
                        </tr>
                    )}
                />
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                <h2 className={css.addUserTitle}>ADD USER</h2>
                <Formik
                    initialValues={INITIAL_VALUES}
                    onSubmit={(values, actions) => {
                      const newUser: Contact = {
                          id: data.length + 1,
                          fullName: values.fullName,
                          departament: values.departament,
                          country: values.country,
                          status: values.status,
                      }

                      setData((prevData) => {
                        const updatedData = [...prevData, newUser];
                        localStorage.setItem("UserData", JSON.stringify(updatedData)); // Зберегти оновлені дані
                        return updatedData;
                    });

                      actions.resetForm()
                      closeModal()
                  }}
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
                                <Field as="select" className={css.selectField} name="departament">
                                    <option value="Select departament">Select departament</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Development">Development</option>
                                </Field>
                            </label>
                        </div>

                        <div className={css.formGroup}>
                            <label>
                                <span className={css.span}>Country</span>
                                <Field as="select" className={css.selectField} name="country">
                                    <option value="Select country">Select country</option>
                                    <option value="United States">United States</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="Poland">Poland</option>
                                </Field>
                            </label>
                            <label>
                                <span className={css.span}>Status</span>
                                <Field as="select" className={css.selectField} name="status">
                                    <option value="Select active">Select active</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </Field>
                            </label>
                        </div>

                        <div className={css.wrapBtn}>
                            <button className={css.cancelBtn} type="button" onClick={closeModal}>
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
    )
}

export default Users
