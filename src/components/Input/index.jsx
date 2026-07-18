import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Input = ({
	index = -1,
	name,
	max,
	min,
	maxLength,
	type = 'text',
	label = '',
	start = '',
	end = '',
	width = '',
	fontSize = '',
	validate = 'default',
	noLabel = false,
	disabled = false,
	readOnly = false,
	placeholder = null,
	stateValue = [],
	formatter = null,
	onBlur = () => { },
	onEnter = () => { },
}) => {

	const [value, setValue] = stateValue

	const style = {
		container: {
			fontSize,
		},
		component: {
			fontSize,
			width,
		},
	}

	const formatterValue = (value = '') => {
		return formatter ? formatter(value) : value
	}

	return (
		<div className={classes.container} style={style.container}>
			{noLabel || (
				<label className={classes.label}>
					{label}
				</label>
			)}
			<div className={classes.component} style={style.component} data-validate={validate}>
				{start && (
					<span className={classes.start}>
						{start}
					</span>
				)}
				<input
					type={type}
					disabled={disabled}
					readOnly={readOnly}
					maxLength={maxLength}
					value={(index > -1) ? value[index][name] : value[name]}
					className={classes.input}
					placeholder={placeholder}
					onBlur={onBlur}
					onKeyDown={({ key }) => (key === 'Enter') && onEnter()}
					onChange={({ target }) => {
						if (!isNaN(min) && target.value < min) return
						if (!isNaN(max) && target.value > max) return
						setValue((state) => {
							if (index > -1) {
								return ({
									...state, [index]: {
										...state[index], [name]: formatterValue(target.value)
									}
								})
							}
							return ({
								...state, [name]: formatterValue(target.value)
							})
						})
					}}
				/>
				{end && (
					<span className={classes.end}>
						{end}
					</span>
				)}
			</div>
		</div>
	)
}

Input.propTypes = {
	index: PropTypes.number,
	name: PropTypes.any.isRequired,
	max: PropTypes.number,
	min: PropTypes.number,
	type: PropTypes.string,
	fontSize: PropTypes.string,
	label: PropTypes.string,
	start: PropTypes.string,
	end: PropTypes.string,
	width: PropTypes.string,
	noLabel: PropTypes.bool,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	validate: PropTypes.string,
	placeholder: PropTypes.string,
	stateValue: PropTypes.array.isRequired,
	onBlur: PropTypes.func,
	onEnter: PropTypes.func,
}