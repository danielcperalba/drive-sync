import {
  MapPinned,
  ReceiptText,
  LayoutDashboard,
  BadgeInfo,
  Settings,
  CarFront,
  LogOut,
  UserRoundPlus,
  Wrench,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "./HeaderBar";
import { useState } from "react";

export function Sidebar() {
  const token = localStorage.getItem("token");
  const history = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  async function logout() {
    try {
      localStorage.clear();
      localStorage.setItem("token", "");
      authorization.headers = "";
      history("/");
    } catch (err) {
      alert("Não foi possível fazer o logout" + err);
    }
  }

  return (
    <div className="main">
      <Header />

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-300 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul
            className="space-y-2 font-medium"
            style={{ flex: 1, marginTop: "2rem" }}
          >
            <li>
              <Link
                to="/home"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <LayoutDashboard />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/viagens"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <MapPinned />
                <span className="flex-1 ms-3 whitespace-nowrap">Viagens</span>
              </Link>
            </li>
            <li>
              <Link
                to="/veiculos"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <CarFront />
                <span className="flex-1 ms-3 whitespace-nowrap">Veículos</span>
              </Link>
            </li>
            <li>
              <Link
                to="/multas"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <ReceiptText />
                <span className="flex-1 ms-3 whitespace-nowrap">Multas</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manutencoes"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <Wrench />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Manutenções
                </span>
              </Link>
            </li>

            <hr className="my-3" />

            <li>
              <Link
                to="/registro"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <UserRoundPlus />
                <span className="flex-1 ms-3 whitespace-nowrap">Acessos</span>
              </Link>
            </li>

            <li>
              {/* Botão de Dropdown */}
              <button
                onClick={toggleDropdown}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group w-full text-left"
              >
                <Settings />
                <span className="flex-1 ms-3 whitespace-nowrap">Gerenciamento</span>

                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>

              {/* Dropdown integrado na estrutura */}
              {isDropdownOpen && (
                <ul className="pl-4 mt-2 space-y-1">
                  <li>
                    <Link
                      to="/gerenciamento/empresas"
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                    >
                      Gerenciar Empresas
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/gerenciamento/role"
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                    >
                      Gerenciar Roles
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/gerenciamento/relatorios"
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                    >
                      Gerenciar Assinaturas
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <hr className="my-3" />

            <li>
              <Link
                to="/suporte"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <Settings />
                <span className="flex-1 ms-3 whitespace-nowrap">Suporte</span>
              </Link>
            </li>
            <li>
              <Link
                to="/ajuda"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <BadgeInfo />
                <span className="flex-1 ms-3 whitespace-nowrap">Ajuda</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={logout}
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <LogOut />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Desconectar
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
