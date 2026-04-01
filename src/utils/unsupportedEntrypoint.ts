import { exitWithError } from './process.js'

export function unsupportedEntrypoint(commandName: string): never {
  exitWithError(
    `Error: \`${commandName}\` is not available in this Better-Clawd build.`,
  )
}
