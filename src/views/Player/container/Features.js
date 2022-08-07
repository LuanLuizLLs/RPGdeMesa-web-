import React, { useContext, useEffect, useState } from 'react'
import API from '../../../services/api'
import Context from '../../../global/context'
import {
  Box,
  Button,
  Grid,
  Input,
  List,
  Modal,
  Text,
  Title,
} from '../../../components'
import theme from '../../../theme'

const INITIAL = {
  MODAL: {
    content: '',
    data: {},
  },
  VALUES: {
    name: '',
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  REFRESH: null,
  FEATURES: [],
}

const formatAttribute = (text = '', point = 0) => {
  const attribute = { text, point }
  if (attribute.point) {
    attribute.point = attribute.point > 0 ? `+${attribute.point}` : `${attribute.point}`
    return `${attribute.point} ${attribute.text} `
  }
  return ''
}

function Features({
  character,
  setRefreshCharacter,
}) {

  const setMessage = useContext(Context).message[1]
  
  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [features, setFeatures] = useState(INITIAL.FEATURES)

  useEffect(() => {
    API.get('features/read', {
      params: { 
        id_character: character.id 
      }
    })
      .then(({ data }) => {
        setFeatures(data.response.map(({
          id, name, strength, dexterity, constitution, intelligence, wisdom, charisma,
        }) => ({
          id, name, strength, dexterity, constitution, intelligence, wisdom, charisma,
        })))
      })
  }, [refresh, character.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({
        content, data,
      })
    },
    resetFeature: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
    },
    createFeature: () => {
      API.post('features/create', {
        id_character: character.id,
        ...values,
      })
        .then(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          setMessage(data.message)
        })
        .catch(() => {
          setMessage({
            type: 'error',
            message: 'Erro ao criar a característica',
          })
        })
        .finally(handle.resetFeature)
    },
    deleteFeature: (id) => {
      API.delete(`features/delete/${id}`)
        .then(({ data }) => {
          setRefresh(data)
          setRefreshCharacter(data)
          setMessage(data.message)
        })
        .finally(handle.resetFeature)
    }
  }

  return (
    <>
      <Modal maxWidth={500} stateModal={[modal, setModal]}>
        {({
          add_feature: (
            <>
              <Title type="h6">
                Adicionar característica:
              </Title>
              <Input
                name="name"
                placeholder="Característica"
                stateValue={[values, setValues]}
              />
              <Grid type="row">
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="💪"
                    type="number"
                    name="strength"
                    placeholder="FOR"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="👋"
                    type="number"
                    name="dexterity"
                    placeholder="DES"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="✊"
                    type="number"
                    name="constitution"
                    placeholder="CON"
                    stateValue={[values, setValues]}
                  />
                </Grid>
              </Grid>
              <Grid type="row">
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="📙"
                    type="number"
                    name="intelligence"
                    placeholder="INT"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="🙌"
                    type="number"
                    name="wisdom"
                    placeholder="SAB"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="🤝"
                    type="number"
                    name="charisma"
                    placeholder="CAR"
                    stateValue={[values, setValues]}
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end">
                <Button type="filled" color="secondary" padding={10} onClick={handle.resetFeature}>
                  Cancelar
                </Button>
                <Button type="filled" padding={10} onClick={handle.createFeature}>
                  Criar
                </Button>
              </Box>
            </>
          ),
          detail_feature: (
            <>
              <Box backgroundColor={theme.secondary} padding="0 10px" margin={10} borderRadius={10}>
                <Text fontWeight="bold" fontSize="larger" color="primary">
                  {modal.data.name}
                </Text>
                <Text fontWeight="bold" color="gray">
                  {formatAttribute('FOR', modal.data.strength)}
                  {formatAttribute('DES', modal.data.dexterity)}
                  {formatAttribute('CON', modal.data.constitution)}
                  {formatAttribute('INT', modal.data.intelligence)}
                  {formatAttribute('SAB', modal.data.wisdom)}
                  {formatAttribute('CAR', modal.data.charisma)}
                </Text>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button type="filled" padding={10} onClick={handle.resetFeature}>
                  Voltar
                </Button>
                <Button type="filled" color="error" padding={10} onClick={() => handle.deleteFeature(modal.data.id)}>
                  Remover
                </Button>
              </Box>
            </>
          ),
        })[modal.content] || 'Conteúdo não encontrado...'}
      </Modal>
      <List
        height={200}
        rows={features}
        onClick={(row) => handle.openModal('detail_feature', row)}
        columns={['ID', 'Característica', 'FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR']}
      />
      <Box display="flex" justifyContent="flex-end" margin={10}>
        <Button type="filled" onClick={() => handle.openModal('add_feature')}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Features