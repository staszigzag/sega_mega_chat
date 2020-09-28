export const required = v => (!!v && !!v.trim()) || 'Это поле обязательно'
export const onlyString = v => (typeof v === 'string' && /^[а-яА-ЯёЁa-zA-Z0-9]+$/.test(v)) || 'Это поле только для букв и цифр'

export const creatorMinLength = n => {
  return v => (!!v && v.length >= n) || 'Минимальное количество символов ' + n
}
export const creatorMaxLength = n => {
  return v => (!!v && v.length <= n) || 'Максимальное количество символов ' + n
}
export const creatorExistRoomName = rooms => {
  return v => !rooms.find(r => r.name === v) || 'Комната с таким именем уже существует'
}
