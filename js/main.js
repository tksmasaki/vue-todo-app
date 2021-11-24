if (localStorage.getItem('nextId') === null) localStorage.setItem('nextId', '1')

const app = {
  data: () => ({
    items: JSON.parse(localStorage.getItem('items')) ?? {},
    newItem: '',
    editTarget: null
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
    },
    editItem (id) {
      this.editTarget = { id: id, value: this.items[id] }
    },
    updateItem () {
      this.items[this.editTarget.id] = this.editTarget.value
      localStorage.setItem('items', JSON.stringify(this.items))
      this.editTarget = null
    },
    cancelEdit () {
      this.editTarget = null
    },
    deleteItem (id) {
      if (confirm('Are you sure to delete?')) {
        delete this.items[id]
        localStorage.setItem('items', JSON.stringify(this.items))
      }
    }
  }
}
Vue.createApp(app).mount('#app')
