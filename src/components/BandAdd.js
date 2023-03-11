/** @format */
import { useState } from 'react';

export const BandAdd = ({ onCreate }) => {
	const [value, setValue] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		if (value.trim().length > 0) {
			onCreate(value);
		}

		setValue('');
	};

	return (
		<>
			<h3>Add Band</h3>

			<form onSubmit={onSubmit}>
				<input
					spellCheck={false}
					className='form-control'
					placeholder='New band name'
					value={value}
					onChange={(ev) => setValue(ev.target.value)}
				/>
			</form>
		</>
	);
};
