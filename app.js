const fs = require('fs/promises')
const path = require('path')

const boysDir = path.join(__dirname, '/boys')
const girlsDir = path.join(__dirname, '/girls')

const sortGender = async (pathFolder) => {
  try {
    const files = await fs.readdir(pathFolder)

    files.forEach(async (file) => {
      const currentPath = path.join(pathFolder, file)

      const human = JSON.parse(await fs.readFile(currentPath))

      newPath = path.join(human.gender === 'male' ? boysDir : girlsDir, file)
      fs.rename(currentPath, newPath)
    })
  } catch (error) {
    console.log(error)
  }
}

sortGender(boysDir)
sortGender(girlsDir)
