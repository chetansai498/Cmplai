"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Clock,
  Play,
  Pause,
  Square,
  Plus,
  Calendar,
  Download,
  Filter,
  Timer,
  BarChart3,
  CheckCircle,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const projectCategories = [
  "Document Review",
  "Safety Inspection",
  "Training",
  "Meetings",
  "Compliance Audit",
  "Process Improvement",
  "Research & Development",
  "Administrative",
  "Quality Control",
  "Emergency Response",
]

export default function TimesheetPage() {
  const [timeEntries, setTimeEntries] = useState([])
  const [isTracking, setIsTracking] = useState(false)
  const [currentEntry, setCurrentEntry] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [editingEntry, setEditingEntry] = useState(null)
  const [filterWeek, setFilterWeek] = useState("")
  const [newEntry, setNewEntry] = useState({
    project: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "",
    endTime: "",
    duration: 0,
  })

  useEffect(() => {
    // Load time entries from localStorage
    const savedEntries = JSON.parse(localStorage.getItem("timeEntries") || "[]")
    if (savedEntries.length === 0) {
      // Add some sample entries
      const sampleEntries = [
        {
          id: 1,
          project: "Safety Protocol Review",
          category: "Document Review",
          description: "Reviewed and updated safety protocols for manufacturing floor",
          date: "2024-01-15",
          startTime: "09:00",
          endTime: "11:30",
          duration: 2.5,
          status: "completed",
        },
        {
          id: 2,
          project: "Weekly Safety Meeting",
          category: "Meetings",
          description: "Attended weekly safety coordination meeting",
          date: "2024-01-15",
          startTime: "14:00",
          endTime: "15:00",
          duration: 1,
          status: "completed",
        },
        {
          id: 3,
          project: "Equipment Inspection",
          category: "Safety Inspection",
          description: "Conducted routine inspection of manufacturing equipment",
          date: "2024-01-16",
          startTime: "10:00",
          endTime: "12:00",
          duration: 2,
          status: "completed",
        },
      ]
      setTimeEntries(sampleEntries)
      localStorage.setItem("timeEntries", JSON.stringify(sampleEntries))
    } else {
      setTimeEntries(savedEntries)
    }

    // Set current week filter
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
    setFilterWeek(startOfWeek.toISOString().split("T")[0])
  }, [])

  useEffect(() => {
    let interval = null
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime)
      }, 1000)
    } else if (!isTracking) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isTracking, startTime])

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const formatDuration = (hours) => {
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)
    return `${h}h ${m}m`
  }

  const startTracking = () => {
    const now = Date.now()
    setStartTime(now)
    setIsTracking(true)
    setElapsedTime(0)
    setCurrentEntry({
      project: "",
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const pauseTracking = () => {
    setIsTracking(false)
  }

  const stopTracking = () => {
    if (currentEntry && startTime) {
      const duration = (Date.now() - startTime) / (1000 * 60 * 60) // Convert to hours
      const entry = {
        ...currentEntry,
        id: Date.now(),
        startTime: new Date(startTime).toTimeString().slice(0, 5),
        endTime: new Date().toTimeString().slice(0, 5),
        duration: Math.round(duration * 100) / 100,
        status: "completed",
      }

      const updatedEntries = [...timeEntries, entry]
      setTimeEntries(updatedEntries)
      localStorage.setItem("timeEntries", JSON.stringify(updatedEntries))

      // Log activity
      const userName = localStorage.getItem("userName") || "Demo User"
      const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
      activityLog.push({
        id: Date.now(),
        user: userName,
        action: "Time Entry Logged",
        details: `Logged ${formatDuration(duration)} for ${entry.project}`,
        timestamp: new Date().toISOString(),
        type: "time_tracking",
      })
      localStorage.setItem("activityLog", JSON.stringify(activityLog))
    }

    setIsTracking(false)
    setStartTime(null)
    setElapsedTime(0)
    setCurrentEntry(null)
  }

  const addManualEntry = () => {
    if (!newEntry.project.trim() || !newEntry.startTime || !newEntry.endTime) return

    const start = new Date(`${newEntry.date}T${newEntry.startTime}`)
    const end = new Date(`${newEntry.date}T${newEntry.endTime}`)
    const duration = (end - start) / (1000 * 60 * 60) // Convert to hours

    const entry = {
      ...newEntry,
      id: Date.now(),
      duration: Math.round(duration * 100) / 100,
      status: "completed",
    }

    const updatedEntries = [...timeEntries, entry]
    setTimeEntries(updatedEntries)
    localStorage.setItem("timeEntries", JSON.stringify(updatedEntries))

    setNewEntry({
      project: "",
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      startTime: "",
      endTime: "",
      duration: 0,
    })
    setShowAddEntry(false)

    // Log activity
    const userName = localStorage.getItem("userName") || "Demo User"
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: userName,
      action: "Manual Time Entry",
      details: `Added manual entry: ${entry.project} (${formatDuration(duration)})`,
      timestamp: new Date().toISOString(),
      type: "time_tracking",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))
  }

  const updateEntry = (entryId, updates) => {
    const updatedEntries = timeEntries.map((entry) => (entry.id === entryId ? { ...entry, ...updates } : entry))
    setTimeEntries(updatedEntries)
    localStorage.setItem("timeEntries", JSON.stringify(updatedEntries))
  }

  const deleteEntry = (entryId) => {
    const updatedEntries = timeEntries.filter((entry) => entry.id !== entryId)
    setTimeEntries(updatedEntries)
    localStorage.setItem("timeEntries", JSON.stringify(updatedEntries))
  }

  const exportTimesheet = () => {
    const csvContent = [
      ["Date", "Project", "Category", "Description", "Start Time", "End Time", "Duration (hours)"],
      ...timeEntries.map((entry) => [
        entry.date,
        entry.project,
        entry.category,
        entry.description,
        entry.startTime,
        entry.endTime,
        entry.duration,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `timesheet-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getCurrentWeekEntries = () => {
    if (!filterWeek) return timeEntries

    const weekStart = new Date(filterWeek)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)

    return timeEntries.filter((entry) => {
      const entryDate = new Date(entry.date)
      return entryDate >= weekStart && entryDate <= weekEnd
    })
  }

  const currentWeekEntries = getCurrentWeekEntries()
  const totalHoursThisWeek = currentWeekEntries.reduce((sum, entry) => sum + entry.duration, 0)
  const totalEntriesThisWeek = currentWeekEntries.length

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
              <Button onClick={() => setShowAddEntry(true)} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
              <Button onClick={exportTimesheet} variant="outline" size="sm">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Time Tracking</h1>
          <p className="text-gray-600">Track your work hours and manage time entries</p>
        </div>

        {/* Time Tracker */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Active Time Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-gray-900">{formatTime(elapsedTime)}</div>
                  <div className="text-sm text-gray-600">Elapsed Time</div>
                </div>
                {currentEntry && (
                  <div className="flex-1 max-w-md space-y-2">
                    <Input
                      placeholder="Project name"
                      value={currentEntry.project}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, project: e.target.value })}
                    />
                    <Select
                      value={currentEntry.category}
                      onValueChange={(value) => setCurrentEntry({ ...currentEntry, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Description (optional)"
                      value={currentEntry.description}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, description: e.target.value })}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {!isTracking && !currentEntry && (
                  <Button onClick={startTracking} className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                )}
                {isTracking && (
                  <Button onClick={pauseTracking} variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                {currentEntry && (
                  <Button onClick={stopTracking} variant="destructive">
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">{formatDuration(totalHoursThisWeek)}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Entries</p>
                  <p className="text-2xl font-bold text-gray-900">{totalEntriesThisWeek}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg per Day</p>
                  <p className="text-2xl font-bold text-gray-900">{formatDuration(totalHoursThisWeek / 7)}</p>
                </div>
                <Timer className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Target</p>
                  <p className="text-2xl font-bold text-gray-900">40h</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Week Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter by Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <Input
                  type="date"
                  value={filterWeek}
                  onChange={(e) => setFilterWeek(e.target.value)}
                  className="w-40"
                />
              </div>
              <div className="text-sm text-gray-600">Showing {currentWeekEntries.length} entries for selected week</div>
            </div>
          </CardContent>
        </Card>

        {/* Time Entries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Time Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentWeekEntries.length > 0 ? (
              <div className="space-y-4">
                {currentWeekEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="font-medium text-gray-900">{entry.project}</h3>
                        <Badge variant="outline" className="text-xs">
                          {entry.category}
                        </Badge>
                        <Badge className="text-xs bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {entry.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{entry.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{new Date(entry.date).toLocaleDateString()}</span>
                        <span>
                          {entry.startTime} - {entry.endTime}
                        </span>
                        <span className="font-medium">{formatDuration(entry.duration)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => setEditingEntry(entry)} className="h-8 w-8 p-0">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteEntry(entry.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No time entries</h3>
                <p className="text-gray-600 mb-4">Start tracking time or add manual entries to see them here</p>
                <Button onClick={() => setShowAddEntry(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Time Entry
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Entry Modal */}
      {(showAddEntry || editingEntry) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {editingEntry ? "Edit Time Entry" : "Add Manual Entry"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Project</label>
                <Input
                  value={editingEntry ? editingEntry.project : newEntry.project}
                  onChange={(e) =>
                    editingEntry
                      ? setEditingEntry({ ...editingEntry, project: e.target.value })
                      : setNewEntry({ ...newEntry, project: e.target.value })
                  }
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                <Select
                  value={editingEntry ? editingEntry.category : newEntry.category}
                  onValueChange={(value) =>
                    editingEntry
                      ? setEditingEntry({ ...editingEntry, category: value })
                      : setNewEntry({ ...newEntry, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                <Textarea
                  value={editingEntry ? editingEntry.description : newEntry.description}
                  onChange={(e) =>
                    editingEntry
                      ? setEditingEntry({ ...editingEntry, description: e.target.value })
                      : setNewEntry({ ...newEntry, description: e.target.value })
                  }
                  placeholder="Describe the work done"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Date</label>
                <Input
                  type="date"
                  value={editingEntry ? editingEntry.date : newEntry.date}
                  onChange={(e) =>
                    editingEntry
                      ? setEditingEntry({ ...editingEntry, date: e.target.value })
                      : setNewEntry({ ...newEntry, date: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Start Time</label>
                  <Input
                    type="time"
                    value={editingEntry ? editingEntry.startTime : newEntry.startTime}
                    onChange={(e) =>
                      editingEntry
                        ? setEditingEntry({ ...editingEntry, startTime: e.target.value })
                        : setNewEntry({ ...newEntry, startTime: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">End Time</label>
                  <Input
                    type="time"
                    value={editingEntry ? editingEntry.endTime : newEntry.endTime}
                    onChange={(e) =>
                      editingEntry
                        ? setEditingEntry({ ...editingEntry, endTime: e.target.value })
                        : setNewEntry({ ...newEntry, endTime: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddEntry(false)
                    setEditingEntry(null)
                    setNewEntry({
                      project: "",
                      category: "",
                      description: "",
                      date: new Date().toISOString().split("T")[0],
                      startTime: "",
                      endTime: "",
                      duration: 0,
                    })
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (editingEntry) {
                      const start = new Date(`${editingEntry.date}T${editingEntry.startTime}`)
                      const end = new Date(`${editingEntry.date}T${editingEntry.endTime}`)
                      const duration = (end - start) / (1000 * 60 * 60)
                      updateEntry(editingEntry.id, { ...editingEntry, duration: Math.round(duration * 100) / 100 })
                      setEditingEntry(null)
                    } else {
                      addManualEntry()
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {editingEntry ? "Update Entry" : "Add Entry"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
