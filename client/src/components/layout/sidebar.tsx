import { Link, useLocation } from "wouter";
import { 
  Briefcase, 
  LayoutDashboard, 
  Search, 
  FileText, 
  User, 
  Clock, 
  BarChart,
  Settings
} from "lucide-react";

interface SidebarItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarItems: SidebarItem[] = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/search", label: "Job Search", icon: Search },
  { path: "/applications", label: "Applications", icon: FileText },
  { path: "/profile", label: "Profile & Templates", icon: User },
  { path: "/follow-ups", label: "Follow-ups", icon: Clock },
  { path: "/analytics", label: "Analytics", icon: BarChart },
];

export default function Sidebar() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location === "/" || location === "/dashboard";
    }
    return location === path;
  };

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-slate-200 fixed h-full z-30">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Briefcase className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">JobTracker Pro</h1>
            <p className="text-sm text-slate-500">Smart Job Manager</p>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`sidebar-link ${active ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      {/* Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
            <User size={16} className="text-slate-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">Kavali Karthik</p>
            <p className="text-xs text-slate-500">ML Engineer</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
