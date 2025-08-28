"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Target,
  Plus,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  TrendingUp,
  Award,
  Flag,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const goalCategories = [
  "Professional Development",
  "Safety & Compliance",
  "Quality Improvement",
  "Process Optimization",
  "Team Collaboration",
  "Training & Certification",
  "Innovation & Research",
  "Personal Growth",
]

const priorityLevels = [
  { value: "high", label: "High", color: "bg-red-100 text-red-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState([])
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    targetDate: "",
    progress: 0,
    status: "in_progress",
  })

  useEffect(() => {
    // Load goals from localStorage
    const savedGoals = JSON.parse(localStorage.getItem("userGoals") || "[]")
    if (savedGoals.length === 0) {
      // Add some default goals
      const defaultGoals = [
        {
          id: 1,
          title: "Complete Safety Training Certification",
          description: "Finish the advanced safety training program and obtain certification",
          category: "Training & Certification",
          priority: "high",
          targetDate: "2024-03-15",
          progress: 75,
          status: "in_progress",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          title: "Improve Document Review Process",
          description: "Streamline the document review workflow to reduce approval time by 30%",
          category: "Process Optimization",
          priority: "medium",
          targetDate: "2024-04-01",
          progress: 45,
          status: "in_progress",
          createdAt: "2024-01-20",
        },
        {
          id: 3,
          title: "Lead Cross-Department Project",
          description: "Successfully manage a project involving EHS and Manufacturing teams",
          category: "Team Collaboration",
          priority: "high",
          targetDate: "2024-05-30",
          progress: 20,
          status: "in_progress",
          createdAt: "2024-02-01",
        },
        {
          id: 4,
          title: "Implement Quality Metrics Dashboard",
          description: "Create and deploy a real-time quality metrics monitoring system",
          category: "Quality Improvement",
          priority: "medium",
          targetDate: "2024-03-30",
          progress: 100,
          status: "completed",
          createdAt: "2024-01-10",
        },
      ]
      setGoals(defaultGoals)
      localStorage.setItem("userGoals", JSON.stringify(defaultGoals))
    } else {
      setGoals(savedGoals)
    }
  }, [])

  const saveGoals = (updatedGoals) => {
    setGoals(updatedGoals)
    localStorage.setItem("userGoals", JSON.stringify(updatedGoals))
  }

  const addGoal = () => {
    if (!newGoal.title.trim()) return

    const goal = {
      ...newGoal,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }

    const updatedGoals = [...goals, goal]
    saveGoals(updatedGoals)
    setNewGoal({
      title: "",
      description: "",
      category: "",
      priority: "medium",
      targetDate: "",
      progress: 0,
      status: "in_progress",
    })
    setShowAddGoal(false)

    // Log activity
    const userName = localStorage.getItem("userName") || "Demo User"
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: userName,
      action: "Goal Created",
      details: `Created new goal: ${goal.title}`,
      timestamp: new Date().toISOString(),
      type: "goal_management",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))
  }

  const updateGoal = (goalId, updates) => {
    const updatedGoals = goals.map((goal) => (goal.id === goalId ? { ...goal, ...updates } : goal))
    saveGoals(updatedGoals)

    // Log activity
    const userName = localStorage.getItem("userName") || "Demo User"
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: userName,
      action: "Goal Updated",
      details: `Updated goal: ${goals.find((g) => g.id === goalId)?.title}`,
      timestamp: new Date().toISOString(),
      type: "goal_management",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))
  }

  const deleteGoal = (goalId) => {
    const goalToDelete = goals.find((g) => g.id === goalId)
    const updatedGoals = goals.filter((goal) => goal.id !== goalId)
    saveGoals(updatedGoals)

    // Log activity
    const userName = localStorage.getItem("userName") || "Demo User"
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: userName,
      action: "Goal Deleted",
      details: `Deleted goal: ${goalToDelete?.title}`,
      timestamp: new Date().toISOString(),
      type: "goal_management",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Target className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    return priorityLevels.find((p) => p.value === priority)?.color || "bg-gray-100 text-gray-800"
  }

  const completedGoals = goals.filter((goal) => goal.status === "completed").length
  const inProgressGoals = goals.filter((goal) => goal.status === "in_progress").length
  const averageProgress =
    goals.length > 0 ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length) : 0

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
            <Button onClick={() => setShowAddGoal(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Goals</h1>
          <p className="text-gray-600">Track and manage your professional and personal objectives</p>
        </div>

        {/* Goal Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Goals</p>
                  <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedGoals}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{inProgressGoals}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{goal.title}</CardTitle>
                    <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {goal.category}
                      </Badge>
                      <Badge className={`text-xs ${getPriorityColor(goal.priority)}`}>{goal.priority}</Badge>
                      <Badge className={`text-xs ${getStatusColor(goal.status)}`}>
                        {getStatusIcon(goal.status)}
                        <span className="ml-1">{goal.status.replace("_", " ")}</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => setEditingGoal(goal)} className="h-8 w-8 p-0">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteGoal(goal.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-600">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateGoal(goal.id, { progress: Math.min(100, goal.progress + 10) })}
                        className="h-7 px-2 text-xs"
                      >
                        +10%
                      </Button>
                      {goal.progress === 100 && goal.status !== "completed" && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => updateGoal(goal.id, { status: "completed" })}
                          className="h-7 px-2 text-xs bg-green-600 hover:bg-green-700"
                        >
                          <Award className="w-3 h-3 mr-1" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {goals.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
              <p className="text-gray-600 mb-4">Start by creating your first goal to track your progress</p>
              <Button onClick={() => setShowAddGoal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Goal Modal */}
      {(showAddGoal || editingGoal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="w-5 h-5" />
                {editingGoal ? "Edit Goal" : "Add New Goal"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
                <Input
                  value={editingGoal ? editingGoal.title : newGoal.title}
                  onChange={(e) =>
                    editingGoal
                      ? setEditingGoal({ ...editingGoal, title: e.target.value })
                      : setNewGoal({ ...newGoal, title: e.target.value })
                  }
                  placeholder="Enter goal title"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                <Textarea
                  value={editingGoal ? editingGoal.description : newGoal.description}
                  onChange={(e) =>
                    editingGoal
                      ? setEditingGoal({ ...editingGoal, description: e.target.value })
                      : setNewGoal({ ...newGoal, description: e.target.value })
                  }
                  placeholder="Describe your goal"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                  <Select
                    value={editingGoal ? editingGoal.category : newGoal.category}
                    onValueChange={(value) =>
                      editingGoal
                        ? setEditingGoal({ ...editingGoal, category: value })
                        : setNewGoal({ ...newGoal, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {goalCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Priority</label>
                  <Select
                    value={editingGoal ? editingGoal.priority : newGoal.priority}
                    onValueChange={(value) =>
                      editingGoal
                        ? setEditingGoal({ ...editingGoal, priority: value })
                        : setNewGoal({ ...newGoal, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Target Date</label>
                <Input
                  type="date"
                  value={editingGoal ? editingGoal.targetDate : newGoal.targetDate}
                  onChange={(e) =>
                    editingGoal
                      ? setEditingGoal({ ...editingGoal, targetDate: e.target.value })
                      : setNewGoal({ ...newGoal, targetDate: e.target.value })
                  }
                />
              </div>
              {editingGoal && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Progress (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editingGoal.progress}
                    onChange={(e) => setEditingGoal({ ...editingGoal, progress: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
              )}
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddGoal(false)
                    setEditingGoal(null)
                    setNewGoal({
                      title: "",
                      description: "",
                      category: "",
                      priority: "medium",
                      targetDate: "",
                      progress: 0,
                      status: "in_progress",
                    })
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (editingGoal) {
                      updateGoal(editingGoal.id, editingGoal)
                      setEditingGoal(null)
                    } else {
                      addGoal()
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {editingGoal ? "Update Goal" : "Add Goal"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
