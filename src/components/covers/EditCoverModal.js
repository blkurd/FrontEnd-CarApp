// this cover modal shows up on a ShowCover component
// has the ability to edit individual covers, one at a time
// will need to call the api,
// send a message,
// refresh the parent.
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CoverForm from '../shared/CoverForm'
import { updateCover } from '../../api/covers'
// import messages from '../shared/AutoDismissAlert/messages'

const EditCoverModal = (props) => {
    const { user, car, show, handleClose, msgAlert, triggerRefresh } = props

    const [cover, setCover] = useState(props.cover)

    const onChange = (e) => {
        e.persist()
        
        setCover(prevCover => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'isGoodForSnow' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isGoodForSnow' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedCover = {
                [updatedName] : updatedValue
            }
            
            console.log('the cover', updatedCover)
            console.log('the cover (state)', cover)

            return {
                ...prevCover, ...updatedCover
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateCover(user, car.id, cover)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! The cover is better than ever',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <CoverForm 
                    cover={cover}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update The Cover"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCoverModal