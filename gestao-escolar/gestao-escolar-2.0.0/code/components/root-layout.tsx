'use client'

import { useState, ReactNode } from 'react'
import { useAuth } from '@/contexts/auth-context'
import AdminDashboard from './dashboards/admin-dashboard'
import ProfessionalDashboard from './dashboards/professional-dashboard'
import Sidebar from './sidebar'
import { Button } from '@/components/ui/button'
import { LogOut, Menu, X } from 'lucide-react'

interface User {
  role: 'admin' | 'professional'
}

export default function RootLayout({ user, setUser }: { user: User; setUser: (user: any) => void }) {
  const { logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        role={user.role}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-600"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex-1 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                EduGestão - {user.role === 'admin' ? 'Painel Admin' : 'Painel Profissional'}
              </h2>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              Sair
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {user.role === 'admin' ? (
            <AdminDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
          ) : (
            <ProfessionalDashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
          )}
        </main>
      </div>
    </div>
  )
}
