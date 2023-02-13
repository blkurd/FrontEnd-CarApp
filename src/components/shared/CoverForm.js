import { Form, Button, Container } from 'react-bootstrap'

const CoverForm = (props) => {
    const { cover, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Weather:</Form.Label>
                    <Form.Control 
                        placeholder="Which weather is it used for?"
                        name="weather"
                        id="weather"
                        value={ cover.weather }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control 
                        placeholder="What kind of cover is this?"
                        name="description"
                        id="description"
                        value={ cover.description }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this cover good for snow?"
                        name="isSqueaky"
                        defaultChecked={ cover.isGoodForSnow }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Select 
                        aria-label="cover condition"
                        name="condition"
                        defaultValue={cover.condition}
                        onChange={handleChange}
                    >
                        <option>Open this select menu</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </Form.Select>
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CoverForm