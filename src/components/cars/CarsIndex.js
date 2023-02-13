import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

// api function from our api file
import { getAllCars } from '../../api/car'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. they're a quick easy way add focused css properties to our react components
// styling objects use any CSS style, but in camelCase instead of the typical hyphenated naming convention
// this is because we're in js
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// CarsIndex will make a request to the API for all cars
// once it receives a response, display a card for each car
const CarsIndex = (props) => {
    const [cars, setCars] = useState(null)
    const [error, setError] = useState(false)
    console.log('these are the cars in index', cars)
    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

    // get our cars from the api when the component mounts
    useEffect(() => {
        getAllCars()
            .then(res => setCars(res.data.cars))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting cars',
                    message: messages.getCarsFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!cars) {
        // if no cars loaded yet, display 'loading'
        return <LoadingScreen />
    } else if (cars.length === 0) {
        // otherwise if there ARE no cars, display that message
        return <p>No cars yet, go add some!</p>
    }

    // once we have an array of cars, loop over them
    // produce one card for every car
    const carCards = cars.map(car => (
        <Card key={ car.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ car.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/cars/${car.id}`} className="btn btn-info">View { car.name }</Link>
                </Card.Text>
                { car.owner ?
                <Card.Footer>
                     owner: {car.owner.email} 
                </Card.Footer>
                : null}
            </Card.Body>
        </Card>
    ))

    // return some jsx, a container with all the carcards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { carCards }
        </div>
    )
}

// export our component
export default CarsIndex