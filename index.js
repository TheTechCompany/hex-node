const PeerId = require('peer-id')
const MDNS = require('libp2p-mdns')

let peer = PeerId.create()
const mdns = new MDNS({peerId: peer})

mdns.on('peer', (peerData) => {
    console.log('Found a peer in the local network', peerData.id.toB58String(), peerData.multiaddrs)

})

mdns.start()

