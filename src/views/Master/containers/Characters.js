import React, { useContext, useEffect, useState } from 'react'
import theme from '../../../theme'
import API from '../../../services/api'
import Context from '../../../global/context'
import imagePlayer from '../../../assets/img/player.png'
import {
  Box,
  Button,
  Divider,
  Grid,
  Image,
  Input,
  Link,
  Modal,
  Text,
  Title,
} from '../../../components'

const INITIAL = {
  MODAL: {
    content: '',
    data: {}
  },
  VALUES: {
    search_character: ''
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
  campaing,
}) {

  const setMessage = useContext(Context).message[1]
  const setLoading = useContext(Context).loading[1]

  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [refresh, setRefresh] = useState(INITIAL.REFRESH)
  const [characters, setCharacters] = useState(INITIAL.CHARACTERS)

  useEffect(() => {
    API.get('/characters/read', {
      params: {
        id_campaing: campaing.id
      }
    })
      .then(({ data }) => {
        if (data.response.length) {
          setCharacters(Object.assign({}, data.response))
        }
      })
  }, [refresh, campaing.id])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({
        content, data
      })
    },
    resetCharacter: () => {
      setLoading({})
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
    },
    searchCharacter: () => {
      setLoading({
        type: 'circular'
      })

      API.get(`/characters/read/${values.search_character}`)
        .then(({ data }) => {
          const [character] = data.response
          setValues({
            ...character,
            search_character: character.name
          })
        })
        .finally(handle.resetCharacter)
    },
    addCharacter: () => {
      setLoading({
        type: 'circular'
      })

      API.patch(`/characters/updateCharacter/${values.id}`, {
        ...values,
        id_campaing: campaing.id,
      })
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh(data)
        })
        .finally(handle.resetCharacter)
    },
    removeCharacter: (data) => {
      setLoading({
        type: 'circular'
      })
      
      API.patch(`/characters/updateCharacter/${data.id}`, {
        ...data,
        id_campaing: null,
      })
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh(data)
        })
        .finally(handle.resetCharacter)
    },
    updateCharacter: (index) => {
      setLoading({
        type: 'circular'
      })

      API.patch(`/characters/updateCharacter/${characters[index].id}`, characters[index])
        .then(({ data }) => {
          setMessage(data.message)
          setRefresh(data)
        })
        .finally(handle.resetCharacter)
    },
    detailCharacter: (character) => {
      console.log(character)
    },
  }

  return (
    <>
      {Object.values(characters).map(({
        id,
        name,
        race,
        caste,
        tendency,
        description,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
      }, i) => (
        <Box key={id} borderStyle="solid" borderRadius={10} marginTop={10} borderColor={theme.primary} position="relative">
          <Box position="absolute" top={15} right={20}>
            <Link textDecoration="none" onClick={() => handle.openModal('removeCharacter_character', characters[i])}>
              &#10006;
            </Link>
          </Box>
          <Grid type="container">
            <Grid type="row" alignItems="center" justifyContent="center">
              <Grid type="column" flex="none" padding={[5, 5]}>
                <Box background={theme.secondary} borderRadius="50%" overflow="hidden">
                  <Image
                    maxHeight={60}
                    maxWidth={60}
                    src={imagePlayer}
                    alt="armadura de cavaleiro"
                  />
                </Box>
              </Grid>
              <Grid type="column" padding={[5, 5]} minWidth={280}>
                <Box background={theme.secondary} padding={10} borderRadius={10}>
                  <Text fontSize="medium">
                    <Link onClick={() => handle.detailCharacter(characters[i])}>
                      {name}
                    </Link> ({race} | {caste} | {tendency})
                  </Text>
                  <Text fontSize="small" color="gray">
                    {description}
                  </Text>
                  <Divider borderStyle="solid" margin="0" />
                  <Grid type="row">
                    <Grid type="column" flex="none" minWidth={100}>
                      <Input
                        index={i}
                        icon="❤️"
                        name="life"
                        type="number"
                        fontSize="medium"
                        stateValue={[characters, setCharacters]}
                        onEnter={() => handle.updateCharacter(i)}
                      />
                    </Grid>
                    <Grid type="column" flex="none" minWidth={100}>
                      <Input
                        index={i}
                        icon="👣"
                        name="actions"
                        type="number"
                        fontSize="medium"
                        stateValue={[characters, setCharacters]}
                        onEnter={() => handle.updateCharacter(i)}
                      />
                    </Grid>
                    <Grid type="column" flex="none" minWidth={100}>
                      <Input
                        index={i}
                        icon="💰"
                        name="coins"
                        type="number"
                        fontSize="medium"
                        stateValue={[characters, setCharacters]}
                        onEnter={() => handle.updateCharacter(i)}
                      />
                    </Grid>
                  </Grid>
                  <Divider borderStyle="solid" margin="10px 0 0" />
                  <Grid type="row">
                    <Grid type="column" flex="none" padding={[5, 10]}>
                      <Text fontSize="medium">
                        💪 FOR {strength} | 👋 DES {dexterity} | ✊ CON {constitution}
                      </Text>
                    </Grid>
                    <Grid type="column" flex="none" padding={[5, 10]}>
                      <Text fontSize="medium">
                        📙 INT {intelligence} | 🙌 SAB {wisdom} | 🤝 CAR {charisma}
                      </Text>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Modal maxWidth={300} stateModal={[modal, setModal]}>
        {({
          addCharacter_character: (
            <>
              <Title type="h6">
                Adicionar personagem
              </Title>
              <Box marginBottom={20}>
                <Input
                  readOnly={Boolean(values.name)}
                  name="search_character"
                  label="Personagem"
                  placeholder="ID do personagem"
                  onEnter={handle.searchCharacter}
                  stateValue={[values, setValues]}
                />
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <Button type="outline" width="fit-content" padding={10} onClick={handle.resetCharacter}>
                  Limpar
                </Button>
                <Button type="filled" width="fit-content" disabled={Boolean(!values.name)} padding={10} onClick={handle.addCharacter}>
                  Confirmar
                </Button>
              </Box>
            </>
          ),
          removeCharacter_character: (
            <>
              <Text>
                Tem certeza que deseja removeCharacterr <b>{modal.data.name}</b> da campanha?
              </Text>
              <Box display="flex" justifyContent="flex-end">
                <Button type="outline" width="fit-content" padding={10} onClick={handle.resetCharacter}>
                  Cancelar
                </Button>
                <Button type="filled" color="error" width="fit-content" padding={10} onClick={() => handle.removeCharacter(modal.data)}>
                  Remover
                </Button>
              </Box>
            </>
          )
        })[modal.content] || 'Conteúdo não encontrado...'}
      </Modal>
      <Box display="flex" justifyContent="flex-end">
        <Button type="filled" padding={10} onClick={() => handle.openModal('addCharacter_character')}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Characters