import Modal from 'react-modal'
import { User } from '../../types/user'
import css from './AddUserModal.module.css'
import { useFormik } from 'formik'
import { nanoid } from 'nanoid'
import * as Yup from 'yup'
import { createSelectStyles, newStyles } from '../../utils/selectStyles'
import Select from 'react-select'
import { SelectOption } from '../../types/shareTypes'
import { createPortal } from 'react-dom'

type Props = {
    modalIsOpen: boolean
    closeModal: () => void
    onSubmit: (user: User) => void
}

type FormValues = {
    fullName: string
    departament: null | SelectOption
    country: null | SelectOption
    status: null | SelectOption
}

const INITIAL_VALUES: FormValues = {
    fullName: '',
    departament: null,
    country: null,
    status: null,
}

const ProfileValidationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    departament: Yup.object().shape({ value: Yup.string(), label: Yup.string() }).required('Departament is required'),
    country: Yup.object().shape({ value: Yup.string(), label: Yup.string() }).required('Country is required'),
    status: Yup.object().shape({ value: Yup.string(), label: Yup.string() }).required('Status is required'),
})

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
        zIndex: 9999999,
    },
}

const AddUserModal = ({ modalIsOpen, closeModal, onSubmit }: Props) => {
    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema: ProfileValidationSchema,
        onSubmit: ({ departament, country, status, fullName }, actions) => {
            if (departament === null || country === null || status === null) return

            const newUser: User = {
                id: nanoid(),
                fullName: fullName,
                departament: departament.value,
                country: country.value,
                status: status.value,
            }

            onSubmit(newUser)

            actions.resetForm()
            closeModal()
        },
    })

    return createPortal(
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} overlayClassName={css.overlay}>
            <h2 className={css.addUserTitle}>ADD USER</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className={css.formGroup}>
                    <label className={css.label}>
                        <span className={css.span}>Full Name</span>
                        <input
                            className={css.userInput}
                            type="text"
                            name="fullName"
                            placeholder="Enter full name"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.fullName && formik.errors.fullName ? <p>{formik.errors.fullName}</p> : null}
                    </label>
                    <label className={css.label}>
                        <span className={css.span}>Departament</span>
                        <Select
                            options={departamentOptions}
                            name="departament"
                            styles={newStyles}
                            value={formik.values.departament}
                            onChange={(option) => formik.setFieldValue('departament', option)}
                            onBlur={formik.handleBlur}
                            placeholder="Select department"
                        />
                        {formik.touched.departament && formik.errors.departament ? (
                            <p>{formik.errors.departament}</p>
                        ) : null}
                    </label>
                    <label className={css.label}>
                        <span className={css.span}>Country</span>
                        <Select
                            options={countryOptions}
                            name="country"
                            styles={createSelectStyles()}
                            value={formik.values.country}
                            onChange={(option) => formik.setFieldValue('country', option)}
                            onBlur={formik.handleBlur}
                            placeholder="Select country"
                        />
                        {formik.touched.country && formik.errors.country ? <p>{formik.errors.country}</p> : null}
                    </label>
                    <label className={css.label}>
                        <span className={css.span}>Status</span>
                        <Select
                            options={statusOptions}
                            name="status"
                            styles={createSelectStyles()}
                            value={formik.values.status}
                            onChange={(option) => formik.setFieldValue('status', option)}
                            onBlur={formik.handleBlur}
                            placeholder="Select status"
                        />
                        {formik.touched.status && formik.errors.status ? <p>{formik.errors.status}</p> : null}
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
            </form>
        </Modal>,
        document.getElementById('reactPortal')!
    )
}

export default AddUserModal
