import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CFormInput,
  CHeaderToggler,
  CForm,
  CNavLink,
  CNavItem,
  CButton,
  useColorModes,
  CCollapse,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilStar,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
  cilSearch,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4 py-2" fluid>
        {/* Sidebar Toggle */}
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        {/* Search Bar (Hidden on small screens) */}
        <CHeaderNav className="d-none d-md-flex">
          <CForm className="d-flex">
            <div className="input-group">
              <span className="input-group-text search-input">
                <CIcon icon={cilSearch} />
              </span>
              <CFormInput
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <CButton type="submit">⌘K</CButton>
            </div>
          </CForm>
        </CHeaderNav>

        {/* Right side nav items */}
        <CHeaderNav className="ms-auto align-items-center d-flex">
          <CNavItem className="d-none d-md-block">
            <CNavLink href="#">
              <i className="bi bi-bell-fill fs-5"></i>
            </CNavLink>
          </CNavItem>
          <CNavItem className="d-none d-md-block">
            <CNavLink href="#">
              <i className="bi bi-question-circle-fill fs-5"></i>
            </CNavLink>
          </CNavItem>
          <CNavItem className="d-none d-md-flex align-items-center">
            <CButton className="primary-button">
              <i className="bi bi-star-fill me-2"></i>
              Upgrade
            </CButton>
          </CNavItem>
        </CHeaderNav>

        {/* Theme Toggle + Profile Dropdown */}
        <CHeaderNav>
          <li className="nav-item py-1 d-none d-md-block">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <li className="nav-item py-1 d-none d-md-block">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>

      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
