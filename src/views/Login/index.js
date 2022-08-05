import React, { useContext, useState } from 'react'
import API from '../../services/api'
import Context from '../../global/context'
import useLogin from '../../services/login'
import Logo from '../../assets/img/logo.png'
import { isNull } from '../../utils'
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


const INITIAL = {
  VIEW: 'login',
  VALUES: {
    user: '',
    password: '',
    new_password: '',
  },
}

const comparativePassword = (first, secound) => {
  return Boolean(secound) ? (first === secound) ? 'valid' : 'invalid' : 'default'
}

function Login() {

  const { In } = useLogin()

  const setNavigate = useNavigate()

  const setLoading = useContext(Context).loading[1]
  const setMessage = useContext(Context).message[1]

  const [view, setView] = useState(INITIAL.VIEW)
  const [values, setValues] = useState(INITIAL.VALUES)

  const handleClick = {
    openLogin: () => {
      setView('login')
      setValues(INITIAL.VALUES)
    },
    submitLogin: () => {
      if (isNull(values, ['new_password'])) {
        return setMessage({
          type: 'warning',
          message: 'Preencha todos os dados',
        })
      }

      setLoading({
        type: 'circular',
      })

      API.get('users/read', {
        params: values
      })
        .then(({ data }) => {
          const [user] = data.response
          if (user) {
            setMessage({
              type: 'success',
              message: 'Login efetuado',
            })
            In(user)
            setNavigate('/')
          } else {
            setMessage({
              type: 'error',
              message: 'Login inválido',
            })
          }
        })
        .finally(() => {
          setLoading({})
        })
    },
    openRegister: () => {
      setView('register')
      setValues(INITIAL.VALUES)
    },
    submitRegister: () => {
      if (isNull(values)) {
        return setMessage({
          type: 'warning',
          message: 'Preencha todos os dados',
        })
      }

      if (!comparativePassword(values.password, values.new_password)) {
        return setMessage({
          type: 'error',
          message: 'Senha inválida',
        })
      }

      API.post('users/create', values)
        .then(({ data }) => {
          setMessage({
            type: data.status,
            message: data.message,
          })
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao criar o usuário',
          })
        })
        .finally(() => {
          setView(INITIAL.VIEW)
        })
    },
    openRecover: () => {
      setView('recover')
      setValues({
        ...INITIAL.VALUES,
        user: values.user,
      })
    },
    submitRecover: () => {
      if (isNull(values)) {
        return setMessage({
          type: 'warning',
          message: 'Preencha todos os dados',
        })
      }

      if (!comparativePassword(values.password, values.new_password)) {
        return setMessage({
          type: 'error',
          message: 'As senhas não coincidem',
        })
      }

      API.patch(`users/update`, values)
        .then(({ data }) => {
          setMessage({
            type: data.status,
            message: data.message,
          })
          setView('login')
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao atualizar o usuário',
          })
        })
    },
  }

  const Content = (content) => {
    return ({
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
            name="user"
            label="Usuário"
            placeholder="Digite seu usuário"
            stateValue={[values, setValues]}
            onEnter={handleClick.submitLogin}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            stateValue={[values, setValues]}
            onEnter={handleClick.submitLogin}
          />
          <Grid type="container" padding={[20, 0]}>
            <Grid type="row">
              <Grid type="column" size={6} margin={[0, 10]}>
                <Button type="filled" color="secondary" onClick={handleClick.openRegister}>
                  Cadastrar-se
                </Button>
              </Grid>
              <Grid type="column" size={6} margin={[0, 10]}>
                <Button type="filled" onClick={handleClick.submitLogin}>
                  Logar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Box width="fit-content" margin="0 auto">
            <Link onClick={handleClick.openRecover}>
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
            name="user"
            label="Usuário"
            placeholder="Seu novo usuário"
            stateValue={[values, setValues]}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            stateValue={[values, setValues]}
            validate={comparativePassword(values.password, values.new_password)}
          />
          <Input
            name="new_password"
            label="Confirmar senha"
            type="password"
            placeholder="Confirme sua senha"
            stateValue={[values, setValues]}
            validate={comparativePassword(values.password, values.new_password)}
          />
          <Grid type="container" padding={[20, 0]}>
            <Grid type="row">
              <Grid type="column" size={6} margin={[0, 10]}>
                <Button type="filled" color="secondary" onClick={handleClick.openLogin}>
                  Voltar
                </Button>
              </Grid>
              <Grid type="column" size={6} margin={[0, 10]}>
                <Button type="filled" onClick={handleClick.submitRegister}>
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
            name="user"
            label="Usuário"
            placeholder="Digite seu usuário"
            stateValue={[values, setValues]}
          />
          <Input
            name="password"
            label="Nova senha"
            type="password"
            placeholder="Digite sua senha"
            stateValue={[values, setValues]}
            validate={comparativePassword(values.password, values.new_password)}
          />
          <Input
            name="new_password"
            label="Confirmar senha"
            type="password"
            placeholder="Digite sua senha novamente"
            stateValue={[values, setValues]}
            validate={comparativePassword(values.password, values.new_password)}
          />
          <Grid type="container" padding={[20, 0]}>
            <Grid type="row">
              <Grid type="column" size={6} margin={[0, 10]}>
                <Button type="filled" color="secondary" onClick={handleClick.openLogin}>
                  Cancelar
                </Button>
              </Grid>
              <Grid type="column" size={6} margin={[0, 10]}>
                <Button type="filled" onClick={handleClick.submitRecover}>
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      ),
    })[content] || 'Conteúdo não encontrado...'
  }

  return (
    <Box flex="auto" maxWidth="90vw">
      <Card maxWidth="350px">
        {Content(view)}
      </Card>
    </Box>
  )
}

export default Login