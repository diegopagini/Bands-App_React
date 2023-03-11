/** @format */
import { useContext, useState } from 'react';

import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {
	const [name, setName] = useState('');
	const { socket } = useContext(SocketContext);

	const onSubmit = (event) => {
		event.preventDefault();
		if (name.trim().length > 0) {
			socket.emit('create-band', { name });
		}

		setName('');
	};

	return (
		<>
			<h3>Add Band</h3>

			<form onSubmit={onSubmit}>
				<input
					spellCheck={false}
					className='form-control'
					placeholder='New band name'
					value={name}
					onChange={(ev) => setName(ev.target.value)}
				/>
			</form>
		</>
	);
};
