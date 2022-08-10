import React, { useContext, useEffect, useState } from 'react'
import API from '../../../services/api'
import Context from '../../../global/context'
import theme from '../../../theme'
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
    return `${attribute.text}${attribute.point} `
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
        id_character: character.id,
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
              <Title type="h6" color="primary">
                Adicionar característica:
              </Title>
              <Input
                name="name"
                placeholder="Característica (adjetivo)"
                stateValue={[values, setValues]}
              />
              <Grid type="row" padding={[5, 0]}>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="💪"
                    label="FOR"
                    type="number"
                    name="strength"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="👋"
                    label="DES"
                    type="number"
                    name="dexterity"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="✊"
                    label="CON"
                    type="number"
                    name="constitution"
                    stateValue={[values, setValues]}
                  />
                </Grid>
              </Grid>
              <Grid type="row">
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="📙"
                    label="INT"
                    type="number"
                    name="intelligence"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="🙌"
                    label="SAB"
                    type="number"
                    name="wisdom"
                    stateValue={[values, setValues]}
                  />
                </Grid>
                <Grid type="column" margin={[0, 5]}>
                  <Input
                    icon="🤝"
                    label="CAR"
                    type="number"
                    name="charisma"
                    stateValue={[values, setValues]}
                  />
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
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
              <Title type="h6" color="primary" >
                {modal.data.name}
              </Title>
              <Box backgroundColor={theme.secondary} padding={10} margin="10px 0" borderRadius={10}>
                <Text fontWeight="bold">
                  <Text inline display="inline">
                    {formatAttribute('💪 FOR', modal.data.strength)}
                  </Text>
                  <Text inline display="inline">
                    {formatAttribute('👋 DES', modal.data.dexterity)}
                  </Text>
                  <Text inline display="inline">
                    {formatAttribute('✊ CON', modal.data.constitution)}
                  </Text>
                </Text>
                <Text fontWeight="bold">
                  <Text inline display="inline">
                    {formatAttribute('📙 INT', modal.data.intelligence)}
                  </Text>
                  <Text inline display="inline">
                    {formatAttribute('🙌 SAB', modal.data.wisdom)}
                  </Text>
                  <Text inline display="inline">
                    {formatAttribute('🤝 CAR', modal.data.charisma)}
                  </Text>
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