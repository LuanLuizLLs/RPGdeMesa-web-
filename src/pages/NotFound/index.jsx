import Logo from 'assets/img/logo.png'
import { useNavigate } from 'react-router-dom'
import { Grid, Title, Image, Button } from 'components'

function NotFound() {
	const setNavigate = useNavigate()

	return (
		<Grid type="container">
			<Grid type="row" flexDirection="column" alignItems="center">
				<Grid type="column">
					<Image
						src={Logo}
						maxHeight={120}
						maxWidth={120}
						alt="Logo de RPG"
					/>
				</Grid>
				<Grid type="column" padding={[20, 20]}>
					<Title type="h6" color="white" textAlign="center">
            Página não encontrada...
					</Title>
				</Grid>
				<Grid type="column">
					<Button type="filled" onClick={() => setNavigate('/')}>
            Voltar ao início
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default NotFound