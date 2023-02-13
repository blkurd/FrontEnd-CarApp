import { useState, useEffect } from 'react'
// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneCar, removeCar, updateCar } from '../../api/car'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditCarModal from './EditCarModal'
import ShowCover from '../covers/ShowCover'
import NewCoverModal from '../covers/NewCoverModal'

// we need to get the car's id from the route parameters
// then we need to make a request to the api
// when we retrieve a car from the api, we'll render the data on the screen

const coverCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowCar = (props) => {
    const [car, setCar] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [coverModalShow, setCoverModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in ShowCar props', user)
    console.log('msgAlert in ShowCar props', msgAlert)

    useEffect(() => {
        getOneCar(id)
            .then(res => setCar(res.data.car))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting cars',
                    message: messages.getCarsFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

    // here's where our removeCar function will be called
    const setCarFree = () => {
        removeCar(user, car.id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeCarSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeCarFailure,
                    variant: 'danger'
                })
            })
    }

    let coverCards
    if (car) {
        if (car.covers.length > 0) {
            coverCards = car.covers.map(cover => (
                <ShowCover
                    key={cover.id} 
                    cover={cover}
                    user={user}
                    car={car}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if(!car) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>{ car.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Year: { car.year }</small></div>
                            <div><small>Model: { car.model }</small></div>
                            <div>
                                <small>
                                    For sale: { car.for_sale ? 'yes' : 'no' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button 
                            className="m-2" variant="info"
                            onClick={() => setCoverModalShow(true)}
                        >
                            Give {car.name} a cover!
                        </Button>
                        {
                            car.owner && user && car.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {car.name}
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => setCarFree()}
                                >
                                    Set {car.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className="m-2" style={coverCardContainerLayout}>
                {coverCards}
            </Container>
            <EditCarModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateCar={updateCar}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                car={car}
            />
            <NewCoverModal 
                car={car}
                show={coverModalShow}
                handleClose={() => setCoverModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowCar