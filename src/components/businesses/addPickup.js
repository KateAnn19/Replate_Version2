//this is a form that will allow the business to add a pickup to their profile when the business creates 
// a new pickup it will also display on the pickup list it will also display on the business profile

import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup, TextField } from '@material-ui/core';
import { axiosWithAuth } from '../../utils/axiosWithAuth';


let initialState = {
  "amount": '',
  "pickup-date": '',
  "type": ''
}


const AddPickup = () => {
  // Set the default values for the form
  const { register, errors, handleSubmit, reset } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      "amount": '',
      "pickup-date": '',
      "type": ''
    }
  })

  const { push } = useHistory();
  const [newPickup, setPickup] = useState(initialState);
  

  const handleChange = (e) => {
    setPickup({
        ...newPickup,
        [e.target.name]: e.target.value
    });
  };
  

  // register attaches our fields to the state by use of the 'ref' attribute of the field
  // Because I we are using Material UI, inputRef replaces the ref attribute when using
  // the useForm hook to manage the form

  // Create the callback for the handleSubmit function. The parameter (whatever I name it)
  // will contain all the form's data.
  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("pickups", newPickup)
      .then((res) => {
        console.log(res)
        push('/business-profile')
      })
      .catch((err) => console.log(err.response))

      // Clear the form
      console.log(register)
      //reset()
  }

  // Keep track of routing history
  let history = useHistory()
  
  // Go back to calling page
  const goBack = () => history.goBack()
  const typeErrMessage = 'Please describe what is to be picked up'
  const amountErrMessage = 'Please provide a quantity'

  return (
    <div>
      <h2>Add a Pickup</h2>

      <form onSubmit={onSubmit}>
        <TextField
          type='text'
          name='amount'
          label='Amount'
          onChange={handleChange}
          inputRef={register({ required: { amountErrMessage }, minLength: 2 })} 
          /><br />
        {errors.amount && <p>{errors.amount.message}</p>}

        <TextField
          type='text'
          name='pickup-date'
          label='Pickup date yyyy-mm-dd'
          onChange={handleChange}
          inputRef={register} /><br />

          <TextField
          type='text'
          name='type'
          label='Type of pickup'
          onChange={handleChange}
          inputRef={register({ required: { typeErrMessage }, minLength: 5 })} />
        <br />
        {errors.type && <p>{errors.type.message}</p>}
        <br /><br />

        <ButtonGroup
          variant='outlined'
          color='default'
          aria-label='text default button group'
        >
          {/* <Button onClick={
             e.preventDefault()
              axiosWithAuth()
              .post("pickups", newPickup)
              .then(response => {
                pickup = [{...response.data}]
                push('/business-profile')
              })
              .catch(err => {
                console.log(err)
              });
          }
          >Add Pickup</Button> */}
          <Button type="submit">Add Pickup</Button>
          <Button type='button' onClick={goBack}>Return To Profile</Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default AddPickup;
