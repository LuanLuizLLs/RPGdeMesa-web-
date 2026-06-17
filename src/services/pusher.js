import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const pusher = new Echo({
	broadcaster: 'pusher',
	key: process.env.REACT_APP_PUSHER_APP_KEY,
	wsHost: process.env.REACT_APP_PUSHER_APP_HOST,
	wsPort: process.env.REACT_APP_PUSHER_APP_PORT_WS,
	wssPort: process.env.REACT_APP_PUSHER_APP_PORT_WSS,
	wsPath: process.env.REACT_APP_PUSHER_APP_PATH_WS,
	enabledTransports: ['ws', 'wss'],
	cluster: 'mt1',
	disableStats: true,
	forceTLS: Boolean(process.env.REACT_APP_PUSHER_APP_TLS),
})

export default pusher
