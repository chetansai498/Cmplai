"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Factory,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Download,
  Settings,
  BarChart3,
  Package,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const manufacturingDocuments = [
  {
    id: 1,
    title: "Production Line A Maintenance Schedule",
    type: "Maintenance Schedule",
    status: "completed",
    priority: "high",
    dueDate: "2024-01-22",
    assignee: "Emily Chen",
    progress: 100,
    lastModified: "2024-01-20",
  },
  {
    id: 2,
    title: "Quality Control Batch Record #2024-001",
    type: "Batch Record",
    status: "in_progress",
    priority: "critical",
    dueDate: "2024-01-25",
    assignee: "James Thompson",
    progress: 85,
    lastModified: "2024-01-21",
  },
  {
    id: 3,
    title: "Equipment Calibration Report - January",
    type: "Calibration Report",
    status: "pending",
    priority: "medium",
    dueDate: "2024-01-28",
    assignee: "Lisa Wang",
    progress: 30,
    lastModified: "2024-01-18",
  },
  {
    id: 4,
    title: "Inventory Management System Update",
    type: "System Documentation",
    status: "overdue",
    priority: "high",
    dueDate: "2024-01-20",
    assignee: "David Rodriguez",
    progress: 65,
    lastModified: "2024-01-19",
  },
  {
    id: 5,
    title: "Production Data Analysis Q1 2024",
    type: "Data Report",
    status: "in_progress",
    priority: "medium",
    dueDate: "2024-02-01",
    assignee: "Emily Chen",
    progress: 45,
    lastModified: "2024-01-21",
  },
]

const productionMetrics = [
  { name: "Line A", efficiency: 94, target: 95, status: "good" },
  { name: "Line B", efficiency: 87, target: 90, status: "warning" },
  { name: "Line C", efficiency: 98, target: 95, status: "excellent" },
  { name: "Line D", efficiency: 82, target: 85, status: "critical" },
]

const recentActivities = [
  {
    id: 1,
    action: "Batch Record Completed",
    document: "Batch Record #2024-001",
    user: "James Thompson",
    timestamp: "1 hour ago",
    type: "completion",
  },
  {
    id: 2,
    action: "Equipment Maintenance",
    document: "Production Line A Maintenance",
    user: "Emily Chen",
    timestamp: "3 hours ago",
    type: "maintenance",
  },
  {
    id: 3,
    action: "Quality Check Passed",
    document: "Quality Control Report",
    user: "Lisa Wang",
    timestamp: "5 hours ago",
    type: "quality",
  },
  {
    id: 4,
    action: "Inventory Updated",
    document: "Raw Materials Inventory",
    user: "David Rodriguez",
    timestamp: "1 day ago",
    type: "inventory",
  },
]

export default function ManufacturingPage() {
  const [documents, setDocuments] = useState(manufacturingDocuments)
  const [activities, setActivities] = useState(recentActivities)
  const [metrics, setMetrics] = useState(productionMetrics)
  const [userType, setUserType] = useState("employee")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") || "employee"
    const storedUserName = localStorage.getItem("userName") || "Demo User"
    setUserType(storedUserType)
    setUserName(storedUserName)

    // Log department access
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: storedUserName,
      action: "Department Access",
      details: "Accessed Manufacturing department page",
      timestamp: new Date().toISOString(),
      type: "access",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const getEfficiencyColor = (efficiency, target) => {
    if (efficiency >= target + 5) return "text-green-600"
    if (efficiency >= target) return "text-blue-600"
    if (efficiency >= target - 5) return "text-yellow-600"
    return "text-red-600"
  }

  const completedDocs = documents.filter((doc) => doc.status === "completed").length
  const inProgressDocs = documents.filter((doc) => doc.status === "in_progress").length
  const overdueDocs = documents.filter((doc) => doc.status === "overdue").length
  const averageEfficiency = Math.round(metrics.reduce((sum, metric) => sum + metric.efficiency, 0) / metrics.length)

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
              <Link href="/create-document">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Document
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Department Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Factory className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manufacturing</h1>
              <p className="text-gray-600">Manage production processes, quality control, and manufacturing documentation</p>
            </div>
          </div>
          {userType === "manager" && (
            <Badge className="bg-green-100 text-green-800">Manager View - Full Department Access</Badge>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Production Lines</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.length}</p>
                </div>
                <Settings className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Efficiency</p>
                  <p className="text-2xl font-bold text-gray-900">{averageEfficiency}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Batches</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Production Efficiency */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Production Line Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                    <Badge
                      className={`text-xs ${
                        metric.status === "excellent"
                          ? "bg-green-100 text-green-800"
                          : metric.status === "good"
                            ? "bg-blue-100 text-blue-800"
                            : metric.status === "warning"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Current</span>
                      <span className={`font-bold ${getEfficiencyColor(metric.efficiency, metric.target)}`}>
                        {metric.efficiency}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Target</span>
                      <span className="font-bold text-gray-700">{metric.target}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activities.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded border">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-600">{item.document} • {item.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">{item.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
