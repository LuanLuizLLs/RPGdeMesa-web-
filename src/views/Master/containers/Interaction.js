import React, { useState } from 'react'
import { Box, Button, List, Select } from '../../../components'

const INITIAL = {
  VALUES: {
    filter: 'Humanoides',
  },
  INTERACTION: {
    columns: {
      id: 'ID',
      name: 'Interação',
      description: 'Descrição',
      level: 'Nível',
    },
    rows: [],
  } 
}

function Interaction() {

  const [values, setValues] = useState(INITIAL.VALUES)
  const [interaction, ] = useState(INITIAL.INTERACTION)

  return (
    <>
      <List
        height={200}
        onClick={(row) => console.log(row)}
        {...interaction}
      />
      <Box display="flex" justifyContent="space-between" margin={10}>
        <Select
          name="filter"
          options={[
            'Humanoides',
            'Animais',
            'Monstros'
          ]}
          stateValue={[values, setValues]}
        />
        <Button type="filled" onClick={() => {}}>
          Adicionar
        </Button>
      </Box>
    </>
  )
}

export default Interaction