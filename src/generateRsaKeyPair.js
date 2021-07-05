const forge = require('node-forge');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const rsaGenerateKeyPair = promisify(forge.pki.rsa.generateKeyPair);

const generateRsaKeyPair = async () => {
    const { publicKey, privateKey } = await rsaGenerateKeyPair({bits: 2048, workers: 2});
    const pathFilePublicKey = path.resolve(__dirname, 'keys', 'public.pem');
    const pathFilePrivateKey = path.resolve(__dirname, 'keys', 'private.pem');
    fs.writeFileSync(pathFilePublicKey, forge.pki.publicKeyToPem(publicKey));
    fs.writeFileSync(pathFilePrivateKey, forge.pki.privateKeyToPem(privateKey));
}

generateRsaKeyPair().then(() => console.log('Done!'));