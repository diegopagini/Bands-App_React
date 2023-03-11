/** @format */
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { BandNamesApp } from './BandNamesApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BandNamesApp />
	</React.StrictMode>
);
