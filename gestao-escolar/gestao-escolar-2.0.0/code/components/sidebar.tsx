'use client'

import { useState } from 'react'
import { LayoutDashboard, Users, BookOpen, ClipboardList, Settings, BarChart3, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MenuItem {
  icon: React.ReactNode
  label: string
  id: string
  submenu?: MenuItem[]
}

export default function Sidebar({
  role,
  currentPage,
  setCurrentPage,
  isOpen,
  onClose,
}: {
  role: 'admin' | 'professional'
  currentPage: string
  setCurrentPage: (page: string) => void
  isOpen: boolean
  onClose: () => void
}) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const adminMenuItems: MenuItem[] = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', id: 'dashboard' },
    {
      icon: <Users size={20} />,
      label: 'Gestão',
      id: 'management',
      submenu: [
        { icon: <Users size={16} />, label: 'Alunos', id: 'students' },
        { icon: <Users size={16} />, label: 'Professores', id: 'teachers' },
        { icon: <BookOpen size={16} />, label: 'Turmas', id: 'classes' },
      ],
    },
    { icon: <ClipboardList size={20} />, label: 'Notas', id: 'grades' },
    { icon: <BarChart3 size={20} />, label: 'Relatórios', id: 'reports' },
    { icon: <Settings size={20} />, label: 'Configurações', id: 'settings' },
  ]

  const professionalMenuItems: MenuItem[] = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <Users size={20} />, label: 'Meus Alunos', id: 'my-students' },
    { icon: <BookOpen size={20} />, label: 'Minhas Turmas', id: 'my-classes' },
    { icon: <ClipboardList size={20} />, label: 'Lançar Notas', id: 'enter-grades' },
    { icon: <Settings size={20} />, label: 'Configurações', id: 'settings' },
  ]

  const menuItems = role === 'admin' ? adminMenuItems : professionalMenuItems

  const renderMenuItems = (items: MenuItem[], depth = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        <button
          onClick={() => {
            if (item.submenu) {
              setExpandedMenu(expandedMenu === item.id ? null : item.id)
            } else {
              setCurrentPage(item.id)
              onClose()
            }
          }}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
            currentPage === item.id
              ? 'bg-teal-100 text-teal-700 font-semibold'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          style={{ paddingLeft: `${depth * 16 + 16}px` }}
        >
          <span className="flex items-center gap-3">
            {item.icon}
            {item.label}
          </span>
          {item.submenu && (
            <ChevronDown
              size={16}
              className={`transition-transform ${expandedMenu === item.id ? 'rotate-180' : ''}`}
            />
          )}
        </button>

        {item.submenu && expandedMenu === item.id && (
          <div>
            {renderMenuItems(item.submenu, depth + 1)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen bg-white shadow-lg overflow-y-auto transition-all z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-teal-600">EduGestão</h1>
          <p className="text-sm text-gray-600">{role === 'admin' ? 'Administrador' : 'Professor'}</p>
        </div>

        <nav className="p-4">
          {renderMenuItems(menuItems)}
        </nav>
      </aside>
    </>
  )
}
