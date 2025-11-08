import { AboutUs } from "./AboutUs"
import { Hero } from "./Hero"
import Objectives from "./Objectives"
import Postulate from "./Postulate"

export const Lading = () => {
  return (
    <main className="bg-contrast">
        <Hero/>
        <AboutUs />
        <Objectives />
        <Postulate />
    </main>
  )
}
