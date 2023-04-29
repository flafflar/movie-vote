import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

import IconButton from './IconButton';

export default function InstagramLoginButton() {
	const clientId = 766242878400532;
	const redirectUri = process.env.PUBLIC_URL
		? `${process.env.PUBLIC_URL}/oauth`
		: `${window.location.origin}${window.location.pathname}oauth`;
	const oAuthUri = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user_profile`;

	return (
		<IconButton
			onClick={() => window.open(oAuthUri, '_self', 'popup=true,noreferer')}
			icon={<FontAwesomeIcon icon={faInstagram} size='xl' />}
			text="Login with Instagram"
		/>
	);
}