"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Bell,
  Search,
  Filter,
  Check,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  User,
  FileText,
  Settings,
  Trash2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const mockNotifications = [
  {
    id: 1,
    title: "New SOP requires your review",
    message:
      "Standard Operating Procedure for Chemical Handling has been updated and requires your immediate review and approval.",
    type: "urgent",
    category: "approval",
    time: "2 hours ago",
    read: false,
    sender: "Sarah Johnson",
    department: "Quality Assurance",
  },
  {
    id: 2,
    title: "Team meeting scheduled",
    message: "Weekly safety meeting scheduled for tomorrow at 10:00 AM in Conference Room A.",
    type: "info",
    category: "meeting",
    time: "4 hours ago",
    read: false,
    sender: "Mike Davis",
    department: "EHS",
  },
  {
    id: 3,
    title: "Document approval pending",
    message: "Your submitted Risk Assessment Matrix is pending approval from the department head.",
    type: "warning",
    category: "approval",
    time: "1 day ago",
    read: true,
    sender: "System",
    department: "EHS",
  },
  {
    id: 4,
    title: "Training deadline approaching",
    message: "Your mandatory safety training certification expires in 7 days. Please complete the renewal process.",
    type: "warning",
    category: "training",
    time: "2 days ago",
    read: false,
    sender: "HR System",
    department: "HR",
  },
  {
    id: 5,
    title: "Document successfully approved",
    message: "Your Manufacturing Data Report has been approved and is now active in the system.",
    type: "success",
    category: "approval",
    time: "3 days ago",
    read: true,
    sender: "John Smith",
    department: "Manufacturing",
  },
  {
    id: 6,
    title: "System maintenance scheduled",
    message: "Planned system maintenance will occur this weekend from 2:00 AM to 6:00 AM on Saturday.",
    type: "info",
    category: "system",
    time: "1 week ago",
    read: true,
    sender: "IT Department",
    department: "IT",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filteredNotifications, setFilteredNotifications] = useState(mockNotifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName") || "Demo User"
    setUserName(storedUserName)
  }, [])

  useEffect(() => {
    let filtered = notifications

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (notification) =>
          notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.sender.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((notification) => notification.type === filterType)
    }

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter((notification) => notification.category === filterCategory)
    }

    // Filter by read status
    if (showUnreadOnly) {
      filtered = filtered.filter((notification) => !notification.read)
    }

    setFilteredNotifications(filtered)
  }, [notifications, searchTerm, filterType, filterCategory, showUnreadOnly])

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAsUnread = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: false } : notification)),
    )
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getNotificationBadge = (type) => {
    const badges = {
      urgent: "bg-red-100 text-red-800 border-red-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
      success: "bg-green-100 text-green-800 border-green-200",
      info: "bg-blue-100 text-blue-800 border-blue-200",
    }
    return badges[type] || badges.info
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Image src="/logo.png" alt="CMPLAI Logo" width={100} height={32} className="object-contain" />
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {unreadCount} unread
              </Badge>
              <Button onClick={markAllAsRead} size="sm" disabled={unreadCount === 0}>
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Stay updated with your latest activities and alerts</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="approval">Approvals</SelectItem>
                  <SelectItem value="meeting">Meetings</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="unreadOnly"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="unreadOnly" className="text-sm font-medium text-gray-700">
                  Unread only
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-all duration-200 hover:shadow-md ${
                  !notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3
                            className={`text-lg font-semibold ${
                              !notification.read ? "text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <Badge className={`text-xs ${getNotificationBadge(notification.type)}`}>
                            {notification.type}
                          </Badge>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
                        </div>
                        <p className="text-gray-600 mb-3 leading-relaxed">{notification.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{notification.sender}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{notification.department}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {notification.read ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsUnread(notification.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Mark Unread
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Mark Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Notification Settings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Email Notifications</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Document approvals</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Meeting reminders</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">System updates</span>
                  </label>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Push Notifications</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Urgent alerts</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Daily summaries</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-sm text-gray-700">Training deadlines</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Settings className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
