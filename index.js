const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const WS = require('libp2p-websockets')

const MPLEX = require('libp2p-mplex')
const {NOISE} = require('libp2p-noise')
const MulticastDNS = require('libp2p-mdns')
const DHT = require('libp2p-kad-dht')
const GossipSub = require('libp2p-gossipsub')


async function startNode(){
  const transportKey = WS.prototype[Symbol.toStringTag]
  const node = await Libp2p.create({
    modules: {
      transport: [
        TCP,
        WS
      ],
      streamMuxer: [MPLEX],
      connEncryption: [NOISE],
      peerDiscovery: [MulticastDNS],
      dht: DHT,
      pubsub: GossipSub
    },
    config: {
      peerDiscovery: {
        autoDial: true,
        [MulticastDNS.tag]: {
          interval: 1000,
          enabled: true
        }
      }
    }
  })
  node.on('peer:discovery', (peer) => {
    console.log('Discovered %s', peer.id.toB58String()) // Log discovered peer
  })


  await node.start()
  console.log("Started node")
}

startNode()
