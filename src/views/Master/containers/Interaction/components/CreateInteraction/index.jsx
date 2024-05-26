import React from 'react'
import { Box, Button, Grid, Input, TextArea, Title } from 'components'

export function CreateInteraction({ stateValues, onReset, onCreate }) {
	return (
		<>
			<Title type="h6">
        Adicionar interação:
			</Title>
			<Input
				name="name"
				placeholder="Nome"
				stateValue={stateValues}
			/>
			<TextArea
				name="description"
				placeholder="Descrição"
				stateValue={stateValues}
			/>
			<Grid type="container">
				<Grid type="row" padding={[5, 0]}>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="❤️"
							name="life"
							label="Vida"
							type="number"
							stateValue={stateValues}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="🩸"
							type="number"
							label="Dano"
							name="damage"
							stateValue={stateValues}
						/>
					</Grid>
				</Grid>
				<Grid type="row" padding={[5, 0]}>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="💪"
							type="number"
							name="strength"
							stateValue={stateValues}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="👋"
							type="number"
							name="dexterity"
							stateValue={stateValues}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="✊"
							type="number"
							name="constitution"
							stateValue={stateValues}
						/>
					</Grid>
				</Grid>
				<Grid type="row">
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="📙"
							type="number"
							name="intelligence"
							stateValue={stateValues}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="🙌"
							type="number"
							name="wisdom"
							stateValue={stateValues}
						/>
					</Grid>
					<Grid type="column" margin={[0, 5]}>
						<Input
							start="🤝"
							type="number"
							name="charisma"
							stateValue={stateValues}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Box display="flex" justifyContent="flex-end" marginTop={10}>
				<Button type="filled" color="secondary" padding={10} onClick={onReset}>
          Cancelar
				</Button>
				<Button type="filled" padding={10} onClick={onCreate}>
          Criar
				</Button>
			</Box>
		</>
	)
}