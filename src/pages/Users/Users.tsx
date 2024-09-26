import { useState } from 'react'
import css from './Users.module.css'
import DeleteIcon from '../../assets/images/deleteIcon.svg?react'

// import DeleteIcon from "@mui/icons-material/Delete";
import Select from 'react-select'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'

import { TableVirtuoso, Virtuoso } from 'react-virtuoso'

import Modal from 'react-modal'
import { Field, Form, Formik } from 'formik'

type Option = {
    value: string
    label: string
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

const INITIAL_VALUES = {}

const ProfileValidationSchema = {}

const Users = () => {
    const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null)
    const [selectedCountry, setSelectedCountry] = useState<Option | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<Option | null>(null)

    const [modalIsOpen, setIsOpen] = useState(false)
    const [data, setData] = useState(INITIAL_DATA)

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
        if (selectedDepartment === null) return true;
        return item.departament === selectedDepartment.value
    })

    const filteredDataByDepartmentAndCountry = filteredDataByDepartment.filter((item) => {
      if(selectedCountry === null) return true;
      return item.country === selectedCountry.value
    })

    const filteredDataByDepartmentAndCountryAndStatus = filteredDataByDepartmentAndCountry.filter((item) => {
      if(selectedStatus === null) return true;
      return item.status === selectedStatus.value
    })

    return (
        <div className={css.container}>
            <div className={css.wrap}>
                <h1 className={css.usersTitle}>USERS</h1>
                <p className={css.paragraph}>Please add at least 3 departmetns to be able to proceed next steps.</p>
                <div className={css.wrapper}>
                    <ul className={css.selectList}>
                        <li>
                            <Select
                                onChange={(option) => setSelectedDepartment(option)}
                                value={selectedDepartment}
                                options={departamentOptions}
                                className={css.select}
                            />
                        </li>
                        <li>
                            <Select
                                onChange={(option) => setSelectedCountry(option)}
                                value={selectedCountry}
                                options={countryOptions}
                                className={css.select}

                            />
                        </li>
                        <li>
                            <Select
                                onChange={(option) => setSelectedStatus(option)}
                                value={selectedStatus}
                                options={statusOptions}
                                className={css.selectField}

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
                            <th>Departament</th>
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
