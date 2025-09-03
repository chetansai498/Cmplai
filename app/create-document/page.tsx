"use client"

import type React from "react"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Code,
  Edit3,
  Eye,
  GripVertical,
  Hash,
  Heading1,
  Heading2,
  ImageIcon,
  LinkIcon,
  List,
  ListOrdered,
  MessageCircle,
  MessageSquare,
  Mic,
  Minus,
  PackageCheck as PageBreak,
  Paperclip,
  Plus,
  Save,
  Send,
  Settings,
  Share,
  Sparkles,
  Star,
  Table,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Type,
  User,
  UserPlus,
  Bot,
  X,
  Calculator,
  Users,
  Download,
} from "lucide-react"

import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

// Add this style object at the top of the component
const formattedTextStyles = {
  "& h3": {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "0.5rem",
    marginTop: "1rem",
  },
  "& strong": {
    fontWeight: "600",
    color: "#1f2937",
  },
  "& p": {
    marginBottom: "0.5rem",
  },
}

const blockTypes = [
  { id: "text", label: "Text", icon: Type, description: "Just start writing with plain text" },
  { id: "heading1", label: "Heading 1", icon: Heading1, description: "Big section heading" },
  { id: "heading2", label: "Heading 2", icon: Heading2, description: "Medium section heading" },
  { id: "section", label: "Section", icon: Hash, description: "Create a new section with subsections" },
  { id: "bullet", label: "Bulleted list", icon: List, description: "Create a simple bulleted list" },
  { id: "numbered", label: "Numbered list", icon: ListOrdered, description: "Create a list with numbering" },
  { id: "table", label: "Table", icon: Table, description: "Add a table" },
  { id: "divider", label: "Divider", icon: Minus, description: "Visually divide blocks" },
  { id: "code", label: "Code", icon: Code, description: "Capture a code snippet" },
  { id: "link", label: "Link to page", icon: LinkIcon, description: "Link to another page" },
  { id: "chart", label: "Chart", icon: BarChart3, description: "Add a chart or graph" },
  { id: "equation", label: "Equation", icon: Calculator, description: "Add a mathematical equation" },
  { id: "date", label: "Date", icon: Calendar, description: "Add a date picker" },
  { id: "image", label: "Image", icon: ImageIcon, description: "Upload or insert an image" },
  { id: "pagebreak", label: "Page Break", icon: PageBreak, description: "Insert a page break for printing" },
]

const documentTypes = [
  "Job Safety Analysis",
  "Standard Operating Procedure",
  "Deviation Report",
  "Work Order",
  "Environmental Impact Assessment",
  "Chemical Hygiene Plan",
  "PPE Program",
  "Safety Inspection Checklist",
  "Incident Report Form",
  "Risk Assessment Matrix",
  "Training Record",
  "Emergency Response Plan",
  "Manufacturing Data Report",
  "Preventive Maintenance",
  "Quality Control Procedure",
  "Batch Record",
  "Equipment Log",
  "Supplier Qualification",
  "Production Schedule",
  "Inventory Management",
]

const departments = [
  "EHS",
  "Manufacturing",
  "Quality Assurance",
  "Quality Control",
  "Regulatory Affairs",
  "Supply Chain",
  "Clinical Operations",
  "Sales & Marketing",
  "IT",
  "HR",
  "Finance",
]

const predefinedSections = [
  "Purpose",
  "Scope",
  "Responsibility",
  "Procedure",
  "Materials Required",
  "Safety Precautions",
  "Step-by-Step Instructions",
  "Quality Control",
  "Documentation",
  "Training Requirements",
  "References",
  "Conclusion",
  "Appendix",
]

const teamMembers = [
  { id: 1, name: "John Smith", role: "Department Head", department: "EHS", avatar: "/diverse-woman-portrait.png" },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Quality Manager",
    department: "Quality Assurance",
    avatar: "/thoughtful-man.png",
  },
  { id: 3, name: "Mike Davis", role: "Safety Officer", department: "EHS", avatar: "/diverse-woman-portrait.png" },
  { id: 4, name: "Emily Chen", role: "Manufacturing Lead", department: "Manufacturing", avatar: "/thoughtful-man.png" },
  {
    id: 5,
    name: "David Wilson",
    role: "Compliance Officer",
    department: "Regulatory Affairs",
    avatar: "/diverse-woman-portrait.png",
  },
  { id: 6, name: "Lisa Brown", role: "QC Analyst", department: "Quality Control", avatar: "/thoughtful-man.png" },
]

// Helper to auto-grow textareas to fit content
function autoGrow(el: HTMLTextAreaElement | null) {
  if (!el) return
  el.style.height = "auto"
  el.style.height = `${el.scrollHeight}px`
}

export default function CreateDocumentPage() {
  const [documentTitle, setDocumentTitle] = useState("Untitled Document")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isTitleManual, setIsTitleManual] = useState(false)

  const [blocks, setBlocks] = useState<any[]>([
    {
      id: 1,
      type: "text",
      content: "",
      placeholder: "Write, press 'space' for AI, '/' for commands...",
      sectionId: null,
      comments: [],
      page: 1,
    },
  ])

  const [sections, setSections] = useState<any[]>([])
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null)
  const [editingSectionTitle, setEditingSectionTitle] = useState("")
  const [selectedPredefinedSection, setSelectedPredefinedSection] = useState("")
  const [showBlockMenu, setShowBlockMenu] = useState(false)
  const [blockMenuPosition, setBlockMenuPosition] = useState({ x: 0, y: 0 })
  const [activeBlockId, setActiveBlockId] = useState<number | null>(null)

  const [focusedBlockId, setFocusedBlockId] = useState<number | null>(null)

  const [documentType, setDocumentType] = useState("")
  const [documentDepartment, setDocumentDepartment] = useState("")
  const [documentVersion, setDocumentVersion] = useState("1.0")
  const [preparedBy, setPreparedBy] = useState("")
  const [dateOfPreparation, setDateOfPreparation] = useState(new Date().toISOString().split("T")[0])
  const [showIndexPage, setShowIndexPage] = useState(false)

  // AI prompt state
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" })

  // Misc UI state
  const [isFavorite, setIsFavorite] = useState(false)
  const [showFavoriteTooltip, setShowFavoriteTooltip] = useState(false)
  const [showChatBot, setShowChatBot] = useState(false)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [chatInput, setChatInput] = useState("")
  const [showComments, setShowComments] = useState<Record<string, boolean>>({})
  const [newComment, setNewComment] = useState<Record<string, string>>({})
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})
  const [showTeamMemberPopup, setShowTeamMemberPopup] = useState(false)
  const [popupType, setPopupType] = useState<"reviewer" | "observer" | "">("")
  const [selectedMembers, setSelectedMembers] = useState<number[]>([])
  const [reviewers, setReviewers] = useState<any[]>([])
  const [observers, setObservers] = useState<any[]>([])
  const [approvals, setApprovals] = useState([
    { id: 1, name: "Department Head", status: "pending", user: "John Smith" },
    { id: 2, name: "Quality Manager", status: "approved", user: "Sarah Johnson" },
    { id: 3, name: "Safety Officer", status: "waiting", user: "Mike Davis" },
  ])

  const blockRefs = useRef<Record<string, HTMLTextAreaElement | HTMLInputElement | null>>({})
  const titleRef = useRef<HTMLInputElement | null>(null)

  const documentAreaRef = useRef<HTMLDivElement | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Initialize preparedBy, department, and chat intro
  useEffect(() => {
    const userName = localStorage.getItem("userName") || "Demo User"
    const userDepartment = localStorage.getItem("userDepartment") || ""
    setPreparedBy(userName)

    if (userDepartment && userDepartment !== "executive") {
      const deptName = departments.find((d) => d.toLowerCase().replace(/\s+/g, "-") === userDepartment)
      if (deptName) setDocumentDepartment(deptName)
    }

    setChatMessages([
      {
        id: 1,
        type: "bot",
        message:
          "Hi! I'm CMPLAI Bot. I can help you with document creation, compliance questions, and more. How can I assist you today?",
        timestamp: new Date().toISOString(),
      },
    ])
  }, [])

  // Automatically update the title based on document type/department unless the user manually edited it
  useEffect(() => {
    if (!documentType) return
    const baseName = documentDepartment ? `${documentDepartment} - ${documentType}` : documentType
    if (!isTitleManual && !isEditingTitle) {
      setDocumentTitle(baseName)
    }
  }, [documentType, documentDepartment, isTitleManual, isEditingTitle])

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true)
    setTimeout(() => {
      titleRef.current?.focus()
      titleRef.current?.select()
    }, 50)
  }

  const handleTitleSave = () => {
    setIsEditingTitle(false)
    setIsTitleManual(true)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleTitleSave()
    if (e.key === "Escape") setIsEditingTitle(false)
  }

  const addSection = (sectionTitle: string | null = null) => {
    const title = sectionTitle || `Section ${sections.length + 1}`
    const newSection = { id: Date.now(), title, collapsed: false }
    setSections((prev) => [...prev, newSection])

    if (!sectionTitle) {
      setEditingSectionId(newSection.id)
      setEditingSectionTitle(title)
    }
  }

  const addPredefinedSection = () => {
    if (!selectedPredefinedSection) return
    addSection(selectedPredefinedSection)
    setSelectedPredefinedSection("")
  }

  const startEditingSection = (sectionId: number, currentTitle: string) => {
    setEditingSectionId(sectionId)
    setEditingSectionTitle(currentTitle)
  }

  const saveSection = () => {
    setSections((prev) => prev.map((s) => (s.id === editingSectionId ? { ...s, title: editingSectionTitle } : s)))
    setEditingSectionId(null)
    setEditingSectionTitle("")
  }

  const cancelEditingSection = () => {
    setEditingSectionId(null)
    setEditingSectionTitle("")
  }

  const deleteSection = (sectionId: number) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId))
    setBlocks((prev) => prev.filter((b) => b.sectionId !== sectionId))
  }

  const addBlock = (afterId: number, type = "text", sectionId: number | null = null) => {
    const afterBlock = blocks.find((b) => b.id === afterId)
    const newBlock = {
      id: Date.now(),
      type,
      content: "",
      placeholder: getPlaceholder(type),
      sectionId,
      comments: [],
      page: afterBlock ? afterBlock.page : 1,
    }

    const index = blocks.findIndex((b) => b.id === afterId)
    const newBlocks = [...blocks]
    newBlocks.splice(index + 1, 0, newBlock)
    setBlocks(newBlocks)

    setShowBlockMenu(false)
    setTimeout(() => {
      const el = blockRefs.current[newBlock.id]
      if (el) {
        ;(el as HTMLElement).focus()
        if (el instanceof HTMLTextAreaElement) autoGrow(el)
      }
    }, 50)
  }

  const updateBlock = (id: number, content: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, content } : b)))
  }

  const deleteBlock = (id: number) => {
    if (blocks.length <= 1) return
    setBlocks((prev) => prev.filter((b) => b.id !== id))
  }

  const moveBlockUp = (id: number) => {
    const index = blocks.findIndex((b) => b.id === id)
    if (index <= 0) return
    const newBlocks = [...blocks]
    const [block] = newBlocks.splice(index, 1)
    newBlocks.splice(index - 1, 0, block)
    setBlocks(newBlocks)
  }

  const moveBlockDown = (id: number) => {
    const index = blocks.findIndex((b) => b.id === id)
    if (index === -1 || index >= blocks.length - 1) return
    const newBlocks = [...blocks]
    const [block] = newBlocks.splice(index, 1)
    newBlocks.splice(index + 1, 0, block)
    setBlocks(newBlocks)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>, blockId: number) => {
    if (e.key === "Enter" && !e.shiftKey && e.currentTarget.tagName === "TEXTAREA") {
      e.preventDefault()
      addBlock(blockId)
    } else if (e.key === "Backspace" && (e.currentTarget as HTMLTextAreaElement).value === "") {
      e.preventDefault()
      deleteBlock(blockId)
    } else if ((e.currentTarget as HTMLTextAreaElement).value === "/" && e.key !== "Backspace") {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      setBlockMenuPosition({ x: rect.left, y: rect.bottom })
      setActiveBlockId(blockId)
      setShowBlockMenu(true)
    }
  }

  const handleBlockFocus = (blockId: number) => {
    setFocusedBlockId(blockId)
  }

  const handleBlockBlur = () => {
    // keep selection context; do not clear focusedBlockId so the prompt label persists
  }

  const getPlaceholder = (type: string) => {
    const placeholders: Record<string, string> = {
      text: "Type '/' for commands",
      heading1: "Heading 1",
      heading2: "Heading 2",
      section: "Section Title",
      bullet: "List item",
      numbered: "List item",
      table: "Table content",
      divider: "",
      code: "Code snippet",
      link: "Link text",
      chart: "Chart title",
      equation: "Equation",
      date: "Select date",
      image: "Image description",
      pagebreak: "",
    }
    return placeholders[type] || "Type here..."
  }

  const addComment = (blockId: number) => {
    const comment = newComment[blockId]
    if (!comment) return

    const userName = localStorage.getItem("userName") || "Demo User"
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              comments: [
                ...b.comments,
                { id: Date.now(), author: userName, content: comment, timestamp: new Date().toISOString() },
              ],
            }
          : b,
      ),
    )
    setNewComment({ ...newComment, [blockId]: "" })
  }

  const toggleSection = (sectionId: number) => {
    setCollapsedSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const getBlocksInSection = (sectionId: number) => blocks.filter((b) => b.sectionId === sectionId)
  const getBlocksOutsideSections = () => blocks.filter((b) => !b.sectionId)

  const openTeamMemberPopup = (type: "reviewer" | "observer") => {
    setPopupType(type)
    setSelectedMembers([])
    setShowTeamMemberPopup(true)
  }

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers((prev) => (prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]))
  }

  const addSelectedMembers = () => {
    const members = teamMembers.filter((m) => selectedMembers.includes(m.id))
    if (popupType === "reviewer") {
      setReviewers((prev) => [...prev, ...members.filter((m) => !prev.find((r) => r.id === m.id))])
    } else if (popupType === "observer") {
      setObservers((prev) => [...prev, ...members.filter((m) => !prev.find((o) => o.id === m.id))])
    }
    setShowTeamMemberPopup(false)
    setSelectedMembers([])
  }

  const sendForReview = () => {
    const userName = localStorage.getItem("userName") || "Demo User"
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: userName,
      action: "Document Review Request",
      details: `Sent document "${documentTitle}" for review to ${reviewers.length} reviewers`,
      timestamp: new Date().toISOString(),
      type: "review",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))

    setApprovals((prev) => prev.map((a) => ({ ...a, status: a.status === "waiting" ? "pending" : a.status })))
  }

  // Paging
  const blocksPerPage = 25
  const totalPages = Math.max(1, Math.ceil(blocks.length / blocksPerPage))
  const getBlocksForPage = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * blocksPerPage
    const endIndex = startIndex + blocksPerPage
    return blocks.slice(startIndex, endIndex)
  }

  // Context: selected section ID and name based on focused block
  const selectedSectionId: number | null = useMemo(() => {
    if (!focusedBlockId) return null
    const focused = blocks.find((b) => b.id === focusedBlockId)
    return focused?.sectionId ?? null
  }, [focusedBlockId, blocks])

  const selectedSectionName = useMemo(() => {
    if (!selectedSectionId) return ""
    const section = sections.find((s) => s.id === selectedSectionId)
    return section?.title ?? ""
  }, [selectedSectionId, sections])

  const renderBlock = (block: any, index: number) => {
    const isTextInput = block.type === "heading1" || block.type === "heading2" || block.type === "link"
    const commonTextAreaProps = {
      ref: (el: HTMLTextAreaElement | null) => {
        blockRefs.current[block.id] = el
        if (el) autoGrow(el)
      },
      value: block.content,
      onInput: (e: any) => autoGrow(e.currentTarget),
      onChange: (e: any) => updateBlock(block.id, e.target.value),
      onKeyDown: (e: any) => handleKeyDown(e, block.id),
      onFocus: () => handleBlockFocus(block.id),
      onBlur: handleBlockBlur,
      placeholder: block.placeholder,
      className:
        "w-full border-none outline-none resize-none bg-transparent text-gray-900 placeholder-gray-400 text-justify",
    }

    const commonInputProps = {
      ref: (el: HTMLInputElement | null) => {
        blockRefs.current[block.id] = el
      },
      value: block.content,
      onChange: (e: any) => updateBlock(block.id, e.target.value),
      onKeyDown: (e: any) => handleKeyDown(e, block.id),
      onFocus: () => handleBlockFocus(block.id),
      onBlur: handleBlockBlur,
      placeholder: block.placeholder,
      className: "w-full border-none outline-none bg-transparent text-gray-900 placeholder-gray-400 text-justify",
    }

    const blockControls = (
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
          onClick={() => {
            const rect = (blockRefs.current[block.id] as HTMLElement)?.getBoundingClientRect()
            if (rect) {
              setBlockMenuPosition({ x: rect.left, y: rect.bottom })
              setActiveBlockId(block.id)
              setShowBlockMenu(true)
            }
          }}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 relative"
          onClick={() => setShowComments((prev) => ({ ...prev, [block.id]: !prev[block.id] }))}
        >
          <MessageCircle className="w-4 h-4" />
          {block.comments.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center">
              {block.comments.length}
            </span>
          )}
        </Button>
        <div className="relative">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
            <GripVertical className="w-4 h-4" />
          </Button>
          <div className="absolute left-full ml-1 hidden group-hover:flex items-center space-x-1 bg-white border border-gray-200 rounded shadow-sm p-1 z-10">
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 text-gray-400 hover:text-gray-600"
              onClick={() => moveBlockUp(block.id)}
            >
              ↑
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 text-gray-400 hover:text-gray-600"
              onClick={() => moveBlockDown(block.id)}
            >
              ↓
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 text-gray-400 hover:text-red-600"
              onClick={() => deleteBlock(block.id)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    )

    const commentsSection = showComments[block.id] && (
      <div className="ml-10 mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Comments & Suggestions</h4>
        {block.comments.length > 0 && (
          <div className="space-y-2 mb-3">
            {block.comments.map((comment: any) => (
              <div key={comment.id} className="bg-white p-2 rounded text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-700">{comment.author}</span>
                  <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-gray-600">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex space-x-2">
          <Input
            placeholder="Add a comment or suggestion..."
            value={newComment[block.id] || ""}
            onChange={(e) => setNewComment({ ...newComment, [block.id]: e.target.value })}
            className="flex-1 h-8 text-sm"
          />
          <Button
            size="sm"
            onClick={() => addComment(block.id)}
            disabled={!newComment[block.id]?.trim()}
            className="h-8 px-3 text-sm"
          >
            Add
          </Button>
        </div>
      </div>
    )

    let blockContent: JSX.Element
    switch (block.type) {
      case "heading1":
        blockContent = (
          <div className="group flex items-start space-x-2 py-2 page-break-inside-avoid">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <input
              {...commonInputProps}
              className="text-3xl font-bold flex-1 text-justify border-none outline-none bg-transparent"
            />
          </div>
        )
        break
      case "heading2":
        blockContent = (
          <div className="group flex items-start space-x-2 py-2 page-break-inside-avoid">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <input
              {...commonInputProps}
              className="text-2xl font-semibold flex-1 text-justify border-none outline-none bg-transparent"
            />
          </div>
        )
        break
      case "section":
        blockContent = (
          <div className="group flex items-start space-x-2 py-4 border-l-4 border-blue-500 pl-4 bg-blue-50/30 page-break-inside-avoid">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <div className="flex-1">
              <input
                {...commonInputProps}
                className="text-xl font-bold text-blue-900 mb-2 flex-1"
                placeholder="Section Title"
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => addBlock(block.id, "text", block.id)}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add content to this section
              </Button>
            </div>
          </div>
        )
        break
      case "bullet":
        blockContent = (
          <div className="group flex items-start space-x-2 py-1">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <div className="flex items-start space-x-2 flex-1">
              <span className="mt-2 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
              <Textarea
                {...commonTextAreaProps}
                rows={1}
                className="min-h-[24px] flex-1 text-justify border-none shadow-none"
              />
            </div>
          </div>
        )
        break
      case "numbered":
        blockContent = (
          <div className="group flex items-start space-x-2 py-1">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <div className="flex items-start space-x-2 flex-1">
              <span className="mt-1 text-gray-600 flex-shrink-0">{index + 1}.</span>
              <Textarea
                {...commonTextAreaProps}
                rows={1}
                className="min-h-[24px] flex-1 text-justify border-none shadow-none"
              />
            </div>
          </div>
        )
        break
      case "table":
        blockContent = (
          <div className="group flex items-start space-x-2 py-2 page-break-inside-avoid">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <div className="border border-gray-200 rounded flex-1">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="border-b border-r border-gray-200 p-2">
                      <input className="w-full border-none outline-none text-justify" placeholder="Header 1" />
                    </td>
                    <td className="border-b border-gray-200 p-2">
                      <input className="w-full border-none outline-none text-justify" placeholder="Header 2" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-gray-200 p-2">
                      <input className="w-full border-none outline-none text-justify" placeholder="Cell 1" />
                    </td>
                    <td className="p-2">
                      <input className="w-full border-none outline-none text-justify" placeholder="Cell 2" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
        break
      case "divider":
        blockContent = (
          <div className="group flex items-center space-x-2 py-4 page-break-avoid">
            <div className="flex-shrink-0 w-8 flex justify-end">{blockControls}</div>
            <hr className="border-gray-200 flex-1" />
          </div>
        )
        break
      case "code":
        blockContent = (
          <div className="group flex items-start space-x-2 py-2 page-break-inside-avoid">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <div className="bg-gray-50 rounded p-3 font-mono flex-1">
              <Textarea
                {...commonTextAreaProps}
                className="bg-transparent font-mono text-sm min-h-[60px] flex-1 border-none shadow-none"
                rows={3}
              />
            </div>
          </div>
        )
        break
      case "link":
        blockContent = (
          <div className="group flex items-start space-x-2 py-1">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <div className="flex items-center space-x-2 flex-1">
              <LinkIcon className="w-4 h-4 text-blue-500" />
              <input {...commonInputProps} className="text-blue-600 underline flex-1" />
            </div>
          </div>
        )
        break
      case "chart":
        blockContent = (
          <div className="group flex items-start space-x-2 py-2 page-break-inside-avoid">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex-1">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <input {...commonInputProps} placeholder="Chart title" className="text-center" />
            </div>
          </div>
        )
        break
      case "equation":
        blockContent = (
          <div className="group flex items-start space-x-2 py-1">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <div className="flex items-center space-x-2 flex-1">
              <Calculator className="w-4 h-4 text-purple-500" />
              <input {...commonInputProps} className="font-mono flex-1" />
            </div>
          </div>
        )
        break
      case "date":
        blockContent = (
          <div className="group flex items-start space-x-2 py-1">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <div className="flex items-center space-x-2 flex-1">
              <Calendar className="w-4 h-4 text-green-500" />
              <input {...(commonInputProps as any)} type="date" className="flex-1" />
            </div>
          </div>
        )
        break
      case "image":
        blockContent = (
          <div className="group flex items-start space-x-2 py-2 page-break-inside-avoid">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex-1">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <input
                {...commonInputProps}
                placeholder="Image description or click to upload"
                className="text-center mb-4"
              />
              <Button variant="outline" size="sm">
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </div>
          </div>
        )
        break
      case "pagebreak":
        blockContent = (
          <div className="group flex items-center space-x-2 py-4 page-break-before">
            <div className="flex-shrink-0 w-8 flex justify-end">{blockControls}</div>
            <div className="flex-1 border-t-2 border-dashed border-gray-400 text-center relative">
              <span className="bg-white px-2 text-xs text-gray-500 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Page Break
              </span>
            </div>
          </div>
        )
        break
      default:
        // text block (auto-grow) - handle formatted content
        blockContent = (
          <div className="group flex items-start space-x-2 py-1">
            <div className="flex-shrink-0 w-8 flex justify-end pt-2">{blockControls}</div>
            {block.isFormatted ? (
              <div
                className="flex-1 text-justify text-gray-900 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: block.content }}
                onClick={() => {
                  // Convert back to editable textarea when clicked
                  setBlocks((prev) =>
                    prev.map((b) =>
                      b.id === block.id
                        ? { ...b, isFormatted: false, content: block.content.replace(/<[^>]*>/g, "") }
                        : b,
                    ),
                  )
                  setTimeout(() => {
                    const el = blockRefs.current[block.id]
                    if (el instanceof HTMLTextAreaElement) {
                      autoGrow(el)
                      el.focus()
                    }
                  }, 50)
                }}
              />
            ) : (
              <Textarea
                {...commonTextAreaProps}
                rows={1}
                className="min-h-[24px] flex-1 text-justify border-none shadow-none"
              />
            )}
          </div>
        )
    }

    return (
      <div key={block.id}>
        {blockContent}
        {commentsSection}
      </div>
    )
  }

  const generateAIContent = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    setGeneratedContent("");
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get response");

      const content =
        typeof data.response === "string"
          ? data.response
          : JSON.stringify(data.response);

      setGeneratedContent(content);
      setShowFeedback(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An error occurred";
      setGeneratedContent(`Error: ${message}`);
      setShowFeedback(false);
    } finally {
      setIsGenerating(false);
    }
  };

  // Insert generated content as a single text block, at the end of the selected section (if any)
  const addGeneratedContent = () => {
    if (!generatedContent.trim()) return

    // Format the content before adding
    const formatContent = (text: string) => {
      return (
        text
          // Convert **text** to <strong>text</strong>
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          // Convert ## text to <h3>text</h3>
          .replace(/^## (.*$)/gim, "<h3>$1</h3>")
          // Convert single * to bullet points
          .replace(/^\* (.*$)/gim, "• $1")
      )
    }

    const formattedContent = formatContent(generatedContent)

    const newBlock = {
      id: Date.now(),
      type: "text",
      content: formattedContent,
      placeholder: "",
      sectionId: selectedSectionId ?? null,
      comments: [],
      page: 1,
      isFormatted: true, // Flag to indicate this content has HTML formatting
    }

    // Insert after the last block of the selected section, else append to end
    const newBlocks = [...blocks]
    if (selectedSectionId) {
      const lastIndexInSection = [...newBlocks]
        .map((b, i) => ({ b, i }))
        .filter(({ b }) => b.sectionId === selectedSectionId)
        .map(({ i }) => i)
        .pop()

      if (lastIndexInSection !== undefined) {
        newBlocks.splice(lastIndexInSection + 1, 0, newBlock)
      } else {
        // No blocks yet in this section → push to end
        newBlocks.push(newBlock)
      }
    } else {
      // No section selected → push to end (outside sections)
      newBlocks.push(newBlock)
    }

    setBlocks(newBlocks)
    setGeneratedContent("")
    setAiPrompt("")
    setShowFeedback(false)

    // Auto-focus and auto-size the newly added text block
    setTimeout(() => {
      const el = blockRefs.current[newBlock.id]
      if (el instanceof HTMLTextAreaElement) {
        autoGrow(el)
        el.focus()
      }
    }, 50)
  }

  const submitFeedback = () => {
    if (feedback.rating === 0) return
    const userName = localStorage.getItem("userName") || "Demo User"
    const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
    activityLog.push({
      id: Date.now(),
      user: userName,
      action: "AI Feedback",
      details: `Rated ${feedback.rating} stars: ${feedback.comment}`,
      timestamp: new Date().toISOString(),
      type: "feedback",
    })
    localStorage.setItem("activityLog", JSON.stringify(activityLog))
    setFeedback({ rating: 0, comment: "" })
    setShowFeedback(false)
  }

  const sendChatMessage = () => {
    if (!chatInput.trim()) return
    const userMessage = { id: Date.now(), type: "user", message: chatInput, timestamp: new Date().toISOString() }
    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        message: `I understand you're asking about "${chatInput}". Here are some suggestions:\n\n• Check our compliance guidelines\n• Review the latest safety protocols\n• Consider industry best practices\n\nWould you like me to help you create content for this topic?`,
        timestamp: new Date().toISOString(),
      }
      setChatMessages((prev) => [...prev, botResponse])
    }, 800)
  }

  const saveDocument = async () => {
    if (isSaving) return
    setIsSaving(true)

    try {
      const doc = {
        title: documentTitle,
        blocks,
        sections,
        type: documentType,
        department: documentDepartment,
        version: documentVersion,
        preparedBy,
        dateOfPreparation,
        showIndexPage,
        isFavorite,
        reviewers,
        observers,
        lastSaved: new Date().toISOString(),
      }

      localStorage.setItem("currentDocument", JSON.stringify(doc))

      const userName = localStorage.getItem("userName") || "Demo User"
      const activityLog = JSON.parse(localStorage.getItem("activityLog") || "[]")
      activityLog.push({
        id: Date.now(),
        user: userName,
        action: "Document Saved",
        details: `Saved document: ${documentTitle}`,
        timestamp: new Date().toISOString(),
        type: "save",
      })
      localStorage.setItem("activityLog", JSON.stringify(activityLog))

      // Simulate save delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {
      console.error("Save failed:", err)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDownloadPDF() {
    if (isDownloading) return
    setIsDownloading(true)
    try {
      const area = documentAreaRef.current
      if (!area) return

      const pageNodes = area.querySelectorAll('[data-a4-page="true"]') as NodeListOf<HTMLElement>
      if (pageNodes.length === 0) return

      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // PDF margins (in mm)
      const margin = 20
      const contentWidth = pageWidth - margin * 2
      const contentHeight = pageHeight - margin * 2

      let first = true
      for (const pageEl of Array.from(pageNodes)) {
        // Temporarily hide controls for PDF generation
        const controls = pageEl.querySelectorAll(".opacity-0")
        controls.forEach((el) => ((el as HTMLElement).style.display = "none"))

        const canvas = await html2canvas(pageEl, {
          scale: 2,
          backgroundColor: "#ffffff",
          useCORS: true,
          allowTaint: true,
          logging: false,
          width: pageEl.scrollWidth,
          height: pageEl.scrollHeight,
        })

        // Restore controls
        controls.forEach((el) => ((el as HTMLElement).style.display = ""))

        const imgData = canvas.toDataURL("image/png")

        // Calculate dimensions to fit within margins
        const imgWidth = contentWidth
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        if (!first) {
          pdf.addPage()
        }
        first = false

        // Add image with margins
        pdf.addImage(imgData, "PNG", margin, margin, imgWidth, Math.min(imgHeight, contentHeight))
      }

      const safeTitle = (documentTitle || "document").replace(/[\\/:*?"<>|]+/g, "_")
      pdf.save(`${safeTitle}.pdf`)
    } catch (err) {
      console.error("PDF generation failed:", err)
    } finally {
      setIsDownloading(false)
    }
  }

  const renderIndexPage = () => {
    if (!showIndexPage) return null
    const sectionsList = sections.map((section) => ({
      title: section.title,
      page: Math.floor(Math.random() * 10) + 1, // Mock
    }))

    return (
      <div className="mb-8 p-8 bg-white border border-gray-200 rounded-lg page-break-after">
        <h2 className="text-2xl font-bold text-center mb-8">Table of Contents</h2>
        <div className="space-y-2">
          {sectionsList.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-dotted border-gray-300">
              <span className="text-gray-900">{item.title}</span>
              <span className="text-gray-600">{item.page}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Image src="/logo.png" alt="CMPLAI Logo" width={100} height={32} className="object-contain" />
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="relative"
                onMouseEnter={() => setShowFavoriteTooltip(true)}
                onMouseLeave={() => setShowFavoriteTooltip(false)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFavorite((f) => !f)}
                  className={isFavorite ? "text-yellow-500" : "text-gray-400"}
                >
                  <Star className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
                {showFavoriteTooltip && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Add to your favourites
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800" />
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={saveDocument} size="sm" disabled={isSaving}>
                {isSaving ? (
                  <span className="inline-flex items-center">
                    <span className="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
              <Button onClick={handleDownloadPDF} size="sm" variant="outline" disabled={isDownloading}>
                {isDownloading ? (
                  <span className="inline-flex items-center">
                    <span className="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                    Preparing...
                  </span>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Document Management */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0 h-screen sticky top-16 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Document Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Document Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Document Type</label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Department</label>
                  <Select value={documentDepartment} onValueChange={setDocumentDepartment}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Version</label>
                    <Input
                      value={documentVersion}
                      onChange={(e) => setDocumentVersion(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Date</label>
                    <Input
                      type="date"
                      value={dateOfPreparation}
                      onChange={(e) => setDateOfPreparation(e.target.value)}
                      className="h-8"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">Prepared By</label>
                  <Input value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} className="h-8" />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showIndexPage"
                    checked={showIndexPage}
                    onChange={(e) => setShowIndexPage(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="showIndexPage" className="text-xs font-medium text-gray-700">
                    Include Index Page
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Sections Management */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Sections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Predefined Sections Dropdown */}
                <div>
                  <Select value={selectedPredefinedSection} onValueChange={setSelectedPredefinedSection}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select predefined section" />
                    </SelectTrigger>
                    <SelectContent>
                      {predefinedSections.map((section) => (
                        <SelectItem key={section} value={section}>
                          {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedPredefinedSection && (
                    <Button
                      onClick={addPredefinedSection}
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 h-8 bg-transparent"
                    >
                      <Plus className="w-3 h-3 mr-2" />
                      Add {selectedPredefinedSection}
                    </Button>
                  )}
                </div>

                {/* Existing Sections */}
                {sections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between p-2 bg-gray-50 rounded group">
                    <div className="flex items-center space-x-2 flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSection(section.id)}
                        className="h-6 w-6 p-0"
                      >
                        {collapsedSections[section.id] ? (
                          <ChevronRight className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </Button>
                      {editingSectionId === section.id ? (
                        <div className="flex items-center space-x-1 flex-1">
                          <Input
                            value={editingSectionTitle}
                            onChange={(e) => setEditingSectionTitle(e.target.value)}
                            className="h-6 text-xs flex-1"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveSection()
                              if (e.key === "Escape") cancelEditingSection()
                            }}
                            autoFocus
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={saveSection}
                            className="h-6 w-6 p-0 text-green-600"
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={cancelEditingSection}
                            className="h-6 w-6 p-0 text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between flex-1">
                          <span
                            className="text-xs font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                            onDoubleClick={() => startEditingSection(section.id, section.title)}
                          >
                            {section.title}
                          </span>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditingSection(section.id, section.title)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteSection(section.id)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs ml-2">
                      {getBlocksInSection(section.id).length} items
                    </Badge>
                  </div>
                ))}
                <Button onClick={() => addSection()} variant="outline" size="sm" className="w-full h-8 bg-transparent">
                  <Plus className="w-3 h-3 mr-2" />
                  Add Section
                </Button>
              </CardContent>
            </Card>

            {/* Collaboration */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => openTeamMemberPopup("reviewer")}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-8 bg-transparent"
                >
                  <UserPlus className="w-3 h-3 mr-2" />
                  Add Reviewer
                </Button>
                <Button
                  onClick={() => openTeamMemberPopup("observer")}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-8 bg-transparent"
                >
                  <Eye className="w-3 h-3 mr-2" />
                  Add Observer
                </Button>

                {reviewers.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Reviewers:</h4>
                    {reviewers.map((reviewer) => (
                      <div key={reviewer.id} className="flex items-center space-x-2 p-2 bg-blue-50 rounded mb-1">
                        <Image
                          src={reviewer.avatar || "/placeholder.svg"}
                          alt={reviewer.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-900">{reviewer.name}</p>
                          <p className="text-xs text-gray-500">{reviewer.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {observers.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Observers:</h4>
                    {observers.map((observer) => (
                      <div key={observer.id} className="flex items-center space-x-2 p-2 bg-green-50 rounded mb-1">
                        <Image
                          src={observer.avatar || "/placeholder.svg"}
                          alt={observer.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-900">{observer.name}</p>
                          <p className="text-xs text-gray-500">{observer.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Approvals */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Approvals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {approvals.map((approval) => (
                  <div key={approval.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3 text-gray-400" />
                      <div>
                        <p className="text-xs font-medium text-gray-900">{approval.name}</p>
                        <p className="text-xs text-gray-500">{approval.user}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        approval.status === "approved"
                          ? "default"
                          : approval.status === "pending"
                            ? "secondary"
                            : "outline"
                      }
                      className={`text-xs ${
                        approval.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : approval.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {approval.status}
                    </Badge>
                  </div>
                ))}
                <Button
                  onClick={sendForReview}
                  className="w-full h-8 bg-blue-600 hover:bg-blue-700"
                  disabled={reviewers.length === 0}
                >
                  <Send className="w-3 h-3 mr-2" />
                  Send for Review
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>Document created</p>
                  <p>Title updated</p>
                  <p>Block added</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-100 overflow-y-auto">
          <div className="py-8" ref={documentAreaRef}>
            {Array.from({ length: totalPages }, (_, pageIndex) => {
              const pageNumber = pageIndex + 1
              const pageBlocks = getBlocksForPage(pageNumber)
              return (
                <div key={pageNumber} className="mb-8">
                  <div
                    data-a4-page="true"
                    className="bg-white shadow-lg border border-gray-300 mx-auto p-8 relative"
                    style={{ width: "210mm", minHeight: "297mm", maxWidth: "210mm" }}
                  >
                    {pageNumber === 1 && (
                      <>
                        <div className="mb-8 text-center border-b border-gray-200 pb-6">
                          {isEditingTitle ? (
                            <Input
                              ref={titleRef}
                              value={documentTitle}
                              onChange={(e) => setDocumentTitle(e.target.value)}
                              onBlur={handleTitleSave}
                              onKeyDown={handleTitleKeyDown}
                              className="text-2xl font-bold text-gray-900 mb-4 text-center border-none shadow-none focus:ring-0 focus:border-none"
                            />
                          ) : (
                            <h1
                              className="text-2xl font-bold text-gray-900 mb-4 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                              onDoubleClick={handleTitleDoubleClick}
                            >
                              {documentTitle}
                            </h1>
                          )}
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="text-left">
                              <p>
                                <strong>Document Type:</strong> {documentType || "Not specified"}
                              </p>
                              <p>
                                <strong>Department:</strong> {documentDepartment || "Not specified"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p>
                                <strong>Version:</strong> {documentVersion}
                              </p>
                              <p>
                                <strong>Prepared By:</strong> {preparedBy}
                              </p>
                              <p>
                                <strong>Date:</strong> {new Date(dateOfPreparation).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {renderIndexPage()}
                      </>
                    )}

                    {/* Document Content */}
                    <div className="space-y-1 min-h-[200mm]">
                      {pageNumber === 1 ? (
                        <>
                          {getBlocksOutsideSections()
                            .slice(0, blocksPerPage)
                            .map((block, index) => renderBlock(block, index))}

                          {sections.map((section) => (
                            <div key={section.id} className="mb-6">
                              <div className="flex items-center space-x-2 mb-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleSection(section.id)}
                                  className="p-0"
                                >
                                  {collapsedSections[section.id] ? (
                                    <ChevronRight className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </Button>
                                <h2
                                  className="text-xl font-bold text-blue-900 border-l-4 border-blue-500 pl-4 cursor-pointer hover:bg-blue-50 px-2 py-1 rounded"
                                  onDoubleClick={() => startEditingSection(section.id, section.title)}
                                  onClick={() => {
                                    // Clicking the header sets the selection context for prompting
                                    const firstBlockInSection = getBlocksInSection(section.id)[0]
                                    if (firstBlockInSection) {
                                      setFocusedBlockId(firstBlockInSection.id)
                                      // focus the first block if exists
                                      const el = blockRefs.current[firstBlockInSection.id]
                                      ;(el as HTMLElement | null)?.focus?.()
                                    }
                                  }}
                                >
                                  {section.title}
                                </h2>
                              </div>

                              {!collapsedSections[section.id] && (
                                <div className="ml-6 pl-4 border-l border-gray-200">
                                  {getBlocksInSection(section.id).map((block, index) => renderBlock(block, index))}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      // Add a new block under this section and focus it
                                      const lastBlockId = blocks[blocks.length - 1].id
                                      addBlock(lastBlockId, "text", section.id)
                                    }}
                                    className="text-gray-400 hover:text-gray-600 mt-2"
                                  >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add content to this section
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}

                          <div className="mt-8">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addBlock(blocks[blocks.length - 1].id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add a block
                            </Button>
                          </div>
                        </>
                      ) : (
                        pageBlocks.map((block, index) => renderBlock(block, index))
                      )}
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
                      Page {pageNumber} of {totalPages}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Team Member Selection Popup */}
      {showTeamMemberPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Add {popupType === "reviewer" ? "Reviewer" : "Observer"}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowTeamMemberPopup(false)} className="h-6 w-6 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2 mb-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMembers.includes(member.id)
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => toggleMemberSelection(member.id)}
                >
                  <Image
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">
                      {member.role} - {member.department}
                    </p>
                  </div>
                  {selectedMembers.includes(member.id) && <Check className="w-4 h-4 text-blue-600" />}
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowTeamMemberPopup(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={addSelectedMembers} disabled={selectedMembers.length === 0} className="flex-1">
                Add Selected ({selectedMembers.length})
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ChatGPT-style Prompt — Bottom Middle, White, Wider, with Section Label */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[720px] max-w-[92vw]">
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg">
          <div className="flex items-center px-3 py-2">
            {/* Section context label (read-only) */}
            {selectedSectionName && (
              <div className="shrink-0 mr-2">
                <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 border border-gray-200 px-2 py-1 text-xs">
                  Section: {selectedSectionName}
                </span>
              </div>
            )}

            {/* Left icon (+) */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 rounded-full mr-1"
            >
              <Plus className="w-4 h-4" />
            </Button>

            {/* Input */}
            <div className="relative flex-1">
              <Input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder={selectedSectionName ? "Ask anything for this section..." : "Ask anything"}
                className="bg-transparent border-none text-gray-900 placeholder-gray-500 focus:ring-0 focus:border-none shadow-none pr-24"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    generateAIContent()
                  }
                }}
              />
            </div>

            {/* Right-side icons */}
            <div className="flex items-center space-x-1 ml-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 rounded-full">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 rounded-full">
                <Mic className="w-4 h-4" />
              </Button>

              {/* Sparkles send button similar to the provided image */}
              <Button
                onClick={generateAIContent}
                disabled={isGenerating || !aiPrompt.trim()}
                size="sm"
                className="h-9 w-9 p-0 rounded-full bg-white hover:bg-gray-100 border border-gray-300 text-gray-900 flex items-center justify-center"
                aria-label="Generate with AI"
                title="Generate with AI"
              >
                {isGenerating ? (
                  <div className="animate-spin w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Generated preview + Add button */}
          {generatedContent && (
            <div className="px-4 pb-4">
              <div className="bg-gray-50 border border-gray-200 p-3 text-sm text-gray-800 max-h-40 overflow-y-auto">
                <pre className="whitespace-pre-wrap">{generatedContent}</pre>
              </div>
              <Button onClick={addGeneratedContent} size="sm" className="w-full mt-2 bg-green-600 hover:bg-green-700">
                <Plus className="w-3 h-3 mr-1" />
                Add to Document
              </Button>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && !generatedContent && (
            <div className="px-4 pb-4">
              <div className="p-3 bg-orange-50 rounded border border-orange-200">
                <h4 className="text-xs font-medium mb-2">Rate this content:</h4>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setFeedback({ ...feedback, rating: star })}
                        className={`w-4 h-4 ${star <= feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        <Star className="w-full h-full fill-current" />
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                      <ThumbsUp className="w-2 h-2" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                      <ThumbsDown className="w-2 h-2" />
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={feedback.comment}
                    onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                    placeholder="Optional feedback..."
                    className="flex-1 h-6 text-xs"
                  />
                  <Button
                    size="sm"
                    onClick={submitFeedback}
                    disabled={feedback.rating === 0}
                    className="h-6 px-2 text-xs"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CMPLAI Bot */}
      <div className="fixed bottom-6 right-6 z-40">
        {showChatBot && (
          <Card className="w-80 h-96 mb-4 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  CMPLAI Bot
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowChatBot(false)} className="h-6 w-6 p-0">
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-80">
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-2 rounded text-xs ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900 border border-gray-200"
                      }`}
                    >
                      <pre className="whitespace-pre-wrap">{msg.message}</pre>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 h-8 text-xs"
                    onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                  />
                  <Button size="sm" onClick={sendChatMessage} className="h-8 px-2">
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <Button
          onClick={() => setShowChatBot((s) => !s)}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
      </div>

      {/* Block Menu */}
      {showBlockMenu && (
        <div
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-80 max-h-96 overflow-y-auto"
          style={{ left: blockMenuPosition.x, top: blockMenuPosition.y }}
        >
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 mb-2 px-2">BASIC BLOCKS</div>
            {blockTypes.map((blockType) => (
              <button
                key={blockType.id}
                onClick={() => {
                  if (!activeBlockId) return
                  updateBlock(activeBlockId, "")
                  setBlocks((prev) =>
                    prev.map((b) =>
                      b.id === activeBlockId
                        ? { ...b, type: blockType.id, placeholder: getPlaceholder(blockType.id) }
                        : b,
                    ),
                  )
                  setShowBlockMenu(false)
                }}
                className="w-full flex items-center space-x-3 px-2 py-2 hover:bg-gray-100 rounded text-left"
              >
                <blockType.icon className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="text-sm font-medium">{blockType.label}</div>
                  <div className="text-xs text-gray-500">{blockType.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {showBlockMenu && <div className="fixed inset-0 z-40" onClick={() => setShowBlockMenu(false)} />}
    </div>
  )
}
