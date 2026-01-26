export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  export const validateNIM = (nim: string): boolean => {
    // NIM harus berupa angka dan minimal 7 digit
    const nimRegex = /^[0-9]{7,}$/
    return nimRegex.test(nim)
  }
  
  export const validatePhoneNumber = (phone: string): boolean => {
    // Nomor telepon Indonesia (08xx atau +62)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
    return phoneRegex.test(phone)
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