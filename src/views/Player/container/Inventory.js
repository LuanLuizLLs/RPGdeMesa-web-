import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../global/context'
import { requestAPI } from '../../../services/api'
import { ATTRIBUTE, INVENTORY } from '../../../configs'
import {
  Box,
  Button,
  Grid,
  Input,
  List,
  Modal,
  Paper,
  Select,
  Text,
  TextArea,
  Title,
} from '../../../components'
import { formatAttribute, phisicalCapacity } from '../../../utils'

const INITIAL = {
  MODAL: {
    content: '',
    data: {},
  },
  VALUES: {
    name: '',
    description: '',
    attribute: 'FOR',
    usable: 'Não',
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

const identifyUsable = (value = '') => {
  return INVENTORY.USABLE.indexOf(value)
}

function Inventory({
  user,
  character,
  setRefreshCharacter,
}) {

  const { setLoading, setMessage } = useContext(Context)

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

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
    },
    resetInventory: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
      setLoading({})
    },
    createInventory: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('inventory', {
        ...values,
        user: user.id,
        id_character: character.id,
        usable: identifyUsable(values.usable),
      })
        .create(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetInventory)
    },
    updateInventory: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('inventory', {
        ...values,
        user: user.id,
        id_character: character.id,
        level: values.level + 1,
      })
        .update(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetInventory)
    }
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
              <Select
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
                    options={INVENTORY.ATTRIBUTES[identifyUsable(values.usable)]}
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
              USÁVEL
            </>
          ) : (
            <>
              <Title type="h6">
                Detalhes da habilidade:
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
                <Box display="flex" justifyContent="space-between">
                  <Text fontWeight="bold" color="gray">
                    {formatAttribute(modal.data.attribute, modal.data.level+character[ATTRIBUTE.PRIMARY[modal.data.attribute]])}
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
                <Button type="filled" color="error" padding={10} onClick={() => null}>
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