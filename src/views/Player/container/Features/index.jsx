import React from 'react'
import { useSelector } from 'react-redux'
import { useFeatures } from './hooks/useFeatures'
import { Modals } from './components/Modals'
import { Box, Button, List, Modal } from '../../../../components'

function Features() {
	const { list, handle, stateModal, stateValues } = useFeatures()
	const { CHARACTER } = useSelector(({ reducer }) => reducer)

	return (
		<>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetFeature}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
			<List
				{...list}
				height={200}
				onClick={(row) => handle.openModal('detail_feature', row)}
			/>
			<Box display="flex" justifyContent="flex-end" margin={10}>
				<Button type="filled" onClick={() => Boolean(CHARACTER.id) && handle.openModal('add_feature')}>
          Adicionar
				</Button>
			</Box>
		</>
	)
}

export default Features