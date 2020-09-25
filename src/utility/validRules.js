export const required = v => (!!v && !!v.trim()) || 'Это поле обязательно'
export const onlyString = v => typeof v === 'string' || 'Это поле только для строк'

export const creatorMinLength = n => {
  return v => (!!v && v.length >= n) || 'Минимальное количество символов ' + n
}
export const creatorMaxLength = n => {
  return v => (!!v && v.length <= n) || 'Максимальное количество символов ' + n
}
