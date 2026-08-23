import classes from './style.module.css'

type State = Record<string, unknown>
type SetState = (set: (state: State) => State) => void

export interface InputProps {
	index?: number;
	name: string;
	max?: number;
	min?: number;
	maxLength?: number;
	type?: string;
	label?: string;
	start?: string;
	end?: string;
	width?: string;
	fontSize?: string;
	validate?: string;
	noLabel?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	placeholder?: string;
	stateValue: [State, SetState];
	formatter?: (value: string) => string;
	onBlur?: () => void;
	onEnter?: () => void;
}

export const Input = ({
	index,
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
	placeholder = '',
	validate = 'default',
	noLabel = false,
	disabled = false,
	readOnly = false,
	stateValue,
	formatter,
	onBlur,
	onEnter,
}: InputProps) => {

	const [value, setValue] = stateValue

	const typePassword = (type === 'password')

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

	const defineValue = () => {
		if (value) {
			const valueObject = Object.assign(value)

			return index ? valueObject[index][name] : valueObject[name]
		}

		return null
	}

	const onChangeValue = (value = '') => {
		if (min && Number(value) < min) return
		if (max && Number(value) > max) return

		setValue((state) => {
			const stateObject = Object.assign(state)

			if (index) {
				return ({
					...stateObject,
					[index]: {
						...stateObject[index],
						[name]: formatterValue(value)
					}
				})
			}

			return ({
				...stateObject,
				[name]: formatterValue(value)
			})
		})
	}

	const onPressKey = (key: string) => {
		if (key === 'Enter') {
			onEnter?.()
		}
	}

	const switchShowPassword = () => {
		const input = document.getElementById(name)

		if (input) {
			const type = input.getAttribute('type')
			input.setAttribute('type', type === 'password' ? 'text' : 'password')
		}
	}

	const onClickIcon = () => {
		if (typePassword) {
			switchShowPassword()
		}
	}

	return (
		<div data-testid="container" className={classes.container} style={style.container}>
			{noLabel || (
				<label data-testid="label" htmlFor={name} className={classes.label}>
					{label}
				</label>
			)}
			<div className={classes.component} style={style.component} data-validate={validate}>
				<span data-testid="start" className={classes.start} data-visible={Boolean(start)}>
					{start}
				</span>
				<input
					data-testid="input"
					id={name}
					type={type}
					disabled={disabled}
					readOnly={readOnly}
					maxLength={maxLength}
					value={defineValue()}
					className={classes.input}
					placeholder={placeholder}
					onBlur={onBlur}
					onKeyDown={({ key }) => onPressKey(key)}
					onChange={({ target }) => onChangeValue(target.value)}
				/>
				<span data-testid="end" className={classes.end} data-visible={Boolean(typePassword || end)} onClick={onClickIcon}>
					{typePassword || end}
				</span>
			</div>
		</div>
	)
}