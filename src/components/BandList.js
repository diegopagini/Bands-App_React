/** @format */
import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../context/SocketContext';

export const BandList = () => {
	const [bands, setBands] = useState([]);
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket.on('current-bands', (bands) => {
			setBands(bands);
		});

		return () =>
			socket.off('current-bands'); /** To fishin the connection when the component is destroyed */
	}, [socket]);

	const onNameChange = (event, id) => {
		const newName = event.target.value;
		setBands((bands) =>
			bands.map((band) => {
				if (band.id === id) band.name = newName;
				return band;
			})
		);
	};

	const onEnter = (event, id, name) => {
		if (event.key === 'Enter') {
			socket.emit('change-name-band', { id, name });
		}
	};

	const onDeleteBand = (id) => {
		socket.emit('delete-band', id);
	};

	const onVote = (id) => {
		socket.emit('vote-band', id);
	};

	const createRows = () => {
		return bands.map((band) => (
			<tr key={band.id}>
				<td>
					<button
						className='btn btn-primary'
						onClick={() => onVote(band.id)}>
						+1
					</button>
				</td>
				<td>
					<input
						className='form-control'
						onKeyPress={(event) => onEnter(event, band.id, band.name)}
						onChange={(event) => onNameChange(event, band.id)}
						spellCheck={false}
						value={band.name}
					/>
				</td>
				<td>
					<span className='p-3'>{band.votes}</span>
				</td>
				<td>
					<button
						className='btn btn-danger'
						onClick={() => onDeleteBand(band.id)}>
						Delete
					</button>
				</td>
			</tr>
		));
	};

	return (
		<>
			<table className='table table-stripped'>
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Votes</th>
						<th>Delete</th>
					</tr>
				</thead>

				<tbody>{createRows()}</tbody>
			</table>
		</>
	);
};
