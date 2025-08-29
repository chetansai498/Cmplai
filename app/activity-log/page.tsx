"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Activity,
  User,
  FileText,
  Save,
  Sparkles,
  Star,
  Search,
  Filter,
  Calendar,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ActivityLogPage() {
  const [activityLog, setActivityLog] = useState([])
  const [filteredLog, setFilteredLog] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterUser, setFilterUser] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load activity log from localStorage
    const log = JSON.parse(localStorage.getItem("activityLog") || "[]")
    setActivityLog(log.reverse()) // Show most recent first
    setFilteredLog(log)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Filter activity log based on search and filters
    let filtered = activityLog

    if (searchTerm) {
      filtered = filtered.filter(
        (entry:any) =>
          entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.user.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterType !== "all") {
      filtered = filtered.filter((entry) => entry.type === filterType)
    }

    if (filterUser !== "all") {
      filtered = filtered.filter((entry) => entry.user === filterUser)
    }

    setFilteredLog(filtered)
  }, [searchTerm, filterType, filterUser, activityLog])

  const getActivityIcon = (type) => {
    switch (type) {
      case "ai_generation":
        return <Sparkles className="w-4 h-4 text-blue-500" />
      case "content_edit":
        return <FileText className="w-4 h-4 text-green-500" />
      case "feedback":
        return <Star className="w-4 h-4 text-yellow-500" />
      case "save":
        return <Save className="w-4 h-4 text-purple-500" />
      case "access":
        return <User className="w-4 h-4 text-indigo-500" />
      case "system":
        return <Activity className="w-4 h-4 text-gray-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case "ai_generation":
        return "bg-blue-100 text-blue-800"
      case "content_edit":
        return "bg-green-100 text-green-800"
      case "feedback":
        return "bg-yellow-100 text-yellow-800"
      case "save":
        return "bg-purple-100 text-purple-800"
      case "access":
        return "bg-indigo-100 text-indigo-800"
      case "system":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const uniqueUsers = [...new Set(activityLog.map((entry) => entry.user))]
  const uniqueTypes = [...new Set(activityLog.map((entry) => entry.type))]

  const refreshLog = () => {
    setIsLoading(true)
    setTimeout(() => {
      const log = JSON.parse(localStorage.getItem("activityLog") || "[]")
      setActivityLog(log.reverse())
      setFilteredLog(log)
      setIsLoading(false)
    }, 500)
  }

  const exportLog = () => {
    const dataStr = JSON.stringify(filteredLog, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `activity-log-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Image src="/logo.png" alt="CMPLAI Logo" width={120} height={40} className="object-contain" />
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={refreshLog} variant="outline" size="sm" disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button onClick={exportLog} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Log</h1>
          <p className="text-gray-600">Track all system activities and user interactions</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search activities..."
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
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map((user) => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                {filteredLog.length} activities found
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-gray-400 mr-2" />
                <span className="text-gray-600">Loading activities...</span>
              </div>
            ) : filteredLog.length > 0 ? (
              <div className="space-y-4">
                {filteredLog.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">{getActivityIcon(entry.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${getActivityColor(entry.type)}`}>
                            {entry.type.replace("_", " ")}
                          </Badge>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{entry.details}</p>
                      <div className="flex items-center space-x-2">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{entry.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600">
                  {searchTerm || filterType !== "all" || filterUser !== "all"
                    ? "Try adjusting your filters or search terms."
                    : "Start using the system to see activities here."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Activities</p>
                  <p className="text-2xl font-bold text-gray-900">{activityLog.length}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{uniqueUsers.length}</p>
                </div>
                <User className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AI Generations</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activityLog.filter((entry) => entry.type === "ai_generation").length}
                  </p>
                </div>
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Documents Saved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activityLog.filter((entry) => entry.type === "save").length}
                  </p>
                </div>
                <Save className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
