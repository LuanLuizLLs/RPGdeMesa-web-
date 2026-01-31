import { useNotifications } from './hooks/useNotifications'
import { Modals } from './components/Modals'
import { Modal } from 'components'
import { TEXT } from './utils/constants'
import classes from './style.module.css'

export function Notifications() {
	const { handle, stateModal, stateList } = useNotifications()

	const [list = []] = stateList

	const hasNotification = Boolean(list?.length)

	return (
		<div className={classes.container}>
			<div className={classes.notification} data-signal={hasNotification}>
				<span className={classes.icon} />
				<div className={classes.inbox}>
					{list.map((item) => (
						<p
							key={item.id}
							className={classes.message}
							onClick={() => {
								handle.openModal(item.type, item.data, item)
							}}
						>
							{TEXT[item.type]}
						</p>
					))}
				</div>
			</div>
			<Modal maxWidth={350} stateModal={stateModal} onClose={handle.closeModal}>
				{Modals({ handle, stateModal })}
			</Modal>
		</div>

	)
}