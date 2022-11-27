import React, { useEffect, useState } from 'react'
import useLoading from '../../../hooks/loading'
import useMessage from '../../../hooks/message'
import { requestAPI } from '../../../services/api'
import { ATTRIBUTE, INVENTORY } from '../../../configs'
import { pointAttribute, phisicalCapacity } from '../../../utils'
import {
  Box,
  Button,
  Grid,
  Input,
  List,
  Modal,
  Paper,
  Radio,
  Select,
  Text,
  TextArea,
  Title,
} from '../../../components'

const INITIAL = {
  MODAL: {
    content: '',
    data: {},
  },
  VALUES: {
    name: '',
    description: '',
    attribute: '',
    usable: false,
    level: 1,
  },
  REFRESH: null,
  INVENTORY: {
    columns: {
      id: 'ID',
      name: 'Item',
      description: 'Descrição',
      attribute: 'Atributo',
      level: 'Nível',
    },
    rows: [],
  }
}

const optionsUsable = (usable = false) => {
  return usable ? Object.keys(ATTRIBUTE.SECONDARY) : Object.keys(ATTRIBUTE.PRIMARY)
}

function Inventory({
  user,
  character,
  setRefreshCharacter,
}) {

  const { openMessage } = useMessage()
  const { startLoading, stopLoading } = useLoading()

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [inventory, setInventory] = useState(INITIAL.INVENTORY)

  useEffect(() => {
    if (character) {
      requestAPI('inventory', {
        id_character: character.id,
      })
        .read(({ data }) => {
          setInventory((state) => ({
            ...state, rows: data.response,
          }))
        })
    }
  }, [refresh, character])

  useEffect(() => {
    setValues((state) => ({
      ...state,
      attribute: optionsUsable(values.usable)[0]
    }))
  }, [values.usable])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
      setValues({ ...values, ...data })
    },
    resetInventory: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      stopLoading()
    },
    createInventory: () => {
      startLoading('bar')

      requestAPI('inventory', {
        ...values,
        user: user.id,
        id_character: character.id,
      })
        .create(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          openMessage('success', data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetInventory)
    },
    updateInventory: () => {
      startLoading('bar')

      requestAPI('inventory', {
        ...values,
        user: user.id,
        level: values.level + 1,
      })
        .update(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          openMessage('success', data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetInventory)
    },
    deleteInventory: () => {
      startLoading('bar')

      requestAPI('inventory', {
        ...values,
      })
        .delete(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          openMessage('success', data.message)
        })
        .catch(({ response }) => {
          openMessage('error', response.data.message)
        })
        .finally(handle.resetInventory)
    },
  }

  return (
    <>
      <Modal maxWidth={500} stateModal={[modal, setModal]} onClose={() => setModal(INITIAL.MODAL)}>
        {{
          add_item: (
            <>
              <Title type="h6">
                Adicionar item:
              </Title>
              <Input
                name="name"
                label="Item"
                placeholder="Nome"
                stateValue={[values, setValues]}
              />
              <Radio
                name="usable"
                label="Usável"
                options={INVENTORY.USABLE}
                stateValue={[values, setValues]}
              />
              <TextArea
                name="description"
                placeholder="Descrição"
                stateValue={[values, setValues]}
              />
              <Grid type="row">
                <Grid type="column" padding={[0, 5]}>
                  <Select
                    name="attribute"
                    label="Atributo"
                    options={optionsUsable(values.usable)}
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" padding={[0, 5]}>
                  <Input
                    readOnly
                    type="number"
                    name="level"
                    label="Nível"
                    stateValue={[values, setValues]}
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetInventory}>
                  Cancelar
                </Button>
                <Button type="filled" padding={10} onClick={handle.createInventory}>
                  Criar
                </Button>
              </Box>
            </>
          ),
          detail_item: modal.data.usable ? (
            <>
              <Title type="h6">
                Detalhes do item:
              </Title>
              <Paper backgroundColor="secondary">
                <Text color="primary" fontWeight="bold">
                  {modal.data.name} (Lv {modal.data.level})
                </Text>
                <Text>
                  {modal.data.description}
                </Text>
              </Paper>
              <Paper backgroundColor="secondary" margin="10px 0">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold" color="gray">
                    {modal.data.attribute} 1d6+{modal.data.level}
                  </Text>
                  <Button type="filled" color="success" fontSize="medium" onClick={handle.deleteInventory}>
                    USAR
                  </Button>
                </Box>
              </Paper>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" padding={10} onClick={handle.resetInventory}>
                  Fechar
                </Button>
                <Button type="filled" color="error" padding={10} onClick={handle.deleteInventory}>
                  Remover
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Title type="h6">
                Detalhes do item:
              </Title>
              <Paper backgroundColor="secondary">
                <Text color="primary" fontWeight="bold">
                  {modal.data.name} (Lv {modal.data.level})
                </Text>
                <Text>
                  {modal.data.description}
                </Text>
              </Paper>
              <Paper backgroundColor="secondary" margin="10px 0">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold" color="gray">
                    {pointAttribute(modal.data.attribute, character[ATTRIBUTE.PRIMARY[modal.data.attribute]], modal.data.level)}
                  </Text>
                  <Button type="filled" color="success" fontSize="medium" onClick={handle.updateInventory}>
                    Aprimorar
                  </Button>
                </Box>
              </Paper>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" padding={10} onClick={handle.resetInventory}>
                  Fechar
                </Button>
                <Button type="filled" color="error" padding={10} onClick={handle.deleteInventory}>
                  Remover
                </Button>
              </Box>
            </>
          )
        }}
      </Modal>
      <List height={200} onClick={(row) => handle.openModal('detail_item', row)} {...inventory} />
      <Box display="flex" justifyContent="space-between" margin={10}>
        <Text fontWeight="bold">
          <Text inline color="primary">Capacidade: </Text> {phisicalCapacity(character)}
        </Text>
        <Button type="filled" onClick={() => Boolean(character.id) && handle.openModal('add_item')}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Inventory