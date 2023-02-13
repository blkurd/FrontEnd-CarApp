// CreateCar needs to render a form
// that form should build a car object in state
// the form should make an axios post request when submitted
// we should send an alert upon success or failure
// on success: component should redirect our user to the new car show page
// on failure: component should send the message and remain visible
import { useState } from 'react'
import { createCar } from '../../api/car'
import { createCarSuccess, createCarFailure } from '../shared/AutoDismissAlert/messages'
import CarForm from '../shared/CarForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateCar = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [car, setCar] = useState({
        name: '',
        model: '',
        year: '',
        for_sale: false
    })

    const onChange = (e) => {
        e.persist()
        
        setCar(prevCar => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            console.log('this is the input type', e.target.type)

            // to handle a number, we look at the type, and parse a string to an integer
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedCar = {
                [updatedName] : updatedCar
            }
            
            console.log('the car', updatedCar)

            return {
                ...prevCar, ...updatedCar
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createCar(user, car)
            // first we'll nav to the show page
            .then(res => { navigate(`/cars/${res.data.car.id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createCarSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createCarFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <CarForm 
            car={car}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new car!"
        />
    )
}

export default CreateCar