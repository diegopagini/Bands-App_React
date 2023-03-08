/** @format */
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';

const connectSocketServer = () =>
	io.connect('http://localhost:8080', {
		transports: ['websocket'],
	});

function App() {
	const [socket] = useState(connectSocketServer());
	const [online, setOnline] = useState(false);
	const [bands, setBands] = useState([]);

	useEffect(() => {
		setOnline(socket.connected);
	}, [socket]);

	useEffect(() => {
		socket.on('connect', () => {
			setOnline(true);
		});
	}, [socket]);

	useEffect(() => {
		socket.on('disconnect', () => {
			setOnline(false);
		});
	}, [socket]);

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
					<BandAdd />
				</div>
			</div>
		</div>
	);
}

export default App;
