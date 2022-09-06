type Configuration = {
  dao: {
    useParanoidTables: boolean
  }
  types: {
    product: {}
  }
  auth: {
    saltRounds: number
    expiresInSecondsRefreshToken: number
  }
}

export default Configuration
