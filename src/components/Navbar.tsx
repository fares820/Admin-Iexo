import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Shield, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { useToast } from '../context/ToastContext'
import { useSiteEditor } from '../context/SiteEditorContext'
import { EditableText } from './editable/EditableText'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { getTotalItems } = useCart()
  const { language, setLanguage, t, darkMode } = useLanguage()
  const { showToast } = useToast()
  const { siteData } = useSiteEditor()

  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('admin_session'))

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('admin_session'))
  }, [location.pathname])

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    showToast('Logged out successfully', 'success')
    navigate('/secure-management-portal-x7k9m2')
  }

  return (
    <>
      <div className="bg-dessert-chocolate text-white py-3 overflow-hidden">
        <div className="whitespace-nowrap">
          <span className={`inline-block animate-marquee text-lg font-medium text-white`}>
            <EditableText
              path={`home.moving_stripe.${language}`}
              value={siteData.home.moving_stripe[language]}
              as="span"
            />
          </span>
        </div>
      </div>

      <nav className={`${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} shadow-lg sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-none mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={siteData.branding.logo_url}
                alt={siteData.branding.site_title}
                className="h-10 w-auto"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`font-medium transition-colors ${isActive('/') ? 'text-dessert-caramel' : `hover:text-dessert-caramel ${darkMode ? 'text-white' : 'text-gray-900'}`}`}>{t('home')}</Link>
              <Link to="/products" className={`font-medium transition-colors ${isActive('/products') ? 'text-dessert-caramel' : `hover:text-dessert-caramel ${darkMode ? 'text-white' : 'text-gray-900'}`}`}>{t('products')}</Link>
              {isAdmin && (
                <Link to="/admin-control-center-v8n4p1" className={`font-bold flex items-center gap-1 transition-colors ${isActive('/admin-control-center-v8n4p1') ? 'text-dessert-caramel' : `hover:text-dessert-caramel text-[#16a34a]`}`}>
                  <Shield className="w-4 h-4" />
                  ADMIN PANEL
                </Link>
              )}
              <Link to="/about" className={`font-medium transition-colors ${isActive('/about') ? 'text-dessert-caramel' : `hover:text-dessert-caramel ${darkMode ? 'text-white' : 'text-gray-900'}`}`}>{t('about')}</Link>
              <Link to="/contact" className={`font-medium transition-colors ${isActive('/contact') ? 'text-dessert-caramel' : `hover:text-dessert-caramel ${darkMode ? 'text-white' : 'text-gray-900'}`}`}>{t('contact')}</Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button onClick={() => setLanguage('ar')} className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${language === 'ar' ? 'bg-dessert-chocolate text-white' : `${darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-900'}`}`}>
                  <img src="https://ik.imagekit.io/nru6mkd6u/Imageone_0f509EE1X" alt="Jordan" className="w-5 h-3 object-cover rounded-sm" />
                  <span className="text-xs font-medium">AR</span>
                </button>
                <button onClick={() => setLanguage('en')} className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${language === 'en' ? 'bg-dessert-chocolate text-white' : `${darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-900'}`}`}>
                  <img src="https://ik.imagekit.io/nru6mkd6u/Imageone_CdwA_XZAw" alt="English" className="w-5 h-3 object-cover rounded-sm" />
                  <span className="text-xs font-medium">EN</span>
                </button>
              </div>

              <Link to="/account" className={`${darkMode ? 'text-white hover:text-dessert-caramel' : 'text-gray-900 hover:text-dessert-caramel'} transition-colors`}><User className="h-6 w-6" /></Link>
              <Link to="/cart" className={`${darkMode ? 'text-white hover:text-dessert-caramel' : 'text-gray-900 hover:text-dessert-caramel'} transition-colors relative`}>
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-dessert-caramel text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{getTotalItems()}</span>
              </Link>

              {isAdmin && (
                <button onClick={handleLogout} className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300" title="Logout Admin">
                  <LogOut className="h-5 w-5" />
                </button>
              )}

              <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden py-4 space-y-2 text-center">
              <Link to="/" className="block py-2 hover:text-dessert-caramel transition-colors">{t('home')}</Link>
              <Link to="/products" className="block py-2 hover:text-dessert-caramel transition-colors">{t('products')}</Link>
              {isAdmin && <Link to="/admin-control-center-v8n4p1" className="block py-2 text-[#16a34a] font-bold hover:text-dessert-caramel transition-colors">ADMIN PANEL</Link>}
              <Link to="/about" className="block py-2 hover:text-dessert-caramel transition-colors">{t('about')}</Link>
              <Link to="/contact" className="block py-2 hover:text-dessert-caramel transition-colors">{t('contact')}</Link>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar;