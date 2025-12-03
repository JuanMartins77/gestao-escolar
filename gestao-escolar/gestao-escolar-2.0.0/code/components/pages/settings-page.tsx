'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Sun, Moon, Monitor, Palette, Lock, Bell, Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function SettingsPage() {
  const [theme, setTheme] = useState('light')
  const [accessibility, setAccessibility] = useState(true)
  const [highContrast, setHighContrast] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    grades: true,
    attendance: true,
    announcements: true,
  })
  const [primaryColor, setPrimaryColor] = useState('#06b6d4')
  const [successMessages, setSuccessMessages] = useState<string[]>([])
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const themes = [
    { name: 'Claro', id: 'light', icon: Sun },
    { name: 'Escuro', id: 'dark', icon: Moon },
    { name: 'Sistema', id: 'system', icon: Monitor },
  ]

  const colors = [
    { name: 'Teal', value: '#06b6d4' },
    { name: 'Azul', value: '#3b82f6' },
    { name: 'Roxo', value: '#8b5cf6' },
    { name: 'Rosa', value: '#ec4899' },
    { name: 'Laranja', value: '#f59e0b' },
    { name: 'Verde', value: '#10b981' },
  ]

  const handleSavePreferences = () => {
    setSuccessMessages([...successMessages, 'Preferências salvas com sucesso!'])
    setTimeout(() => {
      setSuccessMessages(prev => prev.slice(1))
    }, 3000)
  }

  const handleChangeTheme = (newTheme: string) => {
    setTheme(newTheme)
    setSuccessMessages([...successMessages, `Tema ${newTheme} ativado`])
    setTimeout(() => {
      setSuccessMessages(prev => prev.slice(1))
    }, 3000)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert('As senhas não conferem')
      return
    }
    setSuccessMessages([...successMessages, 'Senha alterada com sucesso!'])
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => {
      setSuccessMessages(prev => prev.slice(1))
    }, 3000)
  }

  const handleNotificationChange = (key: keyof typeof notifications) => {
    const newNotifications = { ...notifications, [key]: !notifications[key] }
    setNotifications(newNotifications)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 text-sm">Personalize sua experiência no sistema</p>
      </div>

      {/* Success Messages */}
      <div className="fixed bottom-6 right-6 space-y-2 z-50">
        {successMessages.map((msg, idx) => (
          <div
            key={idx}
            className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 animate-in"
          >
            <CheckCircle size={20} className="text-green-600" />
            <span className="text-sm font-medium">{msg}</span>
          </div>
        ))}
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Informações da Conta</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
            <Input type="text" defaultValue="João Silva" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input type="email" defaultValue="joao@escola.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departamento/Função</label>
            <Input type="text" defaultValue="Matemática - Professor" />
          </div>

          <Button onClick={handleSavePreferences} className="bg-teal-600 hover:bg-teal-700">
            Salvar Alterações
          </Button>
        </div>
      </Card>

      {/* Theme Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Tema da Interface</h2>
        <p className="text-gray-600 text-sm mb-4">Escolha o tema que melhor se adapta às suas necessidades</p>

        <div className="grid grid-cols-3 gap-4">
          {themes.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => handleChangeTheme(t.id)}
                className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                  theme === t.id
                    ? 'border-teal-500 bg-teal-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon size={24} className={theme === t.id ? 'text-teal-600' : 'text-gray-600'} />
                <span className={`text-sm font-medium ${theme === t.id ? 'text-teal-600' : 'text-gray-700'}`}>
                  {t.name}
                </span>
              </button>
            )
          })}
        </div>
      </Card>

      {/* Color Customization */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Palette size={20} />
          Personalizar Cores
        </h2>
        <p className="text-gray-600 text-sm mb-4">Escolha sua cor principal favorita para personalizar a interface</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Cor Principal</label>
            <div className="grid grid-cols-6 gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    setPrimaryColor(color.value)
                    handleSavePreferences()
                  }}
                  className={`w-12 h-12 rounded-lg border-4 transition-transform hover:scale-110 ${
                    primaryColor === color.value ? 'border-gray-900 shadow-lg' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Cor selecionada:</span> {primaryColor}
            </p>
          </div>
        </div>
      </Card>

      {/* Accessibility Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Acessibilidade</h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors">
            <input
              type="checkbox"
              checked={accessibility}
              onChange={(e) => {
                setAccessibility(e.target.checked)
                handleSavePreferences()
              }}
              className="w-5 h-5 rounded accent-teal-600"
            />
            <div>
              <p className="text-gray-700 font-medium">Modo de navegação por teclado aprimorado</p>
              <p className="text-xs text-gray-600">Facilita navegação usando apenas o teclado</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors">
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => {
                setHighContrast(e.target.checked)
                handleSavePreferences()
              }}
              className="w-5 h-5 rounded accent-teal-600"
            />
            <div>
              <p className="text-gray-700 font-medium">Alto contraste</p>
              <p className="text-xs text-gray-600">Aumenta o contraste da interface para melhor legibilidade</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded accent-teal-600"
            />
            <div>
              <p className="text-gray-700 font-medium">Animações reduzidas</p>
              <p className="text-xs text-gray-600">Reduz efeitos visuais e animações</p>
            </div>
          </label>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Bell size={20} />
          Notificações
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleNotificationChange('email')}
              className="w-5 h-5 rounded accent-teal-600"
            />
            <div>
              <p className="text-gray-700 font-medium">Notificações por Email</p>
              <p className="text-xs text-gray-600">Receba atualizações importantes por email</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors">
            <input
              type="checkbox"
              checked={notifications.grades}
              onChange={() => handleNotificationChange('grades')}
              className="w-5 h-5 rounded accent-teal-600"
            />
            <div>
              <p className="text-gray-700 font-medium">Alertas de Notas</p>
              <p className="text-xs text-gray-600">Notifique quando notas forem lançadas</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors">
            <input
              type="checkbox"
              checked={notifications.attendance}
              onChange={() => handleNotificationChange('attendance')}
              className="w-5 h-5 rounded accent-teal-600"
            />
            <div>
              <p className="text-gray-700 font-medium">Alertas de Frequência</p>
              <p className="text-xs text-gray-600">Notifique sobre ausências de alunos</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded transition-colors">
            <input
              type="checkbox"
              checked={notifications.announcements}
              onChange={() => handleNotificationChange('announcements')}
              className="w-5 h-5 rounded accent-teal-600"
            />
            <div>
              <p className="text-gray-700 font-medium">Comunicados da Escola</p>
              <p className="text-xs text-gray-600">Receba comunicados importantes da administração</p>
            </div>
          </label>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Lock size={20} />
          Segurança
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha Atual</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Digite sua senha atual"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite a nova senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nova Senha</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme a nova senha"
            />
          </div>

          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full">
            Alterar Senha
          </Button>
        </form>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200 bg-red-50">
        <h2 className="text-lg font-bold mb-4 text-red-700">Zona de Perigo</h2>
        <p className="text-sm text-red-600 mb-4">Ações irreversíveis que afetam sua conta</p>

        <div className="space-y-3">
          <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-100">
            Desativar Conta
          </Button>
          <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-100">
            Excluir Dados Pessoais
          </Button>
        </div>
      </Card>
    </div>
  )
}
