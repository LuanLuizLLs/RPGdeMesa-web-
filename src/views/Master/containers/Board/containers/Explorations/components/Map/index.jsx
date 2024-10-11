import { Box, Text, Title, Tooltip } from 'components'
import theme from 'theme'

export function Map({ handle, list }) {
	const { board: explorations = [] } = list

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
								handle.openExploration('exploration_board', {
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
								borderStyle="solid"
								borderColor={theme.secondary}
								display="grid"
								placeContent="center"
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