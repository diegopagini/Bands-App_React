/** @format */
import { useState } from 'react';

import { useSocket } from '../hooks/useSocket';

export const BandAdd = () => {
	const [name, setName] = useState('');
	const { socket } = useSocket();

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
