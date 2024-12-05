import React from 'react'
import ContactForm from '../components/ContactForm'

import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'

const Contact = () => {
  return (
    <>
        <Seo
            title="Contact Us - The Kindness Institute"
            description="Contact us to find out more information."
            url={window.location.href}
        />
        <PageHeader title='Contact Us'  image_url="/headers-bg-image/contact.jpg"/>
        <ContactForm/>
    </>
  )
}

export default Contact
