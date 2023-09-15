import { defineStore } from 'pinia'

export const useKeepAiveStore = defineStore('keepAlive', {
  state() {
    return {
      keepAliveList: ['MainView']
    }
  },
  actions: {
    add(name: any) {
      this.keepAliveList.push(name)
    },
    remove(name: any) {
      this.keepAliveList = this.keepAliveList.filter((item) => item !== name)
    },
    clear() {
      this.keepAliveList = []
    }
  }
})
