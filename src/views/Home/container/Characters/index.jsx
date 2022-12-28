import React, { useEffect, useState } from 'react'
import API from '../../../../services/api'
import useLoading from '../../../../hooks/useLoading'
import useMessage from '../../../../hooks/useMessage'
import imagePlayer from '../../../../assets/img/player.png'
import { INITIAL } from './initial'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CHARACTERS } from '../../../../constants'
import { CASTE, RACE } from '../../../../configs'
import {
  Box,
  Button,
  Card,
  Image,
  Input,
  List,
  TextArea,
  Title,
  Modal,
  Text,
  Select,
  Paper,
} from '../../../../components'

function Characters({ user }) {

  const setNavigate = useNavigate()
  const setDispatch = useDispatch()

  const { openMessage } = useMessage()
  const { startLoading, stopLoading } = useLoading()

  const [list, setList] = useState(INITIAL.LIST)
  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)

  useEffect(() => {
    API('characters', {
      id_user: user.id
    })
      .read(({ data }) => {
        setList((state) => ({
          ...state, rows: data.response,
        }))
      })
  }, [refresh, user.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
      setValues({ ...values, ...data })
    },
    resetValues: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      stopLoading()
    },
    createCharacter: () => {
      startLoading('bar')

      API('characters', {
        ...values,
        ...RACE[values.race],
        ...CASTE[values.caste],
        id_user: user.id,
      })
        .create(({ data }) => {
          setRefresh(data)
          openMessage(data.status, data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetValues)
    },
    updateCharacter: () => {
      startLoading('bar')

      API('characters', values)
        .update(({ data }) => {
          setRefresh(data)
          openMessage(data.status, data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetValues)
    },
    deleteCharacter: () => {
      startLoading('bar')

      API('characters', values)
        .delete(({ data }) => {
          setRefresh(data)
          openMessage(data.status, data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetValues)
    },
    startCharacter: () => {
      setDispatch({
        type: 'CHARACTER',
        data: values,
      })
      setNavigate('/player')
    },
  }

  return (
    <>
      <Modal
        maxWidth={450}
        stateModal={[modal, setModal]}
        onClose={handle.resetValues}
      >
        {{
          character_start: (
            <>
              <Title type="h6">
                Detalhes do personagem:
              </Title>
              <Paper backgroundColor="secondary">
                <Text color="primary" fontWeight="bold">
                  {modal.data.name}
                </Text>
                <Text>
                  {modal.data.description}
                </Text>
              </Paper>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="bottomless" color="primary" padding={10} onClick={handle.resetValues}>
                  Voltar
                </Button>
                <Button type="filled" padding={10} onClick={handle.startCharacter}>
                  Jogar
                </Button>
              </Box>
            </>
          ),
          character_create: (
            <>
              <Title type="h6">
                Criar personagem:
              </Title>
              <Input
                name="name"
                placeholder="Nome"
                stateValue={[values, setValues]}
              />
              <Select
                name="race"
                placeholder="Raça"
                options={CHARACTERS.RACE}
                stateValue={[values, setValues]}
              />
              <Select
                name="caste"
                placeholder="Classe"
                options={CHARACTERS.CASTE}
                stateValue={[values, setValues]}
              />
              <Select
                name="tendency"
                placeholder="Tendência"
                options={CHARACTERS.TENDENCY}
                stateValue={[values, setValues]}
              />
              <TextArea
                rows={3}
                name="description"
                placeholder="Descrição"
                stateValue={[values, setValues]}
              />
              <Box display="flex" justifyContent="flex-end">
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetValues}>
                  Cancelar
                </Button>
                <Button type="filled" padding={10} onClick={handle.createCharacter}>
                  Criar
                </Button>
              </Box>
            </>
          ),
          character_update: (
            <>
              <Title type="h6">
                Editar personagem:
              </Title>
              <Input
                name="name"
                placeholder="Nome"
                stateValue={[values, setValues]}
              />
              <TextArea
                rows={3}
                name="description"
                placeholder="Descrição"
                stateValue={[values, setValues]}
              />
              <Box display="flex" justifyContent="flex-end">
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetValues}>
                  Cancelar
                </Button>
                <Button type="filled" padding={10} onClick={handle.updateCharacter}>
                  Salvar
                </Button>
              </Box>
            </>
          ),
          character_delete: (
            <>
              <Title type="h6">
                Deletar personagem:
              </Title>
              <Text>
                Tem certeza que deseja excluir o personagem <b>{modal.data.name}</b>?
              </Text>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="bottomless" padding={10} onClick={handle.resetValues}>
                  Cancelar
                </Button>
                <Button type="filled" color="error" padding={10} onClick={handle.deleteCharacter}>
                  Excluir
                </Button>
              </Box>
            </>
          )
        }}
      </Modal>
      <Card>
        <Image
          maxHeight={100}
          maxWidth={100}
          margin="0 auto"
          alt="armadura de cavaleiro"
          src={imagePlayer}
        />
        <Title type="h4" textAlign="center">
          Lista de Personagens:
        </Title>
        <List
          height={300}
          {...list}
          onClick={(row) => handle.openModal('character_start', row)}
          actions={(row) => ({
            update: () => handle.openModal('character_update', row),
            delete: () => handle.openModal('character_delete', row),
          })}
        />
        <Button type="filled" padding={10} onClick={() => handle.openModal('character_create')}>
          Criar personagem
        </Button>
      </Card>
    </>
  )
}

export default Characters