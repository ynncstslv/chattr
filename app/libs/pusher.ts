import PusherClient from 'pusher-js';
import PusherServer from 'pusher';

export const pusherServer = new PusherServer({
	key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
	appId: process.env.PUSHER_APP_ID!,
	secret: process.env.PUSHER_SECRET!,
	cluster: 'sa1',
	useTLS: true,
});

export const pusherClient = new PusherClient(
	process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
	{
		cluster: 'sa1',
	}
);
