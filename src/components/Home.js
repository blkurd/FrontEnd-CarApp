import CarsIndex from './cars/CarsIndex'
import Container from 'react-bootstrap/Container'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<Container className="m-2" style={{textAlign: 'center'}}>
			<h2>See All The cars</h2>
			<CarsIndex msgAlert={ props.msgAlert } />
		</ Container>
	)
}

export default Home