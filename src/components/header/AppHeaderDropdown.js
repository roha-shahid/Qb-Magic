import React, { useEffect, useState } from 'react'
import {
  Check,
  ChevronUp,
  BarChart3,
  Settings,
  Grid3X3,
  Crown,
  DoorOpen,
  Sun,
  Moon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilBell, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useTheme } from 'next-themes'

const AppHeaderDropdown = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const menuItems = [
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Activity log' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
    { icon: <Grid3X3 className="w-5 h-5" />, label: 'Integrations' },
    {
      icon: <Crown className="w-5 h-5" />,
      label: 'Upgrade to Pro',
      action: true,
      actionLabel: 'Upgrade',
    },
    {
      icon: <DoorOpen className="w-5 h-5" />,
      label: 'Sign out',
      danger: true,
    },
  ]

  return (
    <>
      {/* <CDropdown variant="nav-item">
        <CDropdownToggle
          placement="bottom-end"
          className="py-0 pe-0 d-flex align-items-center"
          caret={false}
        >
          <CAvatar src={avatar8} size="md" />
          <div className="d-flex flex-column">
            <div className="profile-title">Arihant Jain</div>
            <div className="profile-description">
              <span className="title me-2">Product Designer</span>
              <span>hey@arihantcodes.in</span>
            </div>
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
          <CDropdownItem href="#">
            <CIcon icon={cilBell} className="me-2" />
            Updates
            <CBadge color="info" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>
          <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
          <CDropdownItem href="#">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem href="#">
            <CIcon icon={cilSettings} className="me-2" />
            Settings
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown> */}

      <div className="d-flex align-items-center justify-content-center bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-100 mx-auto overflow-hidden"
          style={{ maxWidth: '28rem' }}
        >
          {/* Profile Header */}
          <motion.div
            className="p-1"
            transition={{ duration: 0.2 }}
          >
            <div className="d-flex align-items-center">
              <motion.div
                className="position-relative me-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                style={{ width: '3rem', height: '3rem' }}
              >
                <div className="position-absolute top-0 bottom-0 start-0 end-0 rounded-circle overflow-hidden">
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                    {/* <img
                      className="rounded-circle"
                      alt="Profile Picture"
                      width={40}
                      height={40}
                      src="/arihanticon.jpg"
                    /> */}
                    <CIcon icon={cilUser} className="rounded-circle" />
                  </div>
                </div>
              </motion.div>
              <div className="flex-grow-1">
                <div className="d-flex align-items-center">
                  <h2 className="h5 fw-bold text-dark mb-0">Arihant Jain</h2>
                  <motion.div
                    className="ms-2 d-flex align-items-center justify-content-center rounded-circle bg-primary"
                    style={{ width: '1.25rem', height: '1.25rem' }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Check className="text-white" size={12} />
                  </motion.div>
                </div>
                <p className="text-muted small mb-0">Product Designer • hey@arihantcodes.in</p>
              </div>
              <motion.button
                className="btn btn-link text-muted p-0"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
                  <ChevronUp size={20} />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className='nav-dropdown'
              >

                {/* Theme Toggle */}
                <div className="p-3 border-bottom">
                  <div className="d-flex rounded p-1">
                    <motion.button
                      className={`flex-fill btn ${theme === 'light' ? 'btn-light shadow-sm' : 'btn-outline-secondary'}`}
                      onClick={() => setTheme('light')}
                      whileHover={{ scale: theme !== 'light' ? 1.03 : 1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Sun className="me-2" size={16} />
                      Light mode
                    </motion.button>
                    <motion.button
                      className={`flex-fill btn ${theme === 'dark' ? 'btn-secondary shadow-sm text-white' : 'btn-outline-secondary'}`}
                      onClick={() => setTheme('dark')}
                      whileHover={{ scale: theme !== 'dark' ? 1.03 : 1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Moon className="me-2" size={16} />
                      Dark mode
                    </motion.button>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-3 border-bottom">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className={`d-flex justify-content-between align-items-center p-2 rounded ${
                        item.danger ? 'text-danger' : 'text-dark'
                      }`}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <div className="d-flex align-items-center">
                        <span className="me-2">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.action && (
                        <motion.button
                          className="btn btn-sm bg-gradient text-dark"
                          style={{
                            background:
                              'linear-gradient(to right, #B2D0F9, #F08878, #FDC3B6, #FFDB9A)',
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {item.actionLabel}
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-3 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <motion.div
                      className="rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm me-2"
                      style={{ width: '1.5rem', height: '1.5rem' }}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      {/* Insert SVG */}
                    </motion.div>
                    <span className="fw-medium text-dark">QB Magic</span>
                  </div>
                  <span className="text-muted small">v1.2</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  )
}

export default AppHeaderDropdown
