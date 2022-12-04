import React, { useState } from 'react'
import { INITIAL } from './initial'
import { Box, Button, List, Select } from '../../../../components'
import { INTERACTIONS } from '../../../../constants'

function Interaction() {

  const [list, ] = useState(INITIAL.LIST)
  const [values, setValues] = useState(INITIAL.VALUES)

  return (
    <>
      <List
        height={200}
        onClick={(row) => console.log(row)}
        {...list}
      />
      <Box display="flex" justifyContent="space-between" margin={10}>
        <Select
          noLabel
          name="filter"
          placeholder="Todos"
          options={INTERACTIONS.FILTERS}
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