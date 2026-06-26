import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BackgroundFX } from '@/components/fx/BackgroundFX'
import { BootLoader } from '@/components/BootLoader'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { Arsenal } from '@/components/sections/Arsenal'
import { Builds } from '@/components/sections/Builds'
import { Stats } from '@/components/sections/Stats'
import { Terminal } from '@/components/sections/Terminal'
import { ContactFooter } from '@/components/sections/ContactFooter'

function App() {
  const [booting, setBooting] = useState(true)

  // Lock scroll while the boot sequence runs.
  useEffect(() => {
    document.body.style.overflow = booting ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [booting])

  return (
    <>
      <BackgroundFX />

      <AnimatePresence>{booting && <BootLoader key="boot" onComplete={() => setBooting(false)} />}</AnimatePresence>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Manifesto />
          <Arsenal />
          <Builds />
          <Stats />
          <Terminal />
        </main>
        <ContactFooter />
      </div>
    </>
  )
}

export default App
