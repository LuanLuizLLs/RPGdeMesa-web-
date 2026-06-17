import { characterStore } from 'pages/Player/utils/store'
import { useFeatures } from './hooks/useFeatures'
import { Modals } from './components/Modals'
import { Box, Button, List, Modal } from 'components'
import useStore from 'hooks/useStore'

function Features() {
	const { list, handle, stateModal, stateValues } = useFeatures()

	const CHARACTER = useStore(characterStore)

	return (
		<>
			<Modal maxWidth={500} stateModal={stateModal} onClose={handle.resetFeature}>
				{Modals({ handle, stateModal, stateValues })}
			</Modal>
			<List
				{...list}
				height={200}
				onClick={(row) => handle.openModal('read_feature', row)}
				actions={{
					update: (row) => handle.openModal('update_feature', row),
					delete: (row) => handle.openModal('delete_feature', row),
				}}
			/>
			<Box display="flex" justifyContent="flex-end" margin={10}>
				<Button type="filled" onClick={() => Boolean(CHARACTER.id) && handle.openModal('create_feature')}>
          Adicionar
				</Button>
			</Box>
		</>
	)
}

export default Features