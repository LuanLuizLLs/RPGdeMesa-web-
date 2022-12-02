import React, { useState } from 'react'
import { INITIAL } from './initial'
import { Box, Button, List, Select } from '../../../../components'

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