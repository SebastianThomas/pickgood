export const ConnectedStatus = {
  displayString: 'Zum Server verbunden',
  color: 'green',
}
export const DisconnectedStatus = {
  displayString: 'Konnte nicht zum Server verbinden',
  color: 'red',
}

export type Status = {
  color: string
  displayString: string
}
