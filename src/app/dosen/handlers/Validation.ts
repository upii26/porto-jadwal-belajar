export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateNoDosen = (noDosen: string): boolean => {
  // No Dosen harus diawali dengan D dan diikuti angka
  const noDosenRegex = /^D[0-9]{3,}$/
  return noDosenRegex.test(noDosen)
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength
}

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength
}