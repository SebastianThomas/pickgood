import { DisconnectDescription } from 'socket.io-client/build/esm/socket'

export const ConnectedStatus: Status = {
  displayString: 'Zum Server verbunden',
  status: true,
  color: 'green',
}
export const DisconnectedStatus: Status = {
  displayString: 'Konnte nicht zum Server verbinden',
  status: false,
  color: 'red',
  reason: 'Connecting to Server...',
}

export type Status = {
  color: string
  displayString: string
} & (
  | {
      status: true
    }
  | { status: false; reason: string; description?: DisconnectDescription }
)
