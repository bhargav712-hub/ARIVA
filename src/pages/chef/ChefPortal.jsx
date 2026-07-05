import { useState, useEffect } from 'react'
import { Calendar, ClipboardList, BookOpen, ChefHat, PackageSearch } from 'lucide-react'
import ChefMyEvents from './ChefMyEvents'
import ChefPrepQueue from './ChefPrepQueue'
import ChefBYORQueue from './ChefBYORQueue'
import ChefSignatureLibrary from './ChefSignatureLibrary'

// Placeholder components that we will build out next
const ChefInventory = () => <div className="dash-card"><h2>Inventory View</h2><p className="desc">Coming soon...</p></div>

export default function ChefPortal({ currentUser }) {
  const [activeTab, setActiveTab] = useState('events')

  useEffect(() => {
    async function loadProfile() {
      // Intentionally loading profile or keeping it for side-effects if any, but since we don't use it, we can omit it.
      // But let's just let it be or remove the data fetching since it's not used.
    }

    if (currentUser) {
      loadProfile()
    }
  }, [currentUser])

  const renderTab = () => {
    switch (activeTab) {
      case 'events': return <ChefMyEvents currentUser={currentUser} />
      case 'prep': return <ChefPrepQueue currentUser={currentUser} />
      case 'byor': return <ChefBYORQueue currentUser={currentUser} />
      case 'library': return <ChefSignatureLibrary currentUser={currentUser} />
      case 'inventory': return <ChefInventory currentUser={currentUser} />
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      
      <div className="dash-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 40px' }}>
        <div>
          <h2 style={{ margin: 0 }}>Chef Dashboard</h2>
          <p className="desc" style={{ margin: '5px 0 0 0' }}>Welcome, Chef</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        <aside style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => setActiveTab('events')} className={`sidebar-link ${activeTab === 'events' ? 'active' : ''}`} style={{ width: '100%', border: 'none', background: activeTab === 'events' ? 'var(--terracotta)' : 'transparent', color: activeTab === 'events' ? 'white' : 'var(--ink)' }}>
            <Calendar size={18} /> My Events
          </button>
          <button onClick={() => setActiveTab('prep')} className={`sidebar-link ${activeTab === 'prep' ? 'active' : ''}`} style={{ width: '100%', border: 'none', background: activeTab === 'prep' ? 'var(--terracotta)' : 'transparent', color: activeTab === 'prep' ? 'white' : 'var(--ink)' }}>
            <ClipboardList size={18} /> Prep Lists
          </button>
          <button onClick={() => setActiveTab('byor')} className={`sidebar-link ${activeTab === 'byor' ? 'active' : ''}`} style={{ width: '100%', border: 'none', background: activeTab === 'byor' ? 'var(--terracotta)' : 'transparent', color: activeTab === 'byor' ? 'white' : 'var(--ink)' }}>
            <ChefHat size={18} /> BYOR Trial Queue
          </button>
          <button onClick={() => setActiveTab('library')} className={`sidebar-link ${activeTab === 'library' ? 'active' : ''}`} style={{ width: '100%', border: 'none', background: activeTab === 'library' ? 'var(--terracotta)' : 'transparent', color: activeTab === 'library' ? 'white' : 'var(--ink)' }}>
            <BookOpen size={18} /> Recipe Library
          </button>
          <button onClick={() => setActiveTab('inventory')} className={`sidebar-link ${activeTab === 'inventory' ? 'active' : ''}`} style={{ width: '100%', border: 'none', background: activeTab === 'inventory' ? 'var(--terracotta)' : 'transparent', color: activeTab === 'inventory' ? 'white' : 'var(--ink)' }}>
            <PackageSearch size={18} /> Inventory Alerts
          </button>
        </aside>
        
        <main style={{ flex: 1 }}>
          {renderTab()}
        </main>
      </div>

    </div>
  )
}
