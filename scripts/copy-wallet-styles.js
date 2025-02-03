import fs from 'fs'
import path from 'path'

// Source and destination paths
const sourcePath = './node_modules/@solana/wallet-adapter-react-ui/styles.css'
const destPath = './public/styles/wallet-adapter.css'

// Create destination directory if it doesn't exist
const destDir = path.dirname(destPath)
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

// Copy the file
fs.copyFileSync(sourcePath, destPath)
console.log('Wallet adapter styles copied successfully!')
