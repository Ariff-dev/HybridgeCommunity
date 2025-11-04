import { ChevronDown, CircleX, LayoutGrid } from 'lucide-react'
import { useState } from 'react'
import type { MenuState } from '@interfaces/ui'
type MenuName = keyof MenuState

export const Navbar = () => {
  const [openMenus, setOpenMenus] = useState<MenuState>({
    main: false,
    comunidad: false,
    recursos: false,
    servicios: false,
  })

  const toggleMenu = (menuName: MenuName): void => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }))
  }

  return (
    <nav className=''>
      <button onClick={() => toggleMenu('main')}>
        <LayoutGrid width={30} height={30} className='fixed top-0'/>
      </button>
      <div className={`${!openMenus.main ? 'hidden' : 'block'} bg-contrast fixed top-0 min-h-screen w-1/2 text-white p-2 flex flex-col gap-4`}>
        <CircleX onClick={() => toggleMenu('main')}/>
        <ul className='flex flex-col gap-2'>
          <li>Inicio</li>

          <div>
            <p
              className='flex items-center cursor-pointer'
              onClick={() => toggleMenu('comunidad')}
            >
              Comunidad
              <span>
                <ChevronDown
                  width={25}
                  height={25}
                  className={`transition-transform ${
                    openMenus.comunidad ? 'rotate-180' : ''
                  } text-complementary`}
                />
              </span>
            </p>
            <ul className={`${!openMenus.comunidad ? 'hidden' : 'block'} px-4`}>
              <li>CVs</li>
            </ul>
          </div>

          <li>Sobre nosotros</li>
          <li>Objetivos</li>
          <li>Postular</li>
          <li>Contacto</li>
        </ul>
      </div>
    </nav>
  )
}
