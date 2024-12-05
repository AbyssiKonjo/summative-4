import React from 'react'
import DonationForm from '../components/DonationForm'

import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'

const Donations = () => {
  return (
    <>
        <Seo
            title="Donate - The Kindness Institute"
            description="Donate Now to support The Kindness Institute."
            url={window.location.href}
        />
        <PageHeader title='Donate Now'  image_url="/headers-bg-image/donate.jpg"/>
        <DonationForm/>
    </>
  )
}

export default Donations
