"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Plus,
  Download,
  Save,
  FileText,
  Type,
  List,
  ImageIcon,
  Table,
  Heading,
  Trash2,
  Sparkles,
  Copy,
  Move,
  Calendar,
  User,
  Loader2,
  CheckCircle,
  Clock,
  MessageSquare,
  Send,
  UserCheck,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface Block {
  id: string
  type: "text" | "heading" | "list" | "image" | "table"
  content: string
  level?: number
  items?: string[]
  rows?: string[][]
  headers?: string[]
}

interface JSARow {
  id: string
  activity: string
  hazard: string
  severityBefore: string
  controlMeasures: string
  severityAfter: string
  actionParty: string
}

interface Approval {
  id: string
  approver: string
  role: string
  status: "pending" | "approved" | "rejected"
  comments?: string
  timestamp?: string
}

interface Collaborator {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "invited"
  lastActive?: string
}

export default function JobSafetyAnalysisPage() {
  const [newTableCols, setNewTableCols] = useState(3)
  const [newTableRows, setNewTableRows] = useState(3)
  const [projectRef, setProjectRef] = useState("")
  const [jobLocation, setJobLocation] = useState("")
  const [jsaNumber, setJsaNumber] = useState("")
  const [date, setDate] = useState("")
  const [engineer, setEngineer] = useState("")
  const [productionSupervisor, setProductionSupervisor] = useState("")
  const [qpProjectEngineer, setQpProjectEngineer] = useState("")
  const [assistantManager, setAssistantManager] = useState("")
  const [analyzingRowId, setAnalyzingRowId] = useState<string | null>(null)

  const [jsaRows, setJsaRows] = useState<JSARow[]>([
    {
      id: "1",
      activity: "",
      hazard: "",
      severityBefore: "",
      controlMeasures: "",
      severityAfter: "",
      actionParty: "",
    },
  ])

  const [blocks, setBlocks] = useState<Block[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showAIDialog, setShowAIDialog] = useState(false)
  const [documentTitle, setDocumentTitle] = useState("Job Safety Analysis")

  // Document Management States
  const [approvals, setApprovals] = useState<Approval[]>([
    {
      id: "1",
      approver: "Sarah Johnson",
      role: "Safety Manager",
      status: "pending",
    },
    {
      id: "2",
      approver: "Michael Davis",
      role: "Department Head",
      status: "pending",
    },
  ])

  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: "1",
      name: "Emily Chen",
      email: "emily.chen@company.com",
      role: "Safety Officer",
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "David Rodriguez",
      email: "david.rodriguez@company.com",
      role: "Engineer",
      status: "active",
      lastActive: "1 day ago",
    },
  ])

  const [reviewComments, setReviewComments] = useState("")
  const [reviewerEmail, setReviewerEmail] = useState("")

  const contentRef = useRef<HTMLDivElement>(null)

  const analyzeActivityRow = async (row: JSARow) => {
    if (!row.activity.trim()) return

    setAnalyzingRowId(row.id)
    try {
      // Simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock AI analysis results
      const mockAnalysis = {
        hazard: "Potential slip/fall hazard, equipment malfunction risk, exposure to chemicals",
        severityBefore: "high",
        controlMeasures:
          "Use proper PPE, follow safety protocols, ensure equipment inspection, maintain clear walkways",
        severityAfter: "low",
        actionParty: "Safety Officer, Operations Team",
      }

      // Update the row with AI analysis
      updateJSARow(row.id, "hazard", mockAnalysis.hazard)
      updateJSARow(row.id, "severityBefore", mockAnalysis.severityBefore)
      updateJSARow(row.id, "controlMeasures", mockAnalysis.controlMeasures)
      updateJSARow(row.id, "severityAfter", mockAnalysis.severityAfter)
      updateJSARow(row.id, "actionParty", mockAnalysis.actionParty)
    } catch (error) {
      console.error("Error analyzing activity:", error)
    } finally {
      setAnalyzingRowId(null)
    }
  }

  const addJSARow = () => {
    const newRow: JSARow = {
      id: Date.now().toString(),
      activity: "",
      hazard: "",
      severityBefore: "",
      controlMeasures: "",
      severityAfter: "",
      actionParty: "",
    }
    setJsaRows([...jsaRows, newRow])
  }

  const updateJSARow = (id: string, field: keyof JSARow, value: string) => {
    setJsaRows(jsaRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  const removeJSARow = (id: string) => {
    if (jsaRows.length > 1) {
      setJsaRows(jsaRows.filter((row) => row.id !== id))
    }
  }

  const addBlock = (type: Block["type"]) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: "",
      level: type === "heading" ? 1 : undefined,
      items: type === "list" ? [""] : undefined,
      rows:
        type === "table"
          ? [
              ["", ""],
              ["", ""],
            ]
          : undefined,
      headers: type === "table" ? ["Column 1", "Column 2"] : undefined,
    }
    setBlocks([...blocks, newBlock])
  }

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, ...updates } : block)))
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id))
    if (selectedBlockId === id) {
      setSelectedBlockId(null)
    }
  }

  const duplicateBlock = (id: string) => {
    const blockToDuplicate = blocks.find((block) => block.id === id)
    if (blockToDuplicate) {
      const duplicatedBlock = {
        ...blockToDuplicate,
        id: Date.now().toString(),
      }
      const blockIndex = blocks.findIndex((block) => block.id === id)
      const newBlocks = [...blocks]
      newBlocks.splice(blockIndex + 1, 0, duplicatedBlock)
      setBlocks(newBlocks)
    }
  }

  const moveBlock = (id: string, direction: "up" | "down") => {
    const blockIndex = blocks.findIndex((block) => block.id === id)
    if ((direction === "up" && blockIndex > 0) || (direction === "down" && blockIndex < blocks.length - 1)) {
      const newBlocks = [...blocks]
      const targetIndex = direction === "up" ? blockIndex - 1 : blockIndex + 1
      ;[newBlocks[blockIndex], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[blockIndex]]
      setBlocks(newBlocks)
    }
  }

  const generateAIContent = async () => {
    if (!aiPrompt.trim()) return

    setIsGenerating(true)
    try {
      // Simulate AI generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockContent = `This is AI-generated content based on your prompt: "${aiPrompt}". 

**Key Safety Considerations:**
- Proper personal protective equipment (PPE) must be worn at all times
- Follow established safety protocols and procedures
- Ensure proper training before beginning work
- Maintain clear communication with team members

*Important Note:* Always conduct a thorough risk assessment before starting any work activity.`

      const formattedContent = formatAIContent(mockContent)

      if (selectedBlockId) {
        updateBlock(selectedBlockId, { content: formattedContent })
      } else {
        const newBlock: Block = {
          id: Date.now().toString(),
          type: "text",
          content: formattedContent,
        }
        setBlocks([...blocks, newBlock])
      }

      setAiPrompt("")
      setShowAIDialog(false)
    } catch (error) {
      console.error("Error generating content:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const formatAIContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^\* (.*$)/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const documentData = {
        title: documentTitle,
        projectRef,
        jobLocation,
        jsaNumber,
        date,
        engineer,
        productionSupervisor,
        qpProjectEngineer,
        assistantManager,
        jsaRows,
        blocks,
        lastModified: new Date().toISOString(),
      }

      localStorage.setItem("jsa-document", JSON.stringify(documentData))
      console.log("Document saved successfully")
    } catch (error) {
      console.error("Error saving document:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const downloadPDF = async () => {
    setIsDownloading(true)
    try {
      // Hide UI controls temporarily
      const controls = document.querySelectorAll(".no-print")
      controls.forEach((control) => {
        ;(control as HTMLElement).style.display = "none"
      })

      // Simulate WeasyPrint PDF generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create a comprehensive document structure for PDF
      const pdfContent = {
        title: documentTitle,
        projectRef,
        jobLocation,
        jsaNumber,
        date,
        jsaRows,
        blocks,
        engineer,
        productionSupervisor,
        qpProjectEngineer,
        assistantManager,
        generatedAt: new Date().toISOString(),
      }

      // In a real implementation, this would send to WeasyPrint backend
      console.log("PDF Content for WeasyPrint:", pdfContent)

      // Simulate file download
      const blob = new Blob([JSON.stringify(pdfContent, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${documentTitle.replace(/\s+/g, "_")}_${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      // Restore UI controls
      controls.forEach((control) => {
        ;(control as HTMLElement).style.display = ""
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const sendForReview = () => {
    if (!reviewerEmail.trim()) return

    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      name: reviewerEmail.split("@")[0],
      email: reviewerEmail,
      role: "Reviewer",
      status: "invited",
    }

    setCollaborators([...collaborators, newCollaborator])
    setReviewerEmail("")
    setReviewComments("")
  }

  const updateApprovalStatus = (approvalId: string, status: "approved" | "rejected", comments?: string) => {
    setApprovals(
      approvals.map((approval) =>
        approval.id === approvalId
          ? {
              ...approval,
              status,
              comments,
              timestamp: new Date().toISOString(),
            }
          : approval,
      ),
    )
  }

  const renderBlock = (block: Block) => {
    const isSelected = selectedBlockId === block.id

    switch (block.type) {
      case "text":
        return (
          <div
            key={block.id}
            className={`relative group p-4 border-2 rounded-lg transition-all ${
              isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedBlockId(block.id)}
          >
            <Textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Enter text content..."
              className="min-h-[100px] border-none p-0 resize-none focus:ring-0"
            />
            <BlockControls
              blockId={block.id}
              onDelete={() => deleteBlock(block.id)}
              onDuplicate={() => duplicateBlock(block.id)}
              onMoveUp={() => moveBlock(block.id, "up")}
              onMoveDown={() => moveBlock(block.id, "down")}
            />
          </div>
        )

      case "heading":
        return (
          <div
            key={block.id}
            className={`relative group p-4 border-2 rounded-lg transition-all ${
              isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedBlockId(block.id)}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Select
                value={block.level?.toString()}
                onValueChange={(value) => updateBlock(block.id, { level: Number.parseInt(value) })}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">H1</SelectItem>
                  <SelectItem value="2">H2</SelectItem>
                  <SelectItem value="3">H3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Enter heading text..."
              className={`border-none p-0 font-bold ${
                block.level === 1 ? "text-2xl" : block.level === 2 ? "text-xl" : "text-lg"
              }`}
            />
            <BlockControls
              blockId={block.id}
              onDelete={() => deleteBlock(block.id)}
              onDuplicate={() => duplicateBlock(block.id)}
              onMoveUp={() => moveBlock(block.id, "up")}
              onMoveDown={() => moveBlock(block.id, "down")}
            />
          </div>
        )

      case "list":
        return (
          <div
            key={block.id}
            className={`relative group p-4 border-2 rounded-lg transition-all ${
              isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedBlockId(block.id)}
          >
            <div className="space-y-2">
              {block.items?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-gray-400">•</span>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const newItems = [...(block.items || [])]
                      newItems[index] = e.target.value
                      updateBlock(block.id, { items: newItems })
                    }}
                    placeholder="List item..."
                    className="border-none p-0"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      const newItems = block.items?.filter((_, i) => i !== index) || []
                      updateBlock(block.id, { items: newItems })
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  updateBlock(block.id, { items: [...(block.items || []), ""] })
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add item
              </Button>
            </div>
            <BlockControls
              blockId={block.id}
              onDelete={() => deleteBlock(block.id)}
              onDuplicate={() => duplicateBlock(block.id)}
              onMoveUp={() => moveBlock(block.id, "up")}
              onMoveDown={() => moveBlock(block.id, "down")}
            />
          </div>
        )

      case "table":
        return (
          <div
            key={block.id}
            className={`relative group p-4 border-2 rounded-lg transition-all ${
              isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedBlockId(block.id)}
          >
            <div className="space-y-4">
              {/* Table Controls */}
              <div className="flex items-center space-x-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    const newHeaders = [...(block.headers || []), `Column ${(block.headers?.length || 0) + 1}`]
                    const newRows = (block.rows || []).map((row) => [...row, ""])
                    updateBlock(block.id, { headers: newHeaders, rows: newRows })
                  }}
                  className="text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Column
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    const newRow = new Array(block.headers?.length || 2).fill("")
                    updateBlock(block.id, { rows: [...(block.rows || []), newRow] })
                  }}
                  className="text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Row
                </Button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      {block.headers?.map((header, headerIndex) => (
                        <th key={headerIndex} className="border border-gray-300 px-2 py-2">
                          <Input
                            value={header}
                            onChange={(e) => {
                              const newHeaders = [...(block.headers || [])]
                              newHeaders[headerIndex] = e.target.value
                              updateBlock(block.id, { headers: newHeaders })
                            }}
                            className="border-none p-0 font-bold text-center text-sm"
                            placeholder={`Column ${headerIndex + 1}`}
                          />
                        </th>
                      ))}
                      <th className="border border-gray-300 px-2 py-2 w-16 no-print">
                        <span className="text-xs text-gray-500">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows?.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border border-gray-300 px-2 py-2">
                            <Textarea
                              value={cell}
                              onChange={(e) => {
                                const newRows = [...(block.rows || [])]
                                newRows[rowIndex][cellIndex] = e.target.value
                                updateBlock(block.id, { rows: newRows })
                              }}
                              className="min-h-[40px] w-full border-none p-0 resize-none focus:ring-0 text-sm"
                              placeholder=""
                            />
                          </td>
                        ))}
                        <td className="border border-gray-300 px-2 py-2 text-center no-print">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              const newRows = block.rows?.filter((_, i) => i !== rowIndex) || []
                              updateBlock(block.id, { rows: newRows })
                            }}
                            className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                            disabled={(block.rows?.length || 0) <= 1}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <BlockControls
              blockId={block.id}
              onDelete={() => deleteBlock(block.id)}
              onDuplicate={() => duplicateBlock(block.id)}
              onMoveUp={() => moveBlock(block.id, "up")}
              onMoveDown={() => moveBlock(block.id, "down")}
            />
          </div>
        )

      default:
        return null
    }
  }

  const BlockControls = ({ blockId, onDelete, onDuplicate, onMoveUp, onMoveDown }) => (
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 no-print">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation()
          onMoveUp()
        }}
      >
        <Move className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation()
          onDuplicate()
        }}
      >
        <Copy className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 no-print">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/department/ehs">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to EHS
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Job Safety Analysis</h1>
                <p className="text-gray-600">Create and manage job safety analysis documents</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button onClick={downloadPDF} disabled={isDownloading}>
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                {isDownloading ? "Generating..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-4">
            <div ref={contentRef} className="space-y-6">
              {/* JSA Form Header */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                      <div>
                        <Label htmlFor="projectRef" className="text-sm font-medium text-gray-700">
                          Project Ref./Job Title/Work Order:
                        </Label>
                        <Input
                          id="projectRef"
                          value={projectRef}
                          onChange={(e) => setProjectRef(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobLocation" className="text-sm font-medium text-gray-700">
                          Job Location:
                        </Label>
                        <Input
                          id="jobLocation"
                          value={jobLocation}
                          onChange={(e) => setJobLocation(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jsaNumber" className="text-sm font-medium text-gray-700">
                          JSA No.:
                        </Label>
                        <Input
                          id="jsaNumber"
                          value={jsaNumber}
                          onChange={(e) => setJsaNumber(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                          Date:
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* JSA Table */}
                  <div className="w-full">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 w-12">
                            Sl. No.
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 min-w-[200px]">
                            Activity (Job Steps)
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 min-w-[200px]">
                            Potential Hazard
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 w-32">
                            Severity Before
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 min-w-[250px]">
                            Control/Mitigation Measures
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 w-32">
                            Severity After
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-left text-xs font-medium text-gray-700 min-w-[150px]">
                            Action Party
                          </th>
                          <th className="border border-gray-300 px-3 py-3 text-center text-xs font-medium text-gray-700 w-24 no-print">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {jsaRows.map((row, index) => (
                          <tr key={row.id} className="min-h-[80px]">
                            <td className="border border-gray-300 px-3 py-3 text-center text-sm align-top">
                              {index + 1}
                            </td>
                            <td className="border border-gray-300 px-3 py-3 align-top">
                              <Textarea
                                value={row.activity}
                                onChange={(e) => updateJSARow(row.id, "activity", e.target.value)}
                                className="min-h-[60px] w-full border-none p-0 resize-none focus:ring-0 text-xs leading-tight"
                                placeholder="Describe the job step or activity..."
                              />
                            </td>
                            <td className="border border-gray-300 px-3 py-3 align-top">
                              <Textarea
                                value={row.hazard}
                                onChange={(e) => updateJSARow(row.id, "hazard", e.target.value)}
                                className="min-h-[60px] w-full border-none p-0 resize-none focus:ring-0 text-xs leading-tight"
                                placeholder="Identify potential hazards..."
                              />
                            </td>
                            <td className="border border-gray-300 px-3 py-3 align-top">
                              <Select
                                value={row.severityBefore}
                                onValueChange={(value) => updateJSARow(row.id, "severityBefore", value)}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="border border-gray-300 px-3 py-3 align-top">
                              <Textarea
                                value={row.controlMeasures}
                                onChange={(e) => updateJSARow(row.id, "controlMeasures", e.target.value)}
                                className="min-h-[60px] w-full border-none p-0 resize-none focus:ring-0 text-xs leading-tight"
                                placeholder="Describe control measures..."
                              />
                            </td>
                            <td className="border border-gray-300 px-3 py-3 align-top">
                              <Select
                                value={row.severityAfter}
                                onValueChange={(value) => updateJSARow(row.id, "severityAfter", value)}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="border border-gray-300 px-3 py-3 align-top">
                              <Input
                                value={row.actionParty}
                                onChange={(e) => updateJSARow(row.id, "actionParty", e.target.value)}
                                className="border-none p-0 focus:ring-0 text-xs h-8"
                                placeholder="Responsible party..."
                              />
                            </td>
                            <td className="border border-gray-300 px-3 py-3 text-center align-top no-print">
                              <div className="flex flex-col space-y-1">
                                {jsaRows.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeJSARow(row.id)}
                                    className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => analyzeActivityRow(row)}
                                  className="h-6 text-xs px-1"
                                  disabled={analyzingRowId === row.id || !row.activity.trim()}
                                >
                                  {analyzingRowId === row.id ? <Loader2 className="w-3 h-3 animate-spin" /> : "AI"}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex justify-center no-print">
                    <Button onClick={addJSARow} className="bg-green-600 hover:bg-green-700 text-white">
                      Add New Row
                    </Button>
                  </div>

                  {/* Bottom Section */}
                  <div className="mt-8 grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="engineer" className="text-sm font-medium text-gray-700">
                        Engineer (Panorama):
                      </Label>
                      <Input
                        id="engineer"
                        value={engineer}
                        onChange={(e) => setEngineer(e.target.value)}
                        className="mt-1"
                        placeholder="Engineer name..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="qpProjectEngineer" className="text-sm font-medium text-gray-700">
                        QP Project Engineer:
                      </Label>
                      <Input
                        id="qpProjectEngineer"
                        value={qpProjectEngineer}
                        onChange={(e) => setQpProjectEngineer(e.target.value)}
                        className="mt-1"
                        placeholder="QP Project Engineer name..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="productionSupervisor" className="text-sm font-medium text-gray-700">
                        Production Supervisor:
                      </Label>
                      <Input
                        id="productionSupervisor"
                        value={productionSupervisor}
                        onChange={(e) => setProductionSupervisor(e.target.value)}
                        className="mt-1"
                        placeholder="Production Supervisor name..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="assistantManager" className="text-sm font-medium text-gray-700">
                        Asst. Manager (if Required):
                      </Label>
                      <Input
                        id="assistantManager"
                        value={assistantManager}
                        onChange={(e) => setAssistantManager(e.target.value)}
                        className="mt-1"
                        placeholder="Assistant Manager name..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Management Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Document Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="approvals">Approvals</TabsTrigger>
                      <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
                      <TabsTrigger value="review">Send for Review</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-4 mt-6">
                      {blocks.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium">No content blocks yet</p>
                          <p className="text-sm mt-2">Add blocks to build your document content</p>
                        </div>
                      ) : (
                        <div className="space-y-4">{blocks.map((block) => renderBlock(block))}</div>
                      )}
                    </TabsContent>

                    <TabsContent value="approvals" className="space-y-4 mt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Document Approvals</h3>
                          <Badge variant="outline" className="text-xs">
                            {approvals.filter((a) => a.status === "approved").length} of {approvals.length} approved
                          </Badge>
                        </div>
                        {approvals.map((approval) => (
                          <div key={approval.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-medium text-gray-900">{approval.approver}</h4>
                                <p className="text-sm text-gray-600">{approval.role}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {approval.status === "pending" && (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => updateApprovalStatus(approval.id, "approved")}
                                      className="bg-green-600 hover:bg-green-700 h-7 text-xs"
                                    >
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateApprovalStatus(approval.id, "rejected")}
                                      className="text-red-600 hover:text-red-700 h-7 text-xs"
                                    >
                                      <AlertCircle className="w-3 h-3 mr-1" />
                                      Reject
                                    </Button>
                                  </>
                                )}
                                {approval.status === "approved" && (
                                  <Badge className="bg-green-100 text-green-800">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Approved
                                  </Badge>
                                )}
                                {approval.status === "rejected" && (
                                  <Badge className="bg-red-100 text-red-800">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Rejected
                                  </Badge>
                                )}
                                {approval.status === "pending" && (
                                  <Badge className="bg-yellow-100 text-yellow-800">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {approval.comments && (
                              <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                                <strong>Comments:</strong> {approval.comments}
                              </div>
                            )}
                            {approval.timestamp && (
                              <p className="text-xs text-gray-500 mt-2">
                                {approval.status === "approved" ? "Approved" : "Rejected"} on{" "}
                                {new Date(approval.timestamp).toLocaleString()}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="collaboration" className="space-y-4 mt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Collaborators</h3>
                          <Badge variant="outline" className="text-xs">
                            {collaborators.filter((c) => c.status === "active").length} active
                          </Badge>
                        </div>
                        {collaborators.map((collaborator) => (
                          <div key={collaborator.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{collaborator.name}</h4>
                                  <p className="text-sm text-gray-600">{collaborator.email}</p>
                                  <p className="text-xs text-gray-500">{collaborator.role}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {collaborator.status === "active" && (
                                  <Badge className="bg-green-100 text-green-800">
                                    <UserCheck className="w-3 h-3 mr-1" />
                                    Active
                                  </Badge>
                                )}
                                {collaborator.status === "invited" && (
                                  <Badge className="bg-yellow-100 text-yellow-800">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Invited
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {collaborator.lastActive && (
                              <p className="text-xs text-gray-500 mt-2">Last active: {collaborator.lastActive}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="review" className="space-y-4 mt-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Send Document for Review</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="reviewerEmail" className="text-sm font-medium text-gray-700">
                              Reviewer Email
                            </Label>
                            <Input
                              id="reviewerEmail"
                              type="email"
                              value={reviewerEmail}
                              onChange={(e) => setReviewerEmail(e.target.value)}
                              placeholder="Enter reviewer's email address..."
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="reviewComments" className="text-sm font-medium text-gray-700">
                              Review Instructions (Optional)
                            </Label>
                            <Textarea
                              id="reviewComments"
                              value={reviewComments}
                              onChange={(e) => setReviewComments(e.target.value)}
                              placeholder="Add any specific instructions for the reviewer..."
                              className="mt-1"
                              rows={3}
                            />
                          </div>
                          <Button
                            onClick={sendForReview}
                            disabled={!reviewerEmail.trim()}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send for Review
                          </Button>
                        </div>
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-900">Review Process</h4>
                              <p className="text-sm text-blue-700 mt-1">
                                The reviewer will receive an email with a link to view and comment on this document.
                                They can provide feedback and suggestions before final approval.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 no-print">
            {/* Document Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="documentTitle" className="text-sm font-medium text-gray-700">
                    Document Title
                  </Label>
                  <Input
                    id="documentTitle"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Author: Current User</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Content Blocks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addBlock("text")}
                >
                  <Type className="w-4 h-4 mr-2" />
                  Text Block
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addBlock("heading")}
                >
                  <Heading className="w-4 h-4 mr-2" />
                  Heading
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addBlock("list")}
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addBlock("table")}
                >
                  <Table className="w-4 h-4 mr-2" />
                  Table
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => addBlock("image")}
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image
                </Button>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>AI Content Generation</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="aiPrompt">What would you like to generate?</Label>
                        <Textarea
                          id="aiPrompt"
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder="e.g., Safety procedures for chemical handling..."
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                      {selectedBlockId && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">Content will be added to the selected block</p>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <Button
                          onClick={generateAIContent}
                          disabled={isGenerating || !aiPrompt.trim()}
                          className="flex-1"
                        >
                          {isGenerating ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Sparkles className="w-4 h-4 mr-2" />
                          )}
                          {isGenerating ? "Generating..." : "Generate"}
                        </Button>
                        <Button variant="outline" onClick={() => setShowAIDialog(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <p className="text-xs text-gray-600 mt-2">
                  Select a block first to add AI content to it, or generate new content blocks.
                </p>
              </CardContent>
            </Card>

            {/* Custom Table Creator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Table className="w-5 h-5 text-green-600" />
                  Table Creator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Table className="w-4 h-4 mr-2" />
                      Create Custom Table
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create Custom Table</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Number of Columns</Label>
                        <Select defaultValue="3" onValueChange={(value) => setNewTableCols(Number.parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 Columns</SelectItem>
                            <SelectItem value="3">3 Columns</SelectItem>
                            <SelectItem value="4">4 Columns</SelectItem>
                            <SelectItem value="5">5 Columns</SelectItem>
                            <SelectItem value="6">6 Columns</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Number of Rows</Label>
                        <Select defaultValue="3" onValueChange={(value) => setNewTableRows(Number.parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 Rows</SelectItem>
                            <SelectItem value="3">3 Rows</SelectItem>
                            <SelectItem value="4">4 Rows</SelectItem>
                            <SelectItem value="5">5 Rows</SelectItem>
                            <SelectItem value="10">10 Rows</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={() => {
                          const headers = Array.from({ length: newTableCols }, (_, i) => `Column ${i + 1}`)
                          const rows = Array.from({ length: newTableRows }, () => Array(newTableCols).fill(""))
                          const newBlock: Block = {
                            id: Date.now().toString(),
                            type: "table",
                            content: "",
                            headers,
                            rows,
                          }
                          setBlocks([...blocks, newBlock])
                        }}
                        className="w-full"
                      >
                        Create Table
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Content Blocks</span>
                  <Badge variant="secondary">{blocks.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">JSA Rows</span>
                  <Badge variant="secondary">{jsaRows.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Word Count</span>
                  <Badge variant="secondary">
                    {blocks.reduce((count, block) => count + (block.content?.split(" ").length || 0), 0)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Approvals</span>
                  <Badge variant="secondary">
                    {approvals.filter((a) => a.status === "approved").length}/{approvals.length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
