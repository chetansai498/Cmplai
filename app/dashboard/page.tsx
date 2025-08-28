"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Calendar,
  Target,
  Users,
  Building2,
  Clock,
  FileText,
  Shield,
  Beaker,
  Factory,
  Truck,
  Stethoscope,
  TrendingUp,
  Monitor,
  UserCheck,
  Scale,
  FlaskConical,
  DollarSign,
  Menu,
  X,
  Home,
  Settings,
  LogOut,
  Activity,
  BarChart3,
  LineChart,
  Award,
  Zap,
  Globe,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const allDepartments = [
  { id: "ehs", name: "EHS", icon: Shield, color: "bg-red-500", documents: 12, pendingApprovals: 4 },
  {
    id: "regulatory-affairs",
    name: "Regulatory Affairs",
    icon: Scale,
    color: "bg-blue-500",
    documents: 8,
    pendingApprovals: 2,
  },
  {
    id: "quality-assurance",
    name: "Quality Assurance",
    icon: Beaker,
    color: "bg-green-500",
    documents: 15,
    pendingApprovals: 3,
  },
  {
    id: "quality-control",
    name: "Quality Control",
    icon: FlaskConical,
    color: "bg-purple-500",
    documents: 10,
    pendingApprovals: 1,
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    color: "bg-orange-500",
    documents: 20,
    pendingApprovals: 5,
  },
  { id: "supply-chain", name: "Supply Chain", icon: Truck, color: "bg-indigo-500", documents: 14, pendingApprovals: 2 },
  {
    id: "clinical-operations",
    name: "Clinical Operations",
    icon: Stethoscope,
    color: "bg-pink-500",
    documents: 9,
    pendingApprovals: 1,
  },
  {
    id: "sales-marketing",
    name: "Sales & Marketing",
    icon: TrendingUp,
    color: "bg-cyan-500",
    documents: 11,
    pendingApprovals: 0,
  },
  { id: "it", name: "IT", icon: Monitor, color: "bg-gray-500", documents: 7, pendingApprovals: 1 },
  { id: "hr", name: "HR", icon: UserCheck, color: "bg-yellow-500", documents: 13, pendingApprovals: 2 },
  { id: "finance", name: "Finance", icon: DollarSign, color: "bg-emerald-500", documents: 16, pendingApprovals: 3 },
]

// Mock chart data
const documentCreationData = [
  { month: "Jan", documents: 32, target: 30 },
  { month: "Feb", documents: 28, target: 30 },
  { month: "Mar", documents: 45, target: 35 },
  { month: "Apr", documents: 38, target: 35 },
  { month: "May", documents: 52, target: 40 },
  { month: "Jun", documents: 47, target: 40 },
]

const approvalData = [
  { month: "Jan", approved: 89, pending: 8, rejected: 3 },
  { month: "Feb", approved: 92, pending: 6, rejected: 2 },
  { month: "Mar", approved: 85, pending: 12, rejected: 3 },
  { month: "Apr", approved: 94, pending: 4, rejected: 2 },
  { month: "May", approved: 88, pending: 10, rejected: 2 },
  { month: "Jun", approved: 91, pending: 7, rejected: 2 },
]

const userActivityData = [
  { time: "9 AM", users: 45 },
  { time: "10 AM", users: 67 },
  { time: "11 AM", users: 89 },
  { time: "12 PM", users: 78 },
  { time: "1 PM", users: 56 },
  { time: "2 PM", users: 134 },
  { time: "3 PM", users: 156 },
  { time: "4 PM", users: 142 },
  { time: "5 PM", users: 98 },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userType, setUserType] = useState("employee")
  const [userDepartment, setUserDepartment] = useState("")
  const [userName, setUserName] = useState("")
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") || "employee"
    const storedUserDepartment = localStorage.getItem("userDepartment") || ""
    const storedUserName = localStorage.getItem("userName") || "Demo User"

    setUserType(storedUserType)
    setUserDepartment(storedUserDepartment)
    setUserName(storedUserName)

    // Filter departments based on user access
    if (storedUserDepartment === "executive") {
      // Executive can see all departments
      setDepartments(allDepartments)
    } else {
      // Regular users can only see their department
      const userDept = allDepartments.find((dept) => dept.id === storedUserDepartment)
      setDepartments(userDept ? [userDept] : [])
    }

    // Log dashboard access
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: storedUserName,
      action: "Dashboard Access",
      details: `Accessed dashboard - ${storedUserType} in ${storedUserDepartment} department`,
      timestamp: new Date().toISOString(),
      type: "access",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))
  }, [])

  const notifications = [
    { id: 1, message: "New SOP requires your review", time: "2 hours ago", type: "urgent" },
    { id: 2, message: "Team meeting scheduled for tomorrow", time: "4 hours ago", type: "info" },
    { id: 3, message: "Document approval pending", time: "1 day ago", type: "warning" },
  ]

  const reminders = [
    { id: 1, task: "Complete safety training", due: "Today" },
    { id: 2, task: "Submit monthly report", due: "Tomorrow" },
    { id: 3, task: "Review quality metrics", due: "3 days" },
  ]

  const getDepartmentLink = (deptName: string, deptId: string) => {
    return userType === "manager" ? `/manager/department/${deptId}` : `/department/${deptId}`
  }

  const handleLogout = () => {
    // Log logout activity
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: userName,
      action: "Logout",
      details: "User logged out of the system",
      timestamp: new Date().toISOString(),
      type: "system",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))

    // Clear user data
    localStorage.removeItem("userType")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userDepartment")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")

    window.location.href = "/login"
  }

  // Infographic-style components
  const InfographicCard = ({ title, value, change, icon: Icon, color, bgColor }) => (
    <Card
      className={`${bgColor} border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white mb-2">{value}</p>
            <div className="flex items-center text-white/90">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{change}</span>
            </div>
          </div>
          <div className={`p-4 rounded-full ${color} bg-white/20`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const CircularProgress = ({ percentage, color, size = 120 }) => {
    const radius = (size - 20) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
        </div>
      </div>
    )
  }

  const LineChartInfographic = ({ data, dataKeys, colors, title, height = 100 }) => {
    const allValues = data.flatMap((d) => dataKeys.map((key) => d[key]))
    const maxValue = Math.max(...allValues)
    const minValue = Math.min(...allValues)
    const range = maxValue - minValue || 1

    const getPath = (dataKey, color) => {
      const points = data.map((item, index) => {
        const x = (index / (data.length - 1)) * 300
        const y = height - ((item[dataKey] - minValue) / range) * height
        return `${x},${y}`
      })
      return (
        <polyline
          key={dataKey}
          fill="none"
          stroke={color}
          strokeWidth="3"
          points={points.join(" ")}
          className="drop-shadow-sm"
        />
      )
    }

    return (
      <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <div className="relative">
          <svg className="w-full" viewBox={`0 0 300 ${height}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3f4f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={(i * height) / 4}
                x2="300"
                y2={(i * height) / 4}
                stroke="url(#gridGradient)"
                strokeWidth="1"
              />
            ))}
            {dataKeys.map((dataKey, index) => getPath(dataKey, colors[index]))}
          </svg>
        </div>
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          {data.map((item, index) => (
            <span key={index} className="font-medium">
              {item.month || item.time}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden mr-2">
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

              <Image src="/logo.png" alt="CMPLAI Logo" width={120} height={40} className="object-contain" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{userName}</span>
                {userDepartment !== "executive" && (
                  <span className="ml-2 text-gray-400">
                    ({allDepartments.find((d) => d.id === userDepartment)?.name || userDepartment})
                  </span>
                )}
              </div>
              <Badge
                variant="secondary"
                className={`capitalize ${userType === "manager" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
              >
                {userType}
                {userDepartment === "executive" && " (Executive)"}
              </Badge>
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
          </div>

          <nav className="mt-6 px-3">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start bg-blue-50 text-blue-700">
                <Home className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
              <Link href="/team">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-3" />
                  Team
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start">
                <Building2 className="w-4 h-4 mr-3" />
                Organization Chart
              </Button>
              <Link href="/timesheet">
                <Button variant="ghost" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-3" />
                  Time Sheet
                </Button>
              </Link>
              <Link href="/goals">
                <Button variant="ghost" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-3" />
                  My Goals
                </Button>
              </Link>
              <Link href="/activity-log">
                <Button variant="ghost" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-3" />
                  Activity Log
                </Button>
              </Link>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6">
            {/* Welcome Banner */}
            <div
              className={`mb-8 bg-gradient-to-r ${userType === "manager" ? "from-green-600 via-emerald-600 to-teal-600" : "from-blue-600 via-indigo-600 to-purple-600"} rounded-xl p-8 text-white shadow-2xl`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-3 flex items-center">
                    <Zap className="w-8 h-8 mr-3" />
                    Welcome back, {userName}!
                  </h1>
                  <p className={`text-lg ${userType === "manager" ? "text-green-100" : "text-blue-100"}`}>
                    {userDepartment === "executive"
                      ? "You have access to all departments and documents as an executive user."
                      : userType === "manager"
                        ? `Review and approve documents from your ${allDepartments.find((d) => d.id === userDepartment)?.name || userDepartment} team.`
                        : `Your AI-powered ERP dashboard for ${allDepartments.find((d) => d.id === userDepartment)?.name || userDepartment} department.`}
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    {userType === "manager" ? (
                      <Award className="w-16 h-16 text-white" />
                    ) : (
                      <Globe className="w-16 h-16 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Infographic Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <InfographicCard
                title={userType === "manager" ? "Pending Approvals" : "Active Documents"}
                value={userType === "manager" ? "23" : "156"}
                change="+12% this week"
                icon={FileText}
                color="text-blue-600"
                bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
              />
              <InfographicCard
                title={userType === "manager" ? "High Priority" : "Pending Tasks"}
                value={userType === "manager" ? "8" : "23"}
                change="+5% this week"
                icon={Clock}
                color="text-orange-600"
                bgColor="bg-gradient-to-br from-orange-500 to-red-500"
              />
              <InfographicCard
                title={userDepartment === "executive" ? "All Departments" : "Team Members"}
                value={userDepartment === "executive" ? departments.length : "47"}
                change="+3 new members"
                icon={Users}
                color="text-green-600"
                bgColor="bg-gradient-to-br from-green-500 to-emerald-500"
              />
              <InfographicCard
                title="Compliance Rate"
                value="98%"
                change="+2% this month"
                icon={Shield}
                color="text-purple-600"
                bgColor="bg-gradient-to-br from-purple-500 to-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Services/Departments */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      {userDepartment === "executive" ? "All Departments" : "Your Department"}
                      {userType === "manager" && (
                        <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                          Manager View
                        </Badge>
                      )}
                      {userDepartment === "executive" && (
                        <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-800">
                          Executive Access
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {departments.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {departments.map((dept, index) => (
                          <Link key={index} href={getDepartmentLink(dept.name, dept.id)}>
                            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50">
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                  <div className={`p-3 rounded-xl ${dept.color} shadow-lg`}>
                                    <dept.icon className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900 truncate">{dept.name}</p>
                                    <div className="flex items-center space-x-2">
                                      <p className="text-xs text-gray-500">{dept.documents} documents</p>
                                      {userType === "manager" && dept.pendingApprovals > 0 && (
                                        <Badge variant="destructive" className="text-xs animate-pulse">
                                          {dept.pendingApprovals} pending
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No departments available</p>
                        <p className="text-sm mt-2">Please contact your administrator if this seems incorrect.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Notifications & Reminders */}
              <div className="space-y-6">
                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Bell className="w-5 h-5 text-blue-600" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 bg-white rounded-lg shadow-sm border border-blue-100">
                        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                    <Link href="/notifications">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-blue-50 border-blue-200 hover:bg-blue-100"
                      >
                        View All Notifications
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-yellow-50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="w-5 h-5 text-yellow-600" />
                      {userType === "manager" ? "Action Items" : "Reminders"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {reminders.map((reminder) => (
                      <div
                        key={reminder.id}
                        className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">{reminder.task}</p>
                          <p className="text-xs text-gray-500">Due: {reminder.due}</p>
                        </div>
                        <Badge variant="outline" className="text-xs bg-yellow-100 border-yellow-300">
                          {reminder.due}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Infographic Analytics Section */}
            <div className="mb-8">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    Analytics & Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Document Creation Trends */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200 shadow-lg">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-lg font-bold text-blue-900 mb-2">Document Creation</h4>
                          <p className="text-sm text-blue-700">Monthly trends and targets</p>
                        </div>
                        <div className="p-3 bg-blue-500 rounded-full">
                          <LineChart className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <LineChartInfographic
                        data={documentCreationData}
                        dataKeys={["documents", "target"]}
                        colors={["#3b82f6", "#93c5fd"]}
                        title=""
                        height={80}
                      />
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                          <p className="text-2xl font-bold text-blue-900">47</p>
                          <p className="text-xs text-blue-700">This Month</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                          <p className="text-2xl font-bold text-green-600">+46.9%</p>
                          <p className="text-xs text-green-700">Growth</p>
                        </div>
                      </div>
                    </div>

                    {/* Approval Workflow */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200 shadow-lg">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-lg font-bold text-green-900 mb-2">Approval Rate</h4>
                          <p className="text-sm text-green-700">Workflow efficiency</p>
                        </div>
                        <CircularProgress percentage={91} color="#10b981" size={80} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                          <p className="text-2xl font-bold text-green-900">2.3</p>
                          <p className="text-xs text-green-700">Avg Days</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                          <p className="text-2xl font-bold text-red-600">-15%</p>
                          <p className="text-xs text-red-700">Time Saved</p>
                        </div>
                      </div>
                    </div>

                    {/* User Activity */}
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-6 rounded-2xl border border-purple-200 shadow-lg">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-lg font-bold text-purple-900 mb-2">User Activity</h4>
                          <p className="text-sm text-purple-700">Daily engagement patterns</p>
                        </div>
                        <div className="p-3 bg-purple-500 rounded-full">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <LineChartInfographic
                        data={userActivityData}
                        dataKeys={["users"]}
                        colors={["#8b5cf6"]}
                        title=""
                        height={80}
                      />
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                          <p className="text-2xl font-bold text-purple-900">156</p>
                          <p className="text-xs text-purple-700">Peak Users</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                          <p className="text-2xl font-bold text-green-600">+12%</p>
                          <p className="text-xs text-green-700">vs Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
