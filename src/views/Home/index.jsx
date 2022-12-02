import React from 'react'
import Page from '../../layouts/Page'
import Campaigns from './container/Campaigns'
import Characters from './container/Characters'
import { Grid } from '../../components'
import { useSelector } from 'react-redux'

function Home() {

  const { USER } = useSelector(({ reducer }) => reducer)

  return (
    <Page tab="Home">
      <Grid type="container" padding={[0, 20]}>
        <Grid type="row">
          <Grid type="column" padding={[20, 20]} minWidth={300}>
            <Campaigns user={USER} />
          </Grid>
          <Grid type="column" padding={[20, 20]} minWidth={300}>
            <Characters user={USER} />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
}

export default Home