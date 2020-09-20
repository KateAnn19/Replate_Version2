import React from 'react'
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import '../styles/App.css'

const PickupCard = ({ pickupList }) => {
  const history = useHistory()
  // alert the user that their choice was accepted
  const successMessage = () => alert('Successfully assigned to profile')

  return (
    <div className='pickup-list-container' >

      {pickupList.map(item => {
        return (
          <div key={item['pickup-id']}>

            <section className='pickup-list-card' >
              {/* product being picked up */}
              <h1 className='pickup-list-heading'>{item['type']}</h1>

              {/* date, name, address, and phone number of food source */}
              <p className='pickup-list-details'>
                <span id='amount'>{item['amount']}</span>
                <span id='date'>{item['pickup-date'].slice(0, 10)}</span>
                <span id='name'>{item['business-name']}</span>
                <span id='address'>{item['business-address']}</span>
                <span id='phone'>{item['business-phone']}</span>
              </p>

              <Button
                variant='outlined'
                color='default'
                aria-label='text default button group'
                onClick={() =>
                  axiosWithAuth()
                    .put(`pickups/assign/${item["pickup-id"]}`, {
                      "volunteer-id": "assign",
                    })
                    .then((res) => {
                      // add a successfully assigned to profile message
                      successMessage()
                      history.push("/volunteer-profile")
                    })
                    .catch((err) => console.log(err.response))
                }>
                Accept pickup
              </Button>
            </section>
          </div>
        )
      })}
    </div>
  )
}


export default PickupCard