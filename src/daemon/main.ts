import { unsupportedEntrypoint } from '../utils/unsupportedEntrypoint.js'

export async function daemonMain(): Promise<never> {
  return unsupportedEntrypoint('better-clawd daemon')
}
