const forge = require('node-forge')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const myArgs = process.argv.slice(2);

function encryptFromPem(message) {
    const pathFilePublicKey = path.resolve(__dirname, 'keys', 'public.pem')
    const pem = fs.readFileSync(pathFilePublicKey, 'utf8').toString()
    const publicKey = forge.pki.publicKeyFromPem(pem)
    return forge.util.encode64(publicKey.encrypt(message));
}

function decryptFromPem(encryptedMessage) {
    const pathFilePrivateKey = path.resolve(__dirname, 'keys', 'private.pem')
    const pem = fs.readFileSync(pathFilePrivateKey, 'utf8').toString()
    const privateKey = forge.pki.privateKeyFromPem(pem)
    const messageDecoded = forge.util.decode64(encryptedMessage)
    return privateKey.decrypt(messageDecoded)
}

(() => {
    if (!myArgs) return console.log('Run: npm run rsa <any arg>');
    const concatedArgs = myArgs.join(' ');
    const encryptedArg = encryptFromPem(concatedArgs);
    const decryptedArg = decryptFromPem(encryptedArg);

    console.log(chalk.yellow.bold('Arg:'), concatedArgs);
    console.log(chalk.yellow.bold('Encrypted:'), encryptedArg);
    console.log(chalk.yellow.bold('Decrypted:'), decryptedArg);
})()