import { signIn } from 'next-auth/client'

export default () => (
  <button onClick={signIn}>Sign in</button>
)