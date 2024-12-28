import { Field, Form, Formik } from 'formik'
import css from './EditUsers.module.css'
import * as Yup from 'yup'
import { countryOptions, departamentOptions, Option, statusOptions } from '../../utils/options'
import { useState } from 'react'
import Select from 'react-select'
import { createSelectStyles } from '../../utils/selectStyles'
import { useDispatch, useSelector } from 'react-redux'
import { selectEditingUser } from '../../redux/Users/usersReducer'
import { User } from '../../types/user'
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
    console.log('selectEditingUser: ', selectedEditingUserId)

    const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null)
    const [selectedCountry, setSelectedCountry] = useState<Option | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<Option | null>(null)


    const onSelectEditingUser = (option: Option | null) => {
        if (!option) return
        const user = option.value as any
        console.log(user)
        dispatch(selectEditingUser(user.id))
    }

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
                            styles={createSelectStyles()}
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
                                    styles={createSelectStyles()}
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
                                    styles={createSelectStyles()}
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
                                    styles={createSelectStyles()}
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
