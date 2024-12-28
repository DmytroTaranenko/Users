import { useEffect, useState } from 'react'
import css from './Users.module.css'
import DeleteIcon from '../../assets/images/deleteIcon.svg?react'
// import DeleteIcon from "@mui/icons-material/Delete";
import Select from 'react-select'
import { IconButton } from '@mui/material'
import { TableVirtuoso } from 'react-virtuoso'
import Modal from 'react-modal'
import { User } from '../../types/user'
import AddUserModal from '../../components/AddUserModal/AddUserModal'
import { useSearchParams } from 'react-router-dom'
import { countryOptions, departamentOptions, statusOptions } from '../../utils/options'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, deleteUser } from '../../redux/Users/usersReducer'

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

Modal.setAppElement('#root')

const Users = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    // const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null)
    // const [selectedCountry, setSelectedCountry] = useState<Option | null>(null)
    // const [selectedStatus, setSelectedStatus] = useState<Option | null>(null)
    // const [data, setData] = useState<Contact[]>(() => {
    //     const storedData = localStorage.getItem('UserData')
    //     return storedData ? JSON.parse(storedData) : INITIAL_DATA
    // })

    const dispatch = useDispatch()
    const users = useSelector((state: any) => state.users.users)

    const [params, setParams] = useSearchParams()

    const selectedDepartment = params.get('selectedDepartment') ?? null
    const selectedCountry = params.get('selectedCountry') ?? null
    const selectedStatus = params.get('selectedStatus') ?? null

    // useEffect(() => {
    //     localStorage.setItem('UserData', JSON.stringify(data))
    // }, [])

    const onAddUserModalOpen = () => {
        setModalIsOpen(true)
    }

    const onAddUserModalClose = () => {
        setModalIsOpen(false)
    }

    const onAddUser = (newUser: any) => {
        dispatch(addUser(newUser))
    }

    const onDeleteUser = (id: any) => {
        dispatch(deleteUser(id))
    }

    const onReset = () => {
        setParams({})
    }

    const filteredDataByDepartment = users.filter((item: any) => {
        if (selectedDepartment === null) return true
        return item.departament === selectedDepartment
    })

    const filteredDataByDepartmentAndCountry = filteredDataByDepartment.filter((item: any) => {
        if (selectedCountry === null) return true
        return item.country === selectedCountry
    })

    const filteredDataByDepartmentAndCountryAndStatus = filteredDataByDepartmentAndCountry.filter((item: any) => {
        if (selectedStatus === null) return true
        return item.status === selectedStatus
    })

    const selectStyles = {
        control: (base: any) => ({
            ...base,
            border: '1px solid transpa',
            minWidth: '210px',
            height: '28px',
            boxShadow: 'none',
            borderRadius: '8px',
            backgroundColor: '#f0f1f7',
            transition: 'all .3s',
            '&:hover': {
                border: '1px solid #8e90a7',
            },
            '&:focus': {
                backgroundColor: 'transparent',
            },
        }),
        placeholder: (base: any) => ({
            ...base,
            color: '#333',
            fontSize: 14,
            paddingLeft: 15,
        }),
        singleValue: (base: any) => ({
            ...base,
            color: '#15171a',
            fontSize: 14,
            paddingLeft: 15,
            fontWeight: 600,
        }),
        indicatorSeparator: (base: any) => ({
            ...base,
            display: 'none',
        }),
        option: (base: any, { isSelected }: any) => ({
            ...base,
            fontWeight: 500,
            color: isSelected ? '#f44242' : '#15171a',
            backgroundColor: isSelected ? 'transparent' : 'transparent',
        }),
        menu: (base: any) => ({
            ...base,
            // boxShadow: '0 4px 80px 0 rgba(53, 56, 64, 0.25)',
            borderRadius: '0 16px 16px 16px',
            border: 'none',
            zIndex: 10,
        }),
        input: (base: any) => ({
            ...base,
            color: '#15171a',
            // paddingLeft: 15,
            fontSize: 14,
            paddingLeft: 15,
        }),
    }

    return (
        <div className={css.container}>
            <div className={css.wrap}>
                <h1 className={css.usersTitle}>USERS</h1>
                <p className={css.paragraph}>Please add at least 3 departmetns to be able to proceed next steps.</p>
                <div className={css.wrapper}>
                    <ul className={css.selectList}>
                        <li className={css.selectItem}>
                            <Select
                                onChange={(option) =>
                                    setParams((prevParams) => {
                                        const newParams = new URLSearchParams(prevParams) // Створюємо новий екземпляр
                                        newParams.set('selectedDepartment', option?.value || '') // Оновлюємо параметр
                                        return newParams
                                    })
                                }
                                value={
                                    selectedDepartment ? { value: selectedDepartment, label: selectedDepartment } : null
                                }
                                options={departamentOptions}
                                className="react-select-container"
                                classNamePrefix={css.reactSelect}
                                styles={selectStyles}
                                placeholder="Select departments"
                            />
                        </li>
                        <li>
                            <Select
                                onChange={(option) =>
                                    setParams((prevParams) => {
                                        const newParams = new URLSearchParams(prevParams) // Створюємо новий екземпляр
                                        newParams.set('selectedCountry', option?.value || '') // Оновлюємо параметр
                                        return newParams
                                    })
                                }
                                value={selectedCountry ? { value: selectedCountry, label: selectedCountry } : null}
                                options={countryOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                styles={selectStyles}
                                placeholder="Select country"
                            />
                        </li>
                        <li>
                            <Select
                                onChange={(option) =>
                                    setParams((prevParams) => {
                                        const newParams = new URLSearchParams(prevParams) // Створюємо новий екземпляр
                                        newParams.set('selectedStatus', option?.value || '') // Оновлюємо параметр
                                        return newParams
                                    })
                                }
                                value={selectedStatus ? { value: selectedStatus, label: selectedStatus } : null}
                                options={statusOptions}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                styles={selectStyles}
                                placeholder="All status"
                            />
                        </li>
                        <li>
                            <button onClick={onReset} className={css.deleteBtn}>
                                <DeleteIcon />
                            </button>
                        </li>
                    </ul>
                    <button className={css.addUserBtn} type="button" onClick={onAddUserModalOpen}>
                        Add User
                    </button>
                    <AddUserModal modalIsOpen={modalIsOpen} closeModal={onAddUserModalClose} onSubmit={onAddUser} />
                </div>
                <TableVirtuoso
                    data={filteredDataByDepartmentAndCountryAndStatus}
                    components={{
                        Table: (props) => (
                            <table
                                {...props}
                                style={{ borderCollapse: 'collapse', width: '100%', zIndex: '2' }}
                                className="custom-table"
                            />
                        ),
                        TableRow: (props) => <tr {...props} />,
                    }}
                    itemContent={(_, row) => (
                        <>
                            <td>{row.fullName}</td>
                            <td>{row.departament}</td>
                            <td>{row.country}</td>
                            <td>{row.status}</td>
                            <td>
                                <IconButton aria-label="delete" color="error" onClick={() => onDeleteUser(row.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </td>
                        </>
                    )}
                    fixedHeaderContent={() => (
                        <tr>
                            <th>Full Name</th>
                            <th>departament</th>
                            <th>Country</th>
                            <th>Status</th>
                        </tr>
                    )}
                />
            </div>
        </div>
    )
}

export default Users
