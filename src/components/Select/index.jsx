import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Select = ({
	name,
	label = '',
	placeholder = '',
	noLabel = false,
	disabled = false,
	options = [],
	stateValue = [],
	onSelect = () => { }
}) => {

	const [value, setValue] = stateValue

	const changeValue = async (currentValue) => {
		setValue(currentValue)
		return currentValue
	}

	return (
		<div className={classes.container}>
			{noLabel || (
				<label className={classes.label}>{label}</label>
			)}
			<select
				disabled={disabled}
				className={classes.select}
				value={value[name]}
				data-selected={Boolean(value[name])}
				onChange={({ target }) => changeValue({
					...value, [name]: target.value
				}).then(onSelect)}
			>
				{placeholder && (
					<option value="" label={placeholder} />
				)}
				{options.map((item, i) => (
					<option key={i} value={item} label={item} />
				))}
			</select>
		</div>
	)
}

Select.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	noLabel: PropTypes.bool,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	options: PropTypes.array.isRequired,
	stateValue: PropTypes.array.isRequired,
	onSelect: PropTypes.func,
}