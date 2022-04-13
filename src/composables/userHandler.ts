const userInfo = ref({})
const token = useLocalStorage('token', '')

export {
  userInfo,
  token,
}
