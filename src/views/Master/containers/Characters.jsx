import React, { useContext, useEffect, useState } from 'react'
import theme from '../../../theme'
import Context from '../../../global/context'
import imagePlayer from '../../../assets/img/player.png'
import { requestAPI } from '../../../services/api'
import {
  Box,
  Button,
  Divider,
  Grid,
  Image,
  Input,
  Link,
  Modal,
  Paper,
  Text,
  Title,
} from '../../../components'
import { maxLife } from '../../../utils'

const INITIAL = {
  MODAL: {
    content: '',
    data: {}
  },
  VALUES: {
    id: '',
    name: '',
  },
  REFRESH: null,
  CHARACTERS: {
    0: {
      id: 0,
      name: 'Nome',
      race: 'Raça',
      caste: 'Classe',
      tendency: 'Tendência',
      description: 'Descrição do personagem',
      life: 0,
      coins: 0,
      actions: 0,
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    }
  }
}

function Characters({
  campaign,
}) {

  const { setLoading, setMessage } = useContext(Context)

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [characters, setCharacters] = useState(INITIAL.CHARACTERS)

  useEffect(() => {
    requestAPI('characters', {
      id_campaign: campaign.id
    })
      .read(({ data }) => {
        setCharacters(data.response.length ? Object.assign({}, data.response) : INITIAL.CHARACTERS)
      })
  }, [refresh, campaign.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
      setValues({ ...values, ...data })
    },
    clearValues: () => {
      setValues(INITIAL.VALUES)
    },
    resetCharacter: () => {
      setLoading({})
      setValues(INITIAL.VALUES)
      setModal(INITIAL.MODAL)
    },
    searchCharacter: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('characters', values)
        .read(({ data }) => {
          const [character = {}] = data.response
          setValues({
            ...values,
            ...character,
          })
          setMessage(data.message)
        })
        .finally(() => {
          setLoading({})
        })
    },
    addCharacter: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('characters', {
        ...values,
        id_campaign: campaign.id,
      })
        .update(({ data }) => {
          setRefresh(data.message)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetCharacter)
    },
    removeCharacter: () => {
      setLoading({
        type: 'bar'
      })

      requestAPI('characters', {
        ...values,
        id_campaign: null,
      })
        .update(({ data }) => {
          setRefresh(data.message)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetCharacter)
    },
    updateCharacter: (index) => {
      setLoading({
        type: 'bar'
      })

      requestAPI('characters', characters[index])
        .update(({ data }) => {
          setRefresh(data.message)
          setMessage(data.message)
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
        })
        .finally(handle.resetCharacter)
    },
  }

  return (
    <>
      {Object.values(characters).map((character, i) => (
        <Box
          key={character.id}
          marginTop={10}
          borderRadius={10}
          borderStyle="solid"
          borderColor={theme.primary}
          position="relative"
        >
          <Box position="absolute" top={15} right={20}>
            <Link textDecoration="none" onClick={() => Boolean(character.id) && handle.openModal('remove_character', characters[i])}>
              &#10006;
            </Link>
          </Box>
          <Grid type="container">
            <Grid type="row" alignItems="center" justifyContent="center">
              <Grid type="column" flex="none" padding={[5, 5]}>
                <Paper backgroundColor="secondary" borderRadius="50%">
                  <Image
                    maxHeight={60}
                    maxWidth={60}
                    src={imagePlayer}
                    alt="Armadura de cavaleiro"
                  />
                </Paper>
              </Grid>
              <Grid type="column" padding={[5, 5]} minWidth={280}>
                <Paper backgroundColor="secondary">
                  <Text fontSize="medium">
                    <Link target="_blank" {...Boolean(character.id) && { href: `/player/${character.id}` }}>
                      {character.name}
                    </Link> ({character.race} | {character.caste} | {character.tendency})
                  </Text>
                  <Text fontSize="small" color="gray">
                    {character.description}
                  </Text>
                  <Divider borderStyle="solid" margin="0" />
                  <Grid type="row">
                    <Grid type="column" flex="none" minWidth={100}>
                      <Input
                        index={i}
                        start="❤️"
                        name="life"
                        type="number"
                        fontSize="medium"
                        min={0}
                        max={maxLife(character)}
                        readOnly={!Boolean(character.id)}
                        stateValue={[characters, setCharacters]}
                        onEnter={() => handle.updateCharacter(i)}
                      />
                    </Grid>
                    <Grid type="column" flex="none" minWidth={100}>
                      <Input
                        index={i}
                        start="👣"
                        name="actions"
                        type="number"
                        fontSize="medium"
                        readOnly={!Boolean(character.id)}
                        stateValue={[characters, setCharacters]}
                        onEnter={() => handle.updateCharacter(i)}
                      />
                    </Grid>
                    <Grid type="column" flex="none" minWidth={100}>
                      <Input
                        index={i}
                        start="💰"
                        name="coins"
                        type="number"
                        fontSize="medium"
                        readOnly={!Boolean(character.id)}
                        stateValue={[characters, setCharacters]}
                        onEnter={() => handle.updateCharacter(i)}
                      />
                    </Grid>
                  </Grid>
                  <Divider borderStyle="solid" margin="10px 0 0" />
                  <Grid type="row">
                    <Grid type="column" flex="none" padding={[5, 10]}>
                      <Text fontSize="medium">
                        💪 FOR {character.strength} | 👋 DES {character.dexterity} | ✊ CON {character.constitution}
                      </Text>
                    </Grid>
                    <Grid type="column" flex="none" padding={[5, 10]}>
                      <Text fontSize="medium">
                        📙 INT {character.intelligence} | 🙌 SAB {character.wisdom} | 🤝 CAR {character.charisma}
                      </Text>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Modal maxWidth={350} stateModal={[modal, setModal]} onClose={handle.resetCharacter}>
        {{
          add_character: (
            <>
              <Title type="h6">
                Adicionar personagem:
              </Title>
              <Box marginBottom={20}>
                <Input
                  name={Boolean(values.name) ? 'name' : 'id'}
                  label="Personagem"
                  placeholder="ID do personagem"
                  onEnter={handle.searchCharacter}
                  stateValue={[values, setValues]}
                  readOnly={Boolean(values.name)}
                />
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button type="filled" color="secondary" width="fit-content" padding={10} onClick={Boolean(values.name) ? handle.clearValues : handle.resetCharacter}>
                  {Boolean(values.name) ? 'Limpar' : 'Cancelar'}
                </Button>
                <Button type="filled" width="fit-content" padding={10} onClick={Boolean(values.name) ? handle.addCharacter : handle.searchCharacter}>
                  {Boolean(values.name) ? 'Confirmar' : 'Pesquisar'}
                </Button>
              </Box>
            </>
          ),
          remove_character: (
            <>
              <Title type="h6">
                Remover personagem:
              </Title>
              <Text>
                Tem certeza que deseja remover <b>{modal.data.name}</b> da campanha?
              </Text>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="bottomless" width="fit-content" padding={10} onClick={handle.resetCharacter}>
                  Cancelar
                </Button>
                <Button type="filled" color="error" width="fit-content" padding={10} onClick={handle.removeCharacter}>
                  Remover
                </Button>
              </Box>
            </>
          )
        }}
      </Modal>
      <Box display="flex" justifyContent="flex-end">
        <Button type="filled" padding={10} onClick={() => handle.openModal('add_character')}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Characters