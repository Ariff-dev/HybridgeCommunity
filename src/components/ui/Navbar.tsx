import { ChevronDown, CircleX, LayoutGrid, LogIn } from 'lucide-react'
import Logo from '../../assets/hybrige.svg'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { MenuState } from '@interfaces/ui'
type MenuName = keyof MenuState

export const Navbar = () => {
  const navigate = useNavigate()
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

  const handleNavigation = (path: string): void => {
    navigate(path)
    setOpenMenus({ main: false, comunidad: false, recursos: false, servicios: false })
  }

  return (
    <nav className='fixed left-0 top-0 md:left-auto md:top-1/2 md:-translate-y-1/2 z-50'>
      {/* Logo y botón - Desktop */}
      <div className='hidden md:flex md:flex-col md:items-center md:gap-4 md:bg-complementary md:p-3 md:rounded-r-lg md:shadow-lg'>
        <img src={Logo} alt='Logo' width={30} height={30} />

        <button
          onClick={() => toggleMenu('main')}
          className='hover:scale-110 transition-all'
        >
          {openMenus.main ? (
            <CircleX width={30} height={30} />
          ) : (
            <LayoutGrid width={30} height={30} />
          )}
        </button>
      </div>

      {/* Botón móvil - Cambia dinámicamente */}
      <button
        onClick={() => toggleMenu('main')}
        className='md:hidden fixed top-4 left-4 z-50 bg-complementary p-2 rounded-lg shadow-lg transition-transform hover:scale-110'
      >
        {openMenus.main ? (
          <CircleX width={30} height={30} />
        ) : (
          <LayoutGrid width={30} height={30} />
        )}
      </button>

      {/* Menú móvil - fullscreen desde la izquierda */}
      <div
        className={`${!openMenus.main ? '-translate-x-full' : 'translate-x-0'
          } md:hidden transition-transform duration-300 bg-contrast fixed top-0 left-0 min-h-screen w-4/5 text-white p-6 flex flex-col gap-6 pt-20`}
      >
        <ul className='flex flex-col gap-4'>
          <li>
            <Link to="/" onClick={() => handleNavigation('/')} className='hover:text-helper cursor-pointer transition-colors block'>
              Inicio
            </Link>
          </li>

          <div>
            <p
              className='flex items-center cursor-pointer hover:text-helper transition-colors'
              onClick={() => toggleMenu('comunidad')}
            >
              Comunidad
              <span>
                <ChevronDown
                  width={20}
                  height={20}
                  className={`transition-transform ml-2 ${openMenus.comunidad ? 'rotate-180' : ''
                    }`}
                />
              </span>
            </p>
            <ul className={`${!openMenus.comunidad ? 'hidden' : 'block'} px-6 pt-2 flex flex-col gap-2`}>
              <li className='hover:text-helper cursor-pointer transition-colors'>CVs</li>
            </ul>
          </div>

          <li className='hover:text-helper cursor-pointer transition-colors'>Sobre nosotros</li>
          <li className='hover:text-helper cursor-pointer transition-colors'>Tablero</li>
          <li className='hover:text-helper cursor-pointer transition-colors'>Postular</li>
          <li className='hover:text-helper cursor-pointer transition-colors'>Contacto</li>

          {/* Botón destacado de Iniciar Sesión */}
          <li className='mt-4 pt-4 border-t border-white/20'>
            <button
              onClick={() => handleNavigation('/login')}
              className='w-full flex items-center justify-center gap-2 bg-complementary hover:bg-complementary/80 text-white font-semibold py-2 px-4 rounded-lg transition-all hover:scale-105'
            >
              <LogIn width={20} height={20} />
              Iniciar Sesión
            </button>
          </li>
        </ul>
      </div>

      {/* Menú desktop - dropdown minimalista */}
      <div
        className={`${!openMenus.main ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
          } hidden md:block transition-all duration-200 fixed left-16 top-1/2 -translate-y-1/2 bg-contrast text-white rounded-lg shadow-2xl p-4 min-w-[200px]`}
      >
        <ul className='flex flex-col gap-3'>
          <li>
            <Link
              to="/"
              onClick={() => handleNavigation('/')}
              className='hover:text-helper cursor-pointer transition-colors py-1 px-2 hover:bg-white/10 rounded block'
            >
              Inicio
            </Link>
          </li>

          <div>
            <p
              className='flex items-center justify-between cursor-pointer hover:text-helper transition-colors py-1 px-2 hover:bg-white/10 rounded'
              onClick={() => toggleMenu('comunidad')}
            >
              Comunidad
              <ChevronDown
                width={18}
                height={18}
                className={`transition-transform ${openMenus.comunidad ? 'rotate-180' : ''
                  }`}
              />
            </p>
            <ul className={`${!openMenus.comunidad ? 'hidden' : 'block'} pl-4 pt-2 flex flex-col gap-2`}>
              <li className='hover:text-helper cursor-pointer transition-colors py-1 px-2 text-sm'>
                CVs
              </li>
            </ul>
          </div>

          <li className='hover:text-helper cursor-pointer transition-colors py-1 px-2 hover:bg-white/10 rounded'>
            Sobre nosotros
          </li>
          <li className='hover:text-helper cursor-pointer transition-colors py-1 px-2 hover:bg-white/10 rounded'>
            Tablero
          </li>
          <li className='hover:text-helper cursor-pointer transition-colors py-1 px-2 hover:bg-white/10 rounded'>
            Postular
          </li>
          <li className='hover:text-helper cursor-pointer transition-colors py-1 px-2 hover:bg-white/10 rounded'>
            Contacto
          </li>

          {/* Botón destacado de Iniciar Sesión */}
          <li className='mt-3 pt-3 border-t border-white/20'>
            <button
              onClick={() => handleNavigation('/login')}
              className='w-full flex items-center justify-center gap-2 bg-complementary hover:bg-complementary/80 text-white font-semibold py-2 px-3 rounded transition-all hover:scale-105'
            >
              <LogIn width={18} height={18} />
              Iniciar Sesión
            </button>
          </li>
        </ul>
      </div>

      {/* Overlay para cerrar menú en mobile */}
      {openMenus.main && (
        <div
          className='md:hidden fixed inset-0 bg-black/50 -z-10'
          onClick={() => toggleMenu('main')}
        />
      )}
    </nav>
  )
}