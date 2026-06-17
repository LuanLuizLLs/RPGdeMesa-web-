import { useSyncExternalStore } from 'react'

export class Store {
	storage = {}
	listeners = new Set()

	constructor (storage = {}) {
		this.storage = storage
	}

	subscribe = (listener) => {
		this.listeners.add(listener)
		return () => {
			this.listeners.delete(listener)
		}
	}
	lister = () => {
		this.listeners.forEach((listener) => {
			listener()
		})
	}
	reset = () => {
		this.storage = {}
	}
	set = (data = {}) => {
		this.storage = { ...this.storage, ...data }
		this.lister()
	}
	get = () => {
		return this.storage
	}
}

function useStore(store) {
	return useSyncExternalStore(store.subscribe, store.get)
}

export default useStore