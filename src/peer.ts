import { Peer } from 'peerjs'

export const peer = new Peer({
  host: 'localhost',
  port: 9000,
  path: '/',
  debug: 2,
})
