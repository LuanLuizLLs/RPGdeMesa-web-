import classes from './style.module.css'

interface ITooltip {
  text: string
  children: React.ReactNode | string
}

export const Tooltip = ({ text, children }: ITooltip) => {
	return (
		<div className={classes.container} data-tooltip={text}>
			{children}
		</div>
	)
}