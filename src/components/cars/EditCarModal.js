// this modal is rendered by ShowCar
// The state that controls whether this is open or not live in ShowCar
// the state and the updaterfunction associated with that state is passed here as a prop.
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CarForm from '../shared/CarForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditCarModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updateCar, msgAlert, triggerRefresh } = props

    const [car, setCar] = useState(props.car)

    const onChange = (e) => {
        e.persist()
        
        setCar(prevCar => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedCar = {
                [updatedName] : updatedValue
            }
            
            console.log('the car', updatedCar)

            return {
                ...prevCar, ...updatedCar
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateCar(user, car)
            // first we'll handle closing the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateCarSuccess,
                    variant: 'success'
                })
            })
            // if everything goes according to plan, we need a refresh of the show page.
            // we'll build a function in the ShowCar component that does this for us, and we'll import that here as a prop
            // this triggers a refresh of the parent(ShowCar) by changing the value of the updated piece of state which lives in useEffect's dependency array.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateCarFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CarForm 
                    car={car} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update Car"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCarModal