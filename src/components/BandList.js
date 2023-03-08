/** @format */

export const BandList = () => {
	const createRows = () => {
		return (
			<tr>
				<td>
					<button className='btn btn-primary'>+1</button>
				</td>
				<td>
					<input className='form-control' />
				</td>
				<td>
					<span className='p-3'>13</span>
				</td>
				<td>
					<button className='btn btn-danger'>Delete</button>
				</td>
			</tr>
		);
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
