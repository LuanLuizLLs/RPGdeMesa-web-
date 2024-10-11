import { Box, Text, Title, Tooltip } from 'components'
import theme from 'theme'

export function Map({ handle, list, action }) {
	const { board: explorations = [] } = list
  
	const isSelected = (position = []) => {
		const { vertical, horizontal } = action.data
		return position[0] === vertical && position[1] === horizontal
	}

	const isBlocked = (column = {}, position = []) => {
		const isMove = action.type === 'move'
		const isDuplicate = action.type === 'duplicate'
    
		if (isMove || isDuplicate) {
			return column && !isSelected(position)
		}

		return false
	}

	return (
		<Box width="fit-content" margin="0 auto 40px">
			<Box top={0} zIndex={1} position="sticky" backgroundColor={theme.white}>
				<Title type="h6" textAlign="center" color="primary">
					{list.name} ({list.vertical} x {list.horizontal})
				</Title>
				<Text color="gray" fontWeight="bold" textAlign="center">
					{list.description}
				</Text>
			</Box>
			{explorations.map((row, horizontal) => (
				<Box key={horizontal} display="flex">
					{row.map((column, vertical) => (
						<div
							key={vertical}
							onClick={() => {
								if (isBlocked(column, [vertical, horizontal])) {
									return null
								}
                
								handle.openExploration(column ? 'read_board' : 'update_board', {
									...column,
									horizontal,
									vertical,
								})
							}}
						>
							<Box
								margin={2}
								width={80}
								height={80}
								cursor="pointer"
								position="relative"
								display="grid"
								placeContent="center"
								borderStyle="solid"
								borderColor={isSelected([vertical, horizontal]) ? theme.primary : theme.secondary}
								backgroundColor={isBlocked(column, [vertical, horizontal]) ? theme.white : 'white'}
							>
								<Box position="absolute" top={0} right={4}>
									<Text inline color="gray" fontSize="12px" fontWeight="bold">{horizontal}-{vertical}</Text>
								</Box>
								{column && (
									<Tooltip text={column.name}>
										<Text inline fontSize="50px" color={column.color}>{column.symbol}</Text>
									</Tooltip>
								)}
							</Box>
						</div>
					))}
				</Box>
			))}
		</Box>
	)
}