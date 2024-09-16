import React from 'react';
import Logo from '../imgs/logo.png';

export function Header() {
  const userEmail = "neil.sims@flowbite.com"; // Substitua pela lógica correta para obter o e-mail do usuário logado
  const userInitial = userEmail.charAt(0).toUpperCase(); // Pega a primeira letra do e-mail e transforma em maiúscula

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-300">
      <div className="px-2 py-2 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open sidebar</span>
            </button>
            <a href="/" className="flex ms-2 md:me-24">
              <img src={Logo} alt="Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap"></span>
            </a>
          </div>

          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8 text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="flex items-center justify-center w-8 h-8 text-white bg-gray-600 rounded-full">
                    {userInitial}
                  </div>
                </button>
              </div>

              <div
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900" role="none">
                    danielcperalba@gmail.com
                    {userEmail}
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
