import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

import './InstagramLoginButton.css';

export default function InstagramLoginButton() {
	const clientId = 766242878400532;
	const redirectUri = `${window.location.origin}${window.location.pathname}/oauth`;
	const oAuthUri = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user_profile`;

	return <div className='button' onClick={() => window.open(oAuthUri, '_self', 'popup=true,noreferer')}>
		<FontAwesomeIcon icon={faInstagram} size='xl' className='icon' />
		Login with Instagram
	</div>
}