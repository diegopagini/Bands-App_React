/** @format */
import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath = 'http://localhost:8080') => {
	const socket = useMemo(
		/** To prevent it from running every time some one start using it. */
		() =>
			io.connect(serverPath, {
				transports: ['websocket'],
			}),
		[serverPath]
	);

	const [online, setOnline] = useState(false);

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

	return {
		socket,
		online,
	};
};
