"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Save,
  Download,
  AlertTriangle,
  Sparkles,
  Plus,
  FileText,
  Star,
  Activity,
  Clock,
  User,
  GripVertical,
  Maximize2,
  Minimize2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const documentSections = [
  { id: "project-info", title: "Project Information", required: true },
  { id: "risk-matrix", title: "Risk Matrix Reference", required: true },
  { id: "job-steps", title: "Job Steps Analysis", required: true },
  { id: "hazard-identification", title: "Hazard Identification", required: true },
  { id: "control-measures", title: "Control Measures", required: true },
  { id: "risk-assessment", title: "Risk Assessment", required: true },
  { id: "verification", title: "Verification and Approval", required: true },
  { id: "emergency-procedures", title: "Emergency Procedures", required: false },
  { id: "training-requirements", title: "Training Requirements", required: false },
  { id: "review-schedule", title: "Review Schedule", required: false },
]

export default function JobSafetyAnalysisPage() {
  const [selectedSection, setSelectedSection] = useState("")
  const [sectionInput, setSectionInput] = useState("")
  const [aiPrompt, setAiPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [documentContent, setDocumentContent] = useState({})
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" })
  const [showFeedback, setShowFeedback] = useState(false)
  const [activityLog, setActivityLog] = useState([])
  const [documentTitle, setDocumentTitle] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [leftPanelWidth, setLeftPanelWidth] = useState(50)
  const [isResizing, setIsResizing] = useState(false)
  const [isLeftPanelExpanded, setIsLeftPanelExpanded] = useState(false)

  const resizeRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Load saved document if exists
    const savedDoc = localStorage.getItem("jsa-draft")
    if (savedDoc) {
      const parsed = JSON.parse(savedDoc)
      setDocumentContent(parsed.content || {})
      setDocumentTitle(parsed.title || "")
      setLastSaved(new Date(parsed.lastSaved))
    }

    // Load activity log
    const log = JSON.parse(localStorage.getItem("activityLog") || "[]")
    setActivityLog(log.filter((entry) => entry.documentType === "JSA").slice(-10))
  }, [])

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId)
    setSectionInput(documentContent[sectionId] || "")
    setGeneratedContent("")
    setAiPrompt("")
    setShowFeedback(false)
  }

  const generateContent = async () => {
    if (!aiPrompt.trim()) return

    setIsGenerating(true)

    // Log AI generation activity
    const userName = localStorage.getItem("userName") || "User"
    const newLogEntry = {
      id: Date.now(),
      user: userName,
      action: "AI Content Generated",
      details: `Generated content for ${documentSections.find((s) => s.id === selectedSection)?.title}`,
      timestamp: new Date().toISOString(),
      type: "ai_generation",
      documentType: "JSA",
    }

    const updatedLog = [...activityLog, newLogEntry]
    setActivityLog(updatedLog)

    // Update global activity log
    const globalLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    globalLog.push(newLogEntry)
    localStorage.setItem("activityLog", JSON.stringify(globalLog))

    setTimeout(() => {
      const sectionTitle = documentSections.find((s) => s.id === selectedSection)?.title
      const generatedText = `AI-Generated Content for ${sectionTitle}:

Based on your prompt: "${aiPrompt}"

This is comprehensive, professionally written content that addresses the specific requirements for ${sectionTitle} in a Job Safety Analysis document. The content follows industry best practices and regulatory compliance standards.

Key Points Covered:
• Detailed analysis of safety requirements
• Risk mitigation strategies
• Compliance with safety regulations
• Best practices implementation
• Clear action items and responsibilities

This content can be customized further based on your specific operational requirements and safety protocols.`

      setGeneratedContent(generatedText)
      setIsGenerating(false)
      setShowFeedback(true)
    }, 2000)
  }

  const submitFeedback = () => {
    const userName = localStorage.getItem("userName") || "User"
    const feedbackEntry = {
      id: Date.now(),
      user: userName,
      action: "Content Feedback",
      details: `Rated AI content ${feedback.rating}/5 stars${feedback.comment ? `: "${feedback.comment}"` : ""}`,
      timestamp: new Date().toISOString(),
      type: "feedback",
      documentType: "JSA",
      rating: feedback.rating,
      comment: feedback.comment,
    }

    const updatedLog = [...activityLog, feedbackEntry]
    setActivityLog(updatedLog)

    // Update global activity log
    const globalLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    globalLog.push(feedbackEntry)
    localStorage.setItem("activityLog", JSON.stringify(globalLog))

    setFeedback({ rating: 0, comment: "" })
    setShowFeedback(false)
  }

  const addToDocument = () => {
    if (generatedContent && selectedSection) {
      setDocumentContent((prev) => ({
        ...prev,
        [selectedSection]: generatedContent,
      }))
      setGeneratedContent("")
      setAiPrompt("")
      setSectionInput(generatedContent)
      setShowFeedback(false)

      // Log content addition
      const userName = localStorage.getItem("userName") || "User"
      const addEntry = {
        id: Date.now(),
        user: userName,
        action: "Content Added",
        details: `Added AI-generated content to ${documentSections.find((s) => s.id === selectedSection)?.title}`,
        timestamp: new Date().toISOString(),
        type: "content_edit",
        documentType: "JSA",
      }

      const updatedLog = [...activityLog, addEntry]
      setActivityLog(updatedLog)

      const globalLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
      globalLog.push(addEntry)
      localStorage.setItem("activityLog", JSON.stringify(globalLog))
    }
  }

  const updateSectionInput = () => {
    if (sectionInput && selectedSection) {
      setDocumentContent((prev) => ({
        ...prev,
        [selectedSection]: sectionInput,
      }))

      // Log manual edit
      const userName = localStorage.getItem("userName") || "User"
      const editEntry = {
        id: Date.now(),
        user: userName,
        action: "Manual Edit",
        details: `Manually edited ${documentSections.find((s) => s.id === selectedSection)?.title}`,
        timestamp: new Date().toISOString(),
        type: "content_edit",
        documentType: "JSA",
      }

      const updatedLog = [...activityLog, editEntry]
      setActivityLog(updatedLog)

      const globalLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
      globalLog.push(editEntry)
      localStorage.setItem("activityLog", JSON.stringify(globalLog))
    }
  }

  const saveDocument = async () => {
    setIsSaving(true)

    const documentData = {
      title: documentTitle || "Untitled JSA Document",
      content: documentContent,
      lastSaved: new Date().toISOString(),
      type: "JSA",
    }

    localStorage.setItem("jsa-draft", JSON.stringify(documentData))

    // Log save action
    const userName = localStorage.getItem("userName") || "User"
    const saveEntry = {
      id: Date.now(),
      user: userName,
      action: "Document Saved",
      details: `Saved JSA document: ${documentData.title}`,
      timestamp: new Date().toISOString(),
      type: "document_save",
      documentType: "JSA",
    }

    const updatedLog = [...activityLog, saveEntry]
    setActivityLog(updatedLog)

    const globalLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    globalLog.push(saveEntry)
    localStorage.setItem("activityLog", JSON.stringify(globalLog))

    setTimeout(() => {
      setIsSaving(false)
      setLastSaved(new Date())
    }, 1000)
  }

  const getSectionStatus = (sectionId: string) => {
    return documentContent[sectionId] ? "completed" : "empty"
  }

  // Resize functionality
  const handleMouseDown = (e) => {
    setIsResizing(true)
    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isResizing || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

    if (newWidth >= 20 && newWidth <= 80) {
      setLeftPanelWidth(newWidth)
    }
  }

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isResizing])

  const toggleLeftPanel = () => {
    setIsLeftPanelExpanded(!isLeftPanelExpanded)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/department/ehs">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to EHS
                </Button>
              </Link>
              <div>
                <div className="flex items-center space-x-2">
                  <Input
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    placeholder="Enter document title..."
                    className="text-xl font-bold border-none p-0 h-auto focus:ring-0"
                  />
                </div>
                <p className="text-sm text-gray-600">AI-Powered Risk Assessment and Safety Planning</p>
                {lastSaved && <p className="text-xs text-gray-500">Last saved: {lastSaved.toLocaleString()}</p>}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={saveDocument} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Image src="/logo.png" alt="CMPLAI Logo" width={80} height={30} className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex h-[calc(100vh-80px)] relative"
        style={{ cursor: isResizing ? "col-resize" : "default" }}
      >
        {/* Left Panel - Content Generation */}
        <div
          className={`${isLeftPanelExpanded ? "fixed inset-0 z-50 bg-white" : ""} overflow-y-auto border-r border-gray-200 transition-all duration-300`}
          style={{
            width: isLeftPanelExpanded ? "100%" : `${leftPanelWidth}%`,
            minWidth: isLeftPanelExpanded ? "100%" : "300px",
          }}
        >
          <div className="p-6 space-y-6">
            {/* Panel Controls */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Content Generation</h2>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={toggleLeftPanel} className="p-1">
                  {isLeftPanelExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Section Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Section Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Select Document Section:</label>
                  <Select value={selectedSection} onValueChange={handleSectionSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a section to work on..." />
                    </SelectTrigger>
                    <SelectContent>
                      {documentSections.map((section) => (
                        <SelectItem key={section.id} value={section.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{section.title}</span>
                            <div className="flex items-center space-x-2 ml-4">
                              {section.required && <span className="text-red-500 text-xs">*</span>}
                              <Badge
                                variant={getSectionStatus(section.id) === "completed" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {getSectionStatus(section.id) === "completed" ? "Completed" : "Empty"}
                              </Badge>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedSection && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Current Content for {documentSections.find((s) => s.id === selectedSection)?.title}:
                    </label>
                    <Textarea
                      value={sectionInput}
                      onChange={(e) => setSectionInput(e.target.value)}
                      onBlur={updateSectionInput}
                      placeholder="Enter content manually or use AI generation below..."
                      className="min-h-[100px]"
                      rows={4}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Content Generation */}
            <Card className="border-blue-200 bg-blue-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  AI Content Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Describe what you want to generate:</label>
                  <Textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder={
                      selectedSection
                        ? `Describe the content you need for ${documentSections.find((s) => s.id === selectedSection)?.title}...`
                        : "Please select a section first to generate content..."
                    }
                    className="min-h-[80px]"
                    rows={3}
                    disabled={!selectedSection}
                  />
                </div>

                <Button
                  onClick={generateContent}
                  disabled={!aiPrompt.trim() || !selectedSection || isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>

                {generatedContent && (
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-gray-900 mb-2">Generated Content:</h4>
                      <div className="text-sm text-gray-700 whitespace-pre-wrap max-h-60 overflow-y-auto">
                        {generatedContent}
                      </div>
                    </div>

                    <Button onClick={addToDocument} className="w-full bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Document
                    </Button>
                  </div>
                )}

                {/* Feedback Section */}
                {showFeedback && (
                  <Card className="border-orange-200 bg-orange-50/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Rate this AI-generated content:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            variant="ghost"
                            size="sm"
                            className="p-1"
                            onClick={() => setFeedback({ ...feedback, rating: star })}
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          </Button>
                        ))}
                      </div>
                      <Textarea
                        value={feedback.comment}
                        onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                        placeholder="Optional: Add your feedback comments..."
                        className="min-h-[60px]"
                        rows={2}
                      />
                      <Button
                        onClick={submitFeedback}
                        size="sm"
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        disabled={feedback.rating === 0}
                      >
                        Submit Feedback
                      </Button>
                    </CardContent>
                  </Card>
                )}

                <div className="text-xs text-blue-600 bg-blue-100 p-3 rounded-lg">
                  <p className="font-medium mb-1">💡 AI Tips:</p>
                  <ul className="space-y-1">
                    <li>• Be specific about the type of content you need</li>
                    <li>• Mention any compliance standards or regulations</li>
                    <li>• Include context about your industry or process</li>
                    <li>• Specify the level of detail required</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-gray-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {activityLog.length > 0 ? (
                    activityLog
                      .slice(-5)
                      .reverse()
                      .map((entry) => (
                        <div key={entry.id} className="flex items-start space-x-3 p-2 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0">
                            {entry.type === "ai_generation" && <Sparkles className="w-4 h-4 text-blue-500 mt-0.5" />}
                            {entry.type === "content_edit" && <FileText className="w-4 h-4 text-green-500 mt-0.5" />}
                            {entry.type === "feedback" && <Star className="w-4 h-4 text-yellow-500 mt-0.5" />}
                            {entry.type === "document_save" && <Save className="w-4 h-4 text-purple-500 mt-0.5" />}
                            {entry.type === "system" && <User className="w-4 h-4 text-gray-500 mt-0.5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-900">{entry.action}</p>
                            <p className="text-xs text-gray-600 truncate">{entry.details}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {new Date(entry.timestamp).toLocaleTimeString()}
                              </span>
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{entry.user}</span>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resize Handle */}
        {!isLeftPanelExpanded && (
          <div
            ref={resizeRef}
            className="w-1 bg-gray-200 hover:bg-gray-300 cursor-col-resize flex items-center justify-center group transition-colors"
            onMouseDown={handleMouseDown}
          >
            <GripVertical className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
          </div>
        )}

        {/* Right Panel - Document Preview */}
        <div
          className={`${isLeftPanelExpanded ? "hidden" : "flex-1"} overflow-y-auto bg-white`}
          style={{ width: isLeftPanelExpanded ? "0%" : `${100 - leftPanelWidth}%` }}
        >
          <div className="p-6 space-y-6">
            {/* Document Header */}
            <Card>
              <CardHeader className="text-center border-b">
                <CardTitle className="text-2xl font-bold text-gray-900">JOB SAFETY ANALYSIS (JSA)</CardTitle>
                <p className="text-gray-600 mt-2">Risk Assessment and Hazard Identification</p>
                <div className="flex justify-center space-x-8 text-sm text-gray-600 mt-4">
                  <div>
                    <span className="font-medium">Document Type:</span> JSA
                  </div>
                  <div>
                    <span className="font-medium">Version:</span> 1.0
                  </div>
                  <div>
                    <span className="font-medium">Date:</span> {new Date().toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Document Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Document Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Status</span>
                    <span>
                      {Object.keys(documentContent).length}/{documentSections.filter((s) => s.required).length} required
                      sections
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(Object.keys(documentContent).length / documentSections.filter((s) => s.required).length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Sections */}
            <div className="space-y-4">
              {documentSections.map((section) => (
                <Card
                  key={section.id}
                  className={`transition-all duration-200 ${
                    selectedSection === section.id ? "ring-2 ring-blue-500 border-blue-300" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span className="flex items-center gap-2">
                        {section.title}
                        {section.required && <span className="text-red-500">*</span>}
                      </span>
                      <Badge
                        variant={getSectionStatus(section.id) === "completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {getSectionStatus(section.id) === "completed" ? "Completed" : "Empty"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {documentContent[section.id] ? (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-700 whitespace-pre-wrap max-h-40 overflow-y-auto">
                          {documentContent[section.id]}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 bg-transparent"
                          onClick={() => handleSectionSelect(section.id)}
                        >
                          Edit Section
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No content added yet</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 bg-transparent"
                          onClick={() => handleSectionSelect(section.id)}
                        >
                          Add Content
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Document Footer */}
            <Card>
              <CardHeader>
                <CardTitle>Document Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Document ID:</p>
                    <p className="text-gray-600">JSA-001</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Created:</p>
                    <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Status:</p>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}