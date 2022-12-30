import React, { useEffect, useState } from 'react'
import { INITIAL } from './initial'
import {
  Box,
  Button,
  Grid,
  Input,
  List,
  Modal,
  TextArea,
  Title,
} from '../../../../components'

function Interaction() {

  const [list, setList] = useState(INITIAL.LIST)
  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)

  useEffect(() => {
    setList((state) => ({
      ...state,
      rows: [{
        id: 'ID',
        name: 'Interação',
        description: 'Descrição',
        category: 'Personagem',
        level: 'Nível',
      }],
    }))
  }, [])

  const handle = {
    openModal: (content, data = {}) => {
      setModal({ content, data })
      setValues({ ...values, ...data })
    },
    resetInteraction: () => {
      setModal(INITIAL.MODAL)
      setValues(INITIAL.VALUES)
    },
  }

  return (
    <>
      <List
        {...list}
        height={200}
        onClick={(row) => console.log(row)}
      />
      <Box display="flex" justifyContent="end" margin={10}>
        <Button type="filled" onClick={() => handle.openModal('add_interaction')}>
          Adicionar
        </Button>
      </Box>
      <Modal maxWidth={500} stateModal={[modal, setModal]} onClose={handle.resetInteraction}>
        {{
          add_interaction: (
            <>
              <Title type="h6">
                Adicionar interação:
              </Title>
              <Input
                name="name"
                placeholder="Nome"
                stateValue={[values, setValues]}
              />
              <TextArea
                name="description"
                placeholder="Descrição"
                stateValue={[values, setValues]}
              />
              <Grid type="container">
                <Grid type="row" padding={[5, 0]}>
                  <Grid type="column" margin={[0, 5]}>
                    <Input
                      start="❤️"
                      name="life"
                      label="Vida"
                      type="number"
                      stateValue={[values, setValues]}
                    />
                  </Grid>
                  <Grid type="column" margin={[0, 5]}>
                    <Input
                      start="🩸"
                      type="number"
                      label="Dano"
                      name="damage"
                      stateValue={[values, setValues]}
                    />
                  </Grid>
                </Grid>
                <Grid type="row" padding={[5, 0]}>
                  <Grid type="column" margin={[0, 5]}>
                    <Input
                      start="💪"
                      type="number"
                      name="strength"
                      stateValue={[values, setValues]}
                    />
                  </Grid>
                  <Grid type="column" margin={[0, 5]}>
                    <Input
                      start="👋"
                      type="number"
                      name="dexterity"
                      stateValue={[values, setValues]}
                    />
                  </Grid>
                  <Grid type="column" margin={[0, 5]}>
                    <Input
                      start="✊"
                      type="number"
                      name="constitution"
                      stateValue={[values, setValues]}
                    />
                  </Grid>
                </Grid>
                <Grid type="row">
                  <Grid type="column" margin={[0, 5]}>
                    <Input
                      start="📙"
                      type="number"
                      name="intelligence"
                      stateValue={[values, setValues]}
                    />
                  </Grid>
                  <Grid type="column" margin={[0, 5]}>
                    <Input
                      start="🙌"
                      type="number"
                      name="wisdom"
                      stateValue={[values, setValues]}
                    />
                  </Grid>
                  <Grid type="column" margin={[0, 5]}>
                    <Input
                      start="🤝"
                      type="number"
                      name="charisma"
                      stateValue={[values, setValues]}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" marginTop={10}>
                <Button type="filled" color="secondary" padding={10} onClick={() => null}>
                  Cancelar
                </Button>
                <Button type="filled" padding={10} onClick={() => null}>
                  Criar
                </Button>
              </Box>
            </>
          )
        }}
      </Modal>
    </>
  )
}

export default Interaction