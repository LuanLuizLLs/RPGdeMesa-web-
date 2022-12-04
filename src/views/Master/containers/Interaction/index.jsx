import React, { useEffect, useState } from 'react'
import { INITIAL } from './initial'
import { INTERACTION } from '../../../../constants'
import {
  Box,
  Button,
  Grid,
  Input,
  List,
  Modal,
  Select,
  TextArea,
  Title,
} from '../../../../components'

function Interaction() {

  const [list, setList] = useState(INITIAL.LIST)
  const [modal, setModal] = useState(INITIAL.MODAL)
  const [values, setValues] = useState(INITIAL.VALUES)
  const [filter, setFilter] = useState(INITIAL.FILTER)

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

  return (
    <>
      <List
        {...list}
        height={200}
        onClick={(row) => console.log(row)}
      />
      <Box display="flex" justifyContent="space-between" margin={10}>
        <Select
          noLabel
          name="category"
          placeholder="Todos"
          options={INTERACTION.CATEGORY}
          stateValue={[filter, setFilter]}
        />
        <Button type="filled" onClick={() => { }}>
          Adicionar
        </Button>
      </Box>
      <Modal maxWidth={500} stateModal={[modal, setModal]} onClose={() => null}>
        {{
          add_interaction: (
            <>
              <Title type="h6">
                Adicionar interação:
              </Title>
              <Select
                label="Categoria"
                name="category"
                options={INTERACTION.CATEGORY}
                stateValue={[values, setValues]}
              />
              <Input
                label="Nome"
                name="name"
                placeholder="Nome da interação"
                stateValue={[values, setValues]}
              />
              <TextArea
                label="Descrição"
                name="description"
                placeholder="Descrição da interação"
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