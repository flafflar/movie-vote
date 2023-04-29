import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';

import './ModalWindow.css';

export default function ModalWindow({ title, children, show, onHide }) {
	return (
		<div className={"modal-window-container" + (show ? '' : ' hidden')}>
			<div className='modal-window'>
				<div className='modal-top-bar'>
					<div className='modal-title'>{title}</div>
					<div className='modal-close-icon' onClick={() => onHide()}>
						<FontAwesomeIcon icon={faWindowClose} size='lg' />
					</div>
				</div>
				<div className='modal-content'>{children}</div>
			</div>
		</div>
	)
}