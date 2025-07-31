import React from 'react'
import CompanyRegistrationForm from '../component/CompanyForm'
import CheckoutButton from '../component/CheckoutButton'

const RegisterCompany = () => {
    return (
        <div className='w-full'>
            <CompanyRegistrationForm />
            <CheckoutButton/>

        </div>
    )
}

export default RegisterCompany
