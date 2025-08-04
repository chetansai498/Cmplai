"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Target, Users, Building2, Clock, FileText, Shield, Beaker, Factory, Truck, Stethoscope, TrendingUp, Monitor, UserCheck, Scale, FlaskConical, DollarSign, Menu, X, Home, Settings, LogOut, CheckCircle, Activity } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const allDepartments = [
  { id: "ehs", name: "EHS", icon: Shield, color: "bg-red-500", documents: 12, pendingApprovals: 4 },
  { id: "regulatory-affairs", name: "Regulatory Affairs", icon: Scale, color: "bg-blue-500", documents: 8, pendingApprovals: 2 },
  { id: "quality-assurance", name: "Quality Assurance", icon: Beaker, color: "bg-green-500", documents: 15, pendingApprovals: 3 },
  { id: "quality-control", name: "Quality Control", icon: FlaskConical, color: "bg-purple-500", documents: 10, pendingApprovals: 1 },
  { id: "manufacturing", name: "Manufacturing", icon: Factory, color: "bg-orange-500", documents: 20, pendingApprovals: 5 },
  { id: "supply-chain", name: "Supply Chain", icon: Truck, color: "bg-indigo-500", documents: 14, pendingApprovals: 2 },
  { id: "clinical-operations", name: "Clinical Operations", icon: Stethoscope, color: "bg-pink-500", documents: 9, pendingApprovals: 1 },
  { id: "sales-marketing", name: "Sales & Marketing", icon: TrendingUp, color: "bg-cyan-500", documents: 11, pendingApprovals: 0 },
  { id: "it", name: "IT", icon: Monitor, color: "bg-gray-500", documents: 7, pendingApprovals: 1 },
  { id: "hr", name: "HR", icon: UserCheck, color: "bg-yellow-500", documents: 13, pendingApprovals: 2 },
  { id: "finance", name: "Finance", icon: DollarSign, color: "bg-emerald-500", documents: 16, pendingApprovals: 3 },
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
      const userDept = allDepartments.find(dept => dept.id === storedUserDepartment)
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
      type: "access"
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
      type: "system"
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

  return (
    <div className="min-h-screen bg-gray-50">
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
                    ({allDepartments.find(d => d.id === userDepartment)?.name || userDepartment})
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
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
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
              <Button variant="ghost" className="w-full justify-start">
                <Users className="w-4 h-4 mr-3" />
                Team
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Building2 className="w-4 h-4 mr-3" />
                Organization Chart
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-3" />
                Time Sheet
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Target className="w-4 h-4 mr-3" />
                My Goals
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Activity className="w-4 h-4 mr-3" />
                Activity Log
              </Button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6">
            {/* Welcome Banner */}
            <div
              className={`mb-8 bg-gradient-to-r ${userType === "manager" ? "from-green-600 to-emerald-600" : "from-blue-600 to-indigo-600"} rounded-lg p-6 text-white`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    Welcome back, {userName}!
                  </h1>
                  <p className={`${userType === "manager" ? "text-green-100" : "text-blue-100"}`}>
                    {userDepartment === "executive" 
                      ? "You have access to all departments and documents as an executive user."
                      : userType === "manager"
                      ? `Review and approve documents from your ${allDepartments.find(d => d.id === userDepartment)?.name || userDepartment} team.`
                      : `Your AI-powered ERP dashboard for ${allDepartments.find(d => d.id === userDepartment)?.name || userDepartment} department.`
                    }
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    {userType === "manager" ? (
                      <CheckCircle className="w-12 h-12 text-white" />
                    ) : (
                      <Users className="w-12 h-12 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        {userType === "manager" ? "Pending Approvals" : "Active Documents"}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">{userType === "manager" ? "23" : "156"}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        {userType === "manager" ? "High Priority" : "Pending Tasks"}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">{userType === "manager" ? "8" : "23"}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        {userDepartment === "executive" ? "All Departments" : "Team Members"}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {userDepartment === "executive" ? departments.length : "47"}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Compliance Rate</p>
                      <p className="text-2xl font-bold text-gray-900">98%</p>
                    </div>
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Services/Departments */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
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
                            <Card className="hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                              <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                  <div className={`p-2 rounded-lg ${dept.color}`}>
                                    <dept.icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{dept.name}</p>
                                    <div className="flex items-center space-x-2">
                                      <p className="text-xs text-gray-500">{dept.documents} documents</p>
                                      {userType === "manager" && dept.pendingApprovals > 0 && (
                                        <Badge variant="destructive" className="text-xs">
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
                      <div className="text-center py-8 text-gray-500">
                        <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No departments available for your access level.</p>
                        <p className="text-sm mt-2">Please contact your administrator if this seems incorrect.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Notifications & Reminders */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {userType === "manager" ? "Action Items" : "Reminders"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {reminders.map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-900">{reminder.task}</p>
                          <p className="text-xs text-gray-500">Due: {reminder.due}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {reminder.due}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
