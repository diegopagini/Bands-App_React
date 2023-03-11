/** @format */
import { useEffect, useState } from 'react';

export const BandList = ({ data, vote, onDelete, changeName }) => {
	const [bands, setBands] = useState(data);

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
			changeName(id, name);
		}
	};

	const onDeleteBand = (id) => {
		onDelete(id);
	};

	useEffect(() => {
		setBands(data);
	}, [data]);

	const createRows = () => {
		return bands.map((band) => (
			<tr key={band.id}>
				<td>
					<button
						className='btn btn-primary'
						onClick={() => vote(band.id)}>
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
