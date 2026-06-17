import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Radio = ({
	name = '',
	label = '',
	direction = 'horizontal',
	stateValue = [],
	options = {},
}) => {

	const [value, setValue] = stateValue

	const style = {
		container: {
			flexDirection: {
				vertical: 'column',
				horizontal: 'row',
			}[direction]
		}
	}

	return (
		<div className={classes.container} style={style.container}>
			<label className={classes.label}>
				{label}
			</label>
			{Object.entries(options).map(([label, item], i) => (
				<label className={classes.radio} key={i}>
					<input
						type="radio"
						name={name}
						value={item}
						checked={value[name] === options[label]}
						onChange={() => setValue({
							...value,
							[name]: options[label],
						})}
					/>
					{label}
				</label>
			))}
		</div>
	)
}

Radio.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	direction: PropTypes.string,
	stateValue: PropTypes.array,
	options: PropTypes.object,
}