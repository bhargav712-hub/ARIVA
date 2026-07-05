import { useState, useEffect } from 'react'
import { useNavigate, NavLink, Outlet, Link } from 'react-router-dom'
import { LayoutDashboard, CalendarCheck, Users, UtensilsCrossed, ChefHat, Truck, Lock, BarChart3, Settings, BookOpen, User, Image as ImageIcon, CreditCard } from 'lucide-react'
import { supabase } from '../supabaseClient'
import ChefPortal from './chef/ChefPortal'
import StaffPortal from './staff/StaffPortal'
import './Dashboard.css'



export default function Dashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState('customer')

  async function initApp() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error || !session) {
      navigate('/account', { replace: true })
      return
    }

    const user = session.user
    setCurrentUser(user)

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Error fetching profile:', profileError)
    }

    const role = profile?.role || 'customer'
    console.log('Fetched role from DB:', profile?.role, 'Final role set:', role)
    setUserRole(role)
    setLoading(false)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initApp()
  }, [])


  // LOGOUT
  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/account', { replace: true })
  }

  if (loading) {
    return (
      <div className="dash-body">
        <aside className="dash-sidebar">
          <div className="logo" style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <img className="logo-img" src="/assets/ariva-logo-light.svg" alt="ariva" style={{ height: '48px', width: 'auto', display: 'block' }} />
          </div>
          <div className="sidebar-content"></div>
          <div className="sidebar-bottom">
            <span className="role-badge">Loading...</span>
          </div>
        </aside>
        <main className="dash-main">
          <div className="loading-spinner">
            <div className="spinner-circle"></div>
            <p className="spinner-text">Authenticating and loading dashboard...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="dash-body">
      <aside className="dash-sidebar">
        <div className="logo" style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <img className="logo-img" src="/assets/ariva-logo-light.svg" alt="ariva" style={{ height: '48px', width: 'auto', display: 'block' }} />
        </div>
        
        <div className="sidebar-content">
          {userRole === 'admin' && (
            <>
              <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={18} /> Overview
              </NavLink>
              <NavLink to="/dashboard/bookings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <CalendarCheck size={18} /> Bookings
              </NavLink>
              <NavLink to="/dashboard/customers" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Users size={18} /> Customers
              </NavLink>
              <NavLink to="/dashboard/menu" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <UtensilsCrossed size={18} /> Menu Editor
              </NavLink>
              <NavLink to="/dashboard/kitchen" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <ChefHat size={18} /> Kitchen
              </NavLink>
              <NavLink to="/dashboard/logistics" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Truck size={18} /> Logistics
              </NavLink>
              
              <NavLink to="/dashboard/vault" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Lock size={18} /> Recipe Vault
              </NavLink>
              
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '15px 0' }}></div>
              
              <NavLink to="/dashboard/team" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Users size={18} /> Team & Roles
              </NavLink>
              
              <NavLink to="/dashboard/reports" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <BarChart3 size={18} /> Financial Reports
              </NavLink>
              <NavLink to="/dashboard/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Settings size={18} /> Settings
              </NavLink>
            </>
          )}
          {userRole === 'customer' && (
            <>
              <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={18} /> Overview
              </NavLink>
              <Link to="/book" className="sidebar-link">
                <UtensilsCrossed size={18} /> Book an Event
              </Link>
              <NavLink to="/dashboard/my-bookings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <CalendarCheck size={18} /> My Bookings
              </NavLink>
              <NavLink to="/dashboard/submit-byor" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <BookOpen size={18} /> Submit BYOR
              </NavLink>
              <NavLink to="/dashboard/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <User size={18} /> My Profile
              </NavLink>
              <NavLink to="/dashboard/gallery" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <ImageIcon size={18} /> Memory Gallery
              </NavLink>
              <NavLink to="/dashboard/billing" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <CreditCard size={18} /> Payment History
              </NavLink>
            </>
          )}
          {userRole === 'chef' && (
            <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <ChefHat size={18} /> Kitchen Portal
            </NavLink>
          )}
          {userRole === 'cart_staff' && (
            <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <Truck size={18} /> Cart Operations
            </NavLink>
          )}
        </div>

        <div className="sidebar-bottom">
          <span className="role-badge">{userRole}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main className="dash-main">
        {userRole === 'admin' || userRole === 'customer' ? (
          <Outlet context={{ currentUser }} />
        ) : (
          <div className="portal-container">
            {/* CHEF PORTAL */}
            {userRole === 'chef' && <ChefPortal currentUser={currentUser} />}

            {/* CART OPERATIONS PORTAL */}
            {userRole === 'cart_staff' && <StaffPortal currentUser={currentUser} />}
          </div>
        )}
      </main>
    </div>
  )
}
