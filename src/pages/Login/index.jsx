import Logo from 'assets/img/logo.png'
import { useLogin } from './hooks/useLogin'
import { comparativePassword } from './utils/functions'
import { Box, Title, Card, Image, Input, Button, Link, Grid } from 'components'

function Login() {
	const { view, handle, stateValues } = useLogin()
  
	const [values] = stateValues

	return (
		<Box flex="auto">
			<Card maxWidth="350px">
				{({
					login: (
						<>
							<Image
								src={Logo}
								alt="logo"
								maxWidth={100}
								maxHeight={100}
								margin="10px auto"
							/>
							<Title type="h1" color="primary" textAlign="center">
                Login
							</Title>
							<Input
								name="username"
								label="Usuário"
								placeholder="Digite seu usuário"
								stateValue={stateValues}
								onEnter={handle.submitLogin}
							/>
							<Input
								name="password"
								label="Senha"
								type="password"
								placeholder="Digite sua senha"
								stateValue={stateValues}
								onEnter={handle.submitLogin}
							/>
							<Grid type="container" padding={[20, 0]}>
								<Grid type="row">
									<Grid type="column" size={6} margin={[0, 10]}>
										<Button type="filled" color="secondary" onClick={() => handle.alterView('register')}>
                      Cadastrar-se
										</Button>
									</Grid>
									<Grid type="column" size={6} margin={[0, 10]}>
										<Button type="filled" onClick={handle.submitLogin}>
                      Logar
										</Button>
									</Grid>
								</Grid>
							</Grid>
							<Box width="fit-content" margin="0 auto">
								<Link onClick={() => handle.alterView('recover')}>
                  Esqueceu sua senha?
								</Link>
							</Box>
						</>
					),
					register: (
						<>
							<Image
								src={Logo}
								alt="logo"
								maxWidth={100}
								maxHeight={100}
								margin="10px auto"
							/>
							<Title type="h1" color="primary" textAlign="center">
                Cadastre-se
							</Title>
							<Title type="h6" color="primary" textAlign="center">
                Preencha os dados a seguir:
							</Title>
							<Input
								name="username"
								label="Usuário"
								placeholder="Seu novo usuário"
								stateValue={stateValues}
								onEnter={handle.submitRegister}
							/>
							<Input
								name="password"
								label="Senha"
								type="password"
								placeholder="Digite sua senha"
								stateValue={stateValues}
								onEnter={handle.submitRegister}
								{...comparativePassword(values.password, values.new_password)}
							/>
							<Input
								name="new_password"
								label="Confirmar senha"
								type="password"
								placeholder="Confirme sua senha"
								stateValue={stateValues}
								onEnter={handle.submitRegister}
								{...comparativePassword(values.password, values.new_password)}
							/>
							<Grid type="container" padding={[20, 0]}>
								<Grid type="row">
									<Grid type="column" size={6} margin={[0, 10]}>
										<Button type="filled" color="secondary" onClick={() => handle.alterView()}>
                      Voltar
										</Button>
									</Grid>
									<Grid type="column" size={6} margin={[0, 10]}>
										<Button type="filled" onClick={handle.submitRegister}>
                      Cadastrar
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</>
					),
					recover: (
						<>
							<Image
								src={Logo}
								alt="logo"
								maxWidth={100}
								maxHeight={100}
								margin="10px auto"
							/>
							<Title type="h1" color="primary" textAlign="center">
                Recuperar
							</Title>
							<Title type="h6" color="primary" textAlign="center">
                Altere sua senha:
							</Title>
							<Input
								name="username"
								label="Usuário"
								placeholder="Digite seu usuário"
								stateValue={stateValues}
								onEnter={handle.submitRecover}
							/>
							<Input
								name="password"
								label="Nova senha"
								type="password"
								placeholder="Digite sua senha"
								stateValue={stateValues}
								onEnter={handle.submitRecover}
								{...comparativePassword(values.password, values.new_password)}
							/>
							<Input
								name="new_password"
								label="Confirmar senha"
								type="password"
								placeholder="Digite sua senha novamente"
								stateValue={stateValues}
								onEnter={handle.submitRecover}
								{...comparativePassword(values.password, values.new_password)}
							/>
							<Grid type="container" padding={[20, 0]}>
								<Grid type="row">
									<Grid type="column" size={6} margin={[0, 10]}>
										<Button type="filled" color="secondary" onClick={() => handle.alterView()}>
                      Cancelar
										</Button>
									</Grid>
									<Grid type="column" size={6} margin={[0, 10]}>
										<Button type="filled" onClick={handle.submitRecover}>
                      Salvar
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</>
					),
				})[view]}
			</Card>
		</Box>
	)
}

export default Login