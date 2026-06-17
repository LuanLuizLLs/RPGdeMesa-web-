
interface IBox extends React.CSSProperties {
  children: React.ReactNode
}

export const Box = ({
	children, ...style
}: IBox) => {
	return (
		<div style={style}>
			{children}
		</div>
	)
}