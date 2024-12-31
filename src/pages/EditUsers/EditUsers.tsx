import { Field, Form, Formik } from 'formik'
import css from './EditUsers.module.css'
import * as Yup from 'yup'
import { countryOptions, departamentOptions, Option, statusOptions } from '../../utils/options'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { newStyles } from '../../utils/selectStyles'
import { useDispatch } from 'react-redux'
import { selectEditingUser } from '../../redux/Users/usersReducer'
import { useAppSelector } from '../../hooks'

const INITIAL_VALUES = {
    id: '',
    fullName: '',
    department: '',
    country: '',
    status: '',
}

const ProfileValidationSchema = Yup.object().shape({})

const EditUsers = () => {
    const dispatch = useDispatch()
    const users = useAppSelector((state) => state.users.users)
    const selectedEditingUserId = useAppSelector((state) => state.users.editingUserId)

    const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null)
    const [selectedCountry, setSelectedCountry] = useState<Option | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<Option | null>(null)


    const onSelectEditingUser = (option: Option | null) => {
        if (!option) return
        const user = option.value as any
        dispatch(selectEditingUser(user.id))
    }

    
    useEffect(() => {
        const selectedUser = users.find((user) => user.id === selectedEditingUserId)
        const departmentOption = departamentOptions.find((opt) => opt.value === selectedUser?.departament) || null
        setSelectedDepartment(departmentOption)

        const countryOption = countryOptions.find((opt) => opt.value === selectedUser?.country) || null
        setSelectedCountry(countryOption)

        const statusOption = statusOptions.find((opt) => opt.value === selectedUser?.status) || null
        setSelectedStatus(statusOption)
        // setSelectedDepartment(selectedUser?.departament)
        // setSelectedCountry(selectedUser?.country)
        // setSelectedStatus(selectedUser?.status)
    }, [selectedEditingUserId, selectedDepartment, selectedCountry, selectedStatus,])

    const onUpdateUser = () => {}
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
                        <Select
                            onChange={(option) => onSelectEditingUser(option as Option | null)}
                            options={users.map((user) => ({ label: user.fullName, value: user }))}
                            className="react-select-container"
                            classNamePrefix={css.reactSelect}
                            styles={newStyles}
                        />
                    </label>
                    <h2 className={css.userInformationTitle}>User Information</h2>

                    <div className={css.formWrap}>
                        <div className={css.formGroup}>
                            <label>
                                <span className={css.span}>Full Name</span>
                                <Field className={css.userInput} type="text" name="fullName" placeholder="" />
                            </label>

                            <label>
                                <span className={css.span}>Department</span>
                                <Select
                                    onChange={(option) => setSelectedDepartment(option as Option | null)}
                                    value={selectedDepartment}
                                    options={departamentOptions}
                                    className="react-select-container"
                                    classNamePrefix={css.reactSelect}
                                    styles={newStyles}
                                />
                            </label>
                        </div>
                        <div className={css.formGroup}>
                            <label>
                                <span className={css.span}>Country</span>
                                <Select
                                    onChange={(option) => setSelectedCountry(option as Option | null)}
                                    value={selectedCountry}
                                    options={countryOptions}
                                    className="react-select-container"
                                    classNamePrefix={css.reactSelect}
                                    styles={newStyles}
                                />
                            </label>

                            <label>
                                <span className={css.span}>Status</span>
                                <Select
                                    onChange={(option) => setSelectedStatus(option as Option | null)}
                                    value={selectedStatus}
                                    options={statusOptions}
                                    className="react-select-container"
                                    classNamePrefix={css.reactSelect}
                                    styles={newStyles}
                                />
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
    )
}

export default EditUsers
