// this form will take several props and be used both to create and update cars
// the action will be dependent upon the parent component
// but the form will look the same on both Create and Update
import { Form, Button, Container } from 'react-bootstrap'

const CarForm = (props) => {
    // we need several props for a working, reusable form
    // the object itself(car), some handleChange fn, some handleSubmit fn
    // and in this case, we'll add a custom heading
    const { car, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is your car's name?"
                        name="name"
                        id="name"
                        value={ car.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Model:</Form.Label>
                    <Form.Control 
                        placeholder="What model of car is this?"
                        name="model"
                        id="model"
                        value={ car.model }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Year:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="What year is your car?"
                        name="year"
                        id="year"
                        value={ car.year }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this car for sale?"
                        name="For sale"
                        defaultChecked={ car.for_sale }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CarForm