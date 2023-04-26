import './Spinner.css';

export default function Spinner({ size, style }) {
	return <div className='spinner' style={{
		...style,
		width: size,
		height: size
	}}></div>
}