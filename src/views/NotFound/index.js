import React from 'react'
import Logo from '../../assets/img/logo.png'
import {
  Grid,
  Title,
  Image,
} from '../../components'

function NotFound() {
  return (
    <Grid type="container">
      <Grid type="row" flexDirection="column" alignItems="center">
        <Grid type="column">
          <Image
            src={Logo}
            maxHeight={120}
            maxWidth={120}
            alt="Logo de RPG"
          />
        </Grid>
        <Grid type="column" padding={[20, 20]}>
          <Title type="h6" color="white" textAlign="center">
            Página não encontrada...
          </Title>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NotFound