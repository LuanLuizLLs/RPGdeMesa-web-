import React, { useState } from 'react'
import API from '../../services/api'
import Logo from '../../assets/img/logo.png'
import useLogin from '../../hooks/useLogin'
import useLoading from '../../hooks/useLoading'
import useMessage from '../../hooks/useMessage'
import { isNull } from '../../utils'
import { INITIAL } from './initial'
import { comparativePassword } from './utils'
import { useNavigate } from 'react-router-dom'
import {
	Box,
	Title,
	Card,
	Image,
	Input,
	Button,
	Link,
	Grid,
} from '../../components'

function Login() {
  
	const setNavigate = useNavigate()

	const { submitLogin } = useLogin()
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [view, setView] = useState(INITIAL.VIEW)
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		alterView: (view = INITIAL.VIEW) => {
			setView(view)
			setValues({
				...INITIAL.VALUES,
				name: values.name,
			})
		},
		resetLogin: () => {
			stopLoading()
		},
		submitLogin: () => {
			if (isNull(values, ['new_password'])) {
				return openMessage('warning', 'Preencha todos os dados')
			}
      
			startLoading('circular')

			API('users', values)
				.read(({ data }) => {
					const [user = {}] = data.response
					submitLogin(user)
					setNavigate('/')
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetLogin)
		},
		submitRegister: () => {
			if (isNull(values)) {
				return openMessage('warning', 'Preencha todos os dados')
			} else if (!comparativePassword(values.password, values.new_password).valid) {
				return openMessage('warning', 'As senhas não coincidem')
			}

			startLoading('bar')

			API('users', values)
				.create(({ data }) => {
					setView(INITIAL.VIEW)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetLogin)
		},
		submitRecover: () => {
			if (isNull(values)) {
				return openMessage('warning', 'Preencha todos os dados')
			} else if (!comparativePassword(values.password, values.new_password).valid) {
				return openMessage('warning', 'As senhas não coincidem')
			}

			startLoading('bar')

			API('users', values)
				.update(({ data }) => {
					setView(INITIAL.VIEW)
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetLogin)
		},
	}

	return (
		<Box flex="auto" maxWidth="90vw">
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
								name="name"
								label="Usuário"
								placeholder="Digite seu usuário"
								stateValue={[values, setValues]}
								onEnter={handle.submitLogin}
							/>
							<Input
								name="password"
								label="Senha"
								type="password"
								placeholder="Digite sua senha"
								stateValue={[values, setValues]}
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
								name="name"
								label="Usuário"
								placeholder="Seu novo usuário"
								stateValue={[values, setValues]}
								onEnter={handle.submitRegister}
							/>
							<Input
								name="password"
								label="Senha"
								type="password"
								placeholder="Digite sua senha"
								stateValue={[values, setValues]}
								onEnter={handle.submitRegister}
								{...comparativePassword(values.password, values.new_password)}
							/>
							<Input
								name="new_password"
								label="Confirmar senha"
								type="password"
								placeholder="Confirme sua senha"
								stateValue={[values, setValues]}
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
								name="name"
								label="Usuário"
								placeholder="Digite seu usuário"
								stateValue={[values, setValues]}
								onEnter={handle.submitRecover}
							/>
							<Input
								name="password"
								label="Nova senha"
								type="password"
								placeholder="Digite sua senha"
								stateValue={[values, setValues]}
								onEnter={handle.submitRecover}
								{...comparativePassword(values.password, values.new_password)}
							/>
							<Input
								name="new_password"
								label="Confirmar senha"
								type="password"
								placeholder="Digite sua senha novamente"
								stateValue={[values, setValues]}
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