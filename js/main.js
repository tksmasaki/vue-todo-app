const items = JSON.parse(localStorage.getItem('items')) ?? {}
if (localStorage.getItem('nextId') === null) localStorage.setItem('nextId', '1')

// console.log(items)

const app = {
  data: () => ({
    items,
    newItem: '',
    editTarget: ''
  }),
  methods: {
    addItem () {
      if (this.newItem === '') return

      let nextId = localStorage.getItem('nextId')
      this.items[nextId] = this.newItem
      nextId = (parseInt(nextId) + 1).toString()
      localStorage.setItem('items', JSON.stringify(this.items))
      localStorage.setItem('nextId', nextId)
      this.newItem = ''
      console.log('added item')
    },
    editItem (id) {
      this.editTarget = { id: id, value: this.items[id] }
      console.log(`edit id:${id}`)
    },
    updateItem () {
      this.items[this.editTarget.id] = this.editTarget.value
      localStorage.setItem('items', JSON.stringify(this.items))
      this.editTarget = ''
      console.log('edited item')
    },
    stopEdit () {
      this.editTarget = ''
      console.log('stop edit')
    },
    deleteItem (id) {
      delete this.items[id]
      localStorage.setItem('items', JSON.stringify(this.items))
      console.log(`deleted id:${id}`)
    }
  },
}
Vue.createApp(app).mount('#app')
