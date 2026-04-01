import { unsupportedEntrypoint } from '../utils/unsupportedEntrypoint.js'

export async function runDaemonWorker(kind?: string): Promise<never> {
  return unsupportedEntrypoint(
    kind ? `better-clawd --daemon-worker ${kind}` : 'better-clawd --daemon-worker',
  )
}
