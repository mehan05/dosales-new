import { Studio } from 'sanity'
import config from '../../sanity.config'

export default function SanityStudio() {
  console.log('Sanity Config:', config);
  
  return (
    <div style={{ height: '100vh', width: '100vw' }} id="sanity-studio-container">
      <Studio config={config} />
    </div>
  )
}
