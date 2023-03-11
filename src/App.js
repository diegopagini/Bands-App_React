/** @format */
import { useEffect, useState } from 'react';

import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';
import { useSocket } from './hooks/useSocket';

function App() {
	const [bands, setBands] = useState([]);
	const { socket, online } = useSocket('http://localhost:8080');

	useEffect(() => {
		socket.on('current-bands', (data) => {
			setBands(data);
		});
	}, [socket]);

	const onVote = (id) => {
		// Emit to the backend.
		socket.emit('vote-band', id);
	};

	const onDelete = (id) => {
		// Emit to the backend.
		socket.emit('delete-band', id);
	};

	const onChangeName = (id, name) => {
		// Emit to the backend.
		socket.emit('change-name-band', { id, name });
	};

	const createBand = (name) => {
		// Emit to the backend.
		socket.emit('create-band', { name });
	};

	return (
		<div className='container'>
			<div className='alert'>
				<p>
					Service status:
					{online ? (
						<span className='text-success'> Online</span>
					) : (
						<span className='text-danger'> Offline</span>
					)}
				</p>
			</div>

			<h1>BandNames</h1>
			<hr />

			<div className='row'>
				<div className='col-8'>
					<BandList
						data={bands}
						vote={onVote} /** The onVote function is passed like a property by reference */
						onDelete={onDelete} /** The onDelete function is passed like a property by reference */
						changeName={
							onChangeName
						} /** The onChangeName function is passed like a property by reference */
					/>
				</div>

				<div className='col-4'>
					<BandAdd
						onCreate={
							createBand
						} /** The onChangeName function is passed like a property by reference */
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
