export default (store) => (next) => (action) => {
  console.log('---', 'before', action.type, store.getState())
  console.log('---', 'dispatching', action)
  next(action)
  console.log('---', 'after', action.type, store.getState())
}
