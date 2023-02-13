import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteCover } from '../../api/covers'
import EditCoverModal from './EditCoverModal'

const ShowCover = (props) => {
    const { cover, user, car, msgAlert, triggerRefresh } = props

    // here's our hook to display the EditCoverModal
    const [editModalShow, setEditModalShow] = useState(false)
    // console.log('this is the cover in showCover', cover)
    // here, we're going to use react styling objects to our advantage
    // this will look at the cover's condition, and change the background color
    // we'll also use this to set a consistent width for each card
    // we'll pass the results of this function to a style prop in our card
    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    // delete, similar to delete for cars, all we have to do is ensure that the user is the car's owner, and make the api call passing in the right args.
    const destroyCover = () => {
        // this is the api call file function
        // it requires three args, user, carId, & coverId
        deleteCover(user, car.id, cover._id)
            // upon success, we want to send a message
            .then(() => {
                msgAlert({
                    heading: 'Cover Deleted',
                    message: 'Bye Bye cover!',
                    variant: 'success'
                })
            })
            // then trigger a refresh of the parent component
            .then(() => triggerRefresh())
            // upon failure send an appropriate message
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(cover.condition)}>
                <Card.Header>{cover.weather}</Card.Header>
                <Card.Body>
                    <small>{cover.description}</small><br/>
                    <small>
                        {cover.isGoodForSnow ? 'Good' : 'Bad'}
                    </small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {cover.condition}</small><br/>
                    {
                        user && car.owner && user._id === car.owner._id
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                            >
                                Edit Cover
                            </Button>
                            <Button 
                                onClick={() => destroyCover()} 
                                variant="danger"
                                className="m-2"
                            >
                                Delete Cover
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditCoverModal
                user={user}
                car={car}
                cover={cover}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowCover