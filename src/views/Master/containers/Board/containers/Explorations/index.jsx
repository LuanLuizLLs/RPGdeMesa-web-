import React from 'react'
import { Box, Text, Title } from 'components'

function Explorations() {
	const explorations = []

	return (
		<>
			<Title type="h6">
        Quadro de exploração:
			</Title>
			<Box height={240} overflow="auto">
				{!explorations.length && (
					<Box height="100%" display="grid" placeContent="center">
						<Text color="primary" fontWeight="bold">Nenhuma exploração adicionada...</Text>
					</Box>
				)}
			</Box>
		</>
	)
}

export default Explorations