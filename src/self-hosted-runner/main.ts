import { unsupportedEntrypoint } from '../utils/unsupportedEntrypoint.js'

export async function selfHostedRunnerMain(): Promise<never> {
  return unsupportedEntrypoint('better-clawd self-hosted-runner')
}
