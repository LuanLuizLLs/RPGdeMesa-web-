import Logo from 'assets/img/logo.png'
import { useLogin } from './hooks/useLogin'
import { comparativePassword, formatCode, validateEmail, validateUsername } from './utils/functions'
import { Box, Title, Card, Image, Input, Button, Link, Grid } from 'components'

function Login() {
	const { view, handle, stateValues } = useLogin()

	const [values] = stateValues

	return (
		<Box maxHeight="100vh" overflow="auto" flex="auto">
			<Box padding="10px">
				{({
					login: (
						<Card maxWidth="350px">
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
								<Link onClick={() => handle.alterView('send_email')}>
									Esqueceu sua senha?
								</Link>
							</Box>
						</Card>
					),
					register: (
						<Card maxWidth="350px">
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
							<Input
								type="email"
								name="email"
								label="E-mail"
								placeholder="Digite seu e-mail"
								stateValue={stateValues}
								onEnter={handle.submitLogin}
								{...validateEmail(values.email)}
							/>
							<Input
								name="username"
								label="Usuário"
								placeholder="Digite seu usuário"
								stateValue={stateValues}
								onEnter={handle.submitRegister}
								{...validateUsername(values.username)}
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
						</Card>
					),
					send_email: (
						<Card maxWidth="350px">
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
								Digite o e-mail da sua conta:
							</Title>
							<Input
								type="email"
								name="email"
								label="E-mail"
								placeholder="Digite seu e-mail"
								stateValue={stateValues}
								onEnter={handle.submitLogin}
								{...validateEmail(values.email)}
							/>
							<Grid type="container" padding={[20, 0]}>
								<Grid type="row">
									<Grid type="column" size={6} margin={[0, 10]}>
										<Button type="filled" color="secondary" onClick={() => handle.alterView()}>
											Voltar
										</Button>
									</Grid>
									<Grid type="column" size={6} margin={[0, 10]}>
										<Button type="filled" onClick={handle.sendEmail}>
											Enviar
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Card>
					),
					send_code: (
						<Card maxWidth="350px">
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
								Digite o código de confirmação:
							</Title>
							<Input
								name="code"
								label="Código"
								maxLength={6}
								placeholder="Digite o código"
								formatter={formatCode}
								stateValue={stateValues}
								onEnter={handle.submitLogin}
							/>
							<Grid type="container" padding={[20, 0]}>
								<Grid type="row">
									<Grid type="column" size={6} margin={[0, 10]}>
										<Button type="filled" color="secondary" onClick={() => handle.alterView('send_email')}>
											Voltar
										</Button>
									</Grid>
									<Grid type="column" size={6} margin={[0, 10]}>
										<Button type="filled" onClick={handle.sendCode}>
											Confirmar
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Card>
					),
					recover: (
						<Card maxWidth="350px">
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
						</Card>
					),
				})[view]}
			</Box>
		</Box>
	)
}

export default Login