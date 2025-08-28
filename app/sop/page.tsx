"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Download, Save, Users, CheckCircle, Clock, Sparkles, Plus, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const sopSections = [
  { id: "objective", title: "Objective", required: true },
  { id: "scope", title: "Scope", required: true },
  { id: "responsibility", title: "Responsibility", required: true },
  { id: "accountability", title: "Accountability", required: true },
  { id: "procedure", title: "Procedure", required: true },
  { id: "preparation", title: "Preparation for Hot Work", required: false },
  { id: "annexures", title: "Annexures", required: false },
  { id: "revision", title: "Revision History", required: true },
]

export default function SOPPage() {
  const [sectionContent, setSectionContent] = useState({})
  const [selectedSection, setSelectedSection] = useState(null)
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Load content from localStorage (simulating real-time sync with manager changes)
  useEffect(() => {
    const savedContent = localStorage.getItem("sopContent")
    if (savedContent) {
      setSectionContent(JSON.parse(savedContent))
    }
  }, [])

  const handleSectionDoubleClick = (sectionId) => {
    setSelectedSection(sectionId)
    setDialogOpen(true)
  }

  const generateContent = async () => {
    setIsGenerating(true)
    // Simulate AI content generation
    setTimeout(() => {
      const generatedContent = `Generated content for ${selectedSection} based on: "${aiPrompt}"\n\nThis is AI-generated content that would be relevant to the ${selectedSection} section of the SOP document. The content would be professionally written and comply with industry standards.`

      setSectionContent((prev) => ({
        ...prev,
        [selectedSection]: generatedContent,
      }))
      setIsGenerating(false)
      setAiPrompt("")
    }, 2000)
  }

  const addToSection = () => {
    if (selectedSection && sectionContent[selectedSection]) {
      // Content is already added via generate function
      setDialogOpen(false)
    }
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
                <h1 className="text-xl font-bold text-gray-900">Standard Operating Procedure</h1>
                <p className="text-sm text-gray-600">EHS Department - Hot Work Safety Protocol</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Employee View
              </Badge>
              <div className="text-right text-sm text-gray-600">
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>SOP No.: EHS-SOP-001</p>
                <p>Prepared by: Safety Team</p>
              </div>
              <Image src="/logo.png" alt="CMPLAI Logo" width={80} height={30} className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg h-screen sticky top-16 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Management</h2>

              {/* Employee Addition Section */}
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Employee Addition
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="w-3 h-3 mr-2" />
                    Add Reviewer
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="w-3 h-3 mr-2" />
                    Add Approver
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="w-3 h-3 mr-2" />
                    Add Observer
                  </Button>
                </CardContent>
              </Card>

              {/* Approvals Section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Approvals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">Safety Manager</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Pending
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">Department Head</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Waiting
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">Quality Assurance</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Waiting
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button className="w-full" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit for Review
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Document Header */}
            <Card className="mb-8">
              <CardHeader className="text-center border-b">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-gray-900">STANDARD OPERATING PROCEDURE</h1>
                  <h2 className="text-xl text-gray-700">Hot Work Safety Protocol</h2>
                  <div className="flex justify-center space-x-8 text-sm text-gray-600 mt-4">
                    <div>
                      <span className="font-medium">Department:</span> EHS
                    </div>
                    <div>
                      <span className="font-medium">Document Type:</span> SOP
                    </div>
                    <div>
                      <span className="font-medium">Version:</span> 1.0
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* SOP Sections */}
            <div className="space-y-6">
              {sopSections.map((section) => (
                <Card key={section.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {section.title}
                        {section.required && <span className="text-red-500">*</span>}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {sectionContent[section.id] ? "Completed" : "Empty"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder={`Double-click to add content for ${section.title}...`}
                      value={sectionContent[section.id] || ""}
                      onChange={(e) =>
                        setSectionContent((prev) => ({
                          ...prev,
                          [section.id]: e.target.value,
                        }))
                      }
                      onDoubleClick={() => handleSectionDoubleClick(section.id)}
                      className="min-h-[120px] cursor-pointer hover:bg-gray-50 transition-colors"
                      rows={5}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Document Footer */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Document Control</h4>
                    <p className="text-gray-600">Document ID: EHS-SOP-001</p>
                    <p className="text-gray-600">Version: 1.0</p>
                    <p className="text-gray-600">Effective Date: {new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Approval Status</h4>
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-3 h-3 text-yellow-500" />
                      <span className="text-gray-600">Pending Review</span>
                    </div>
                    <p className="text-gray-600">
                      Next Review: {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Distribution</h4>
                    <p className="text-gray-600">All EHS Personnel</p>
                    <p className="text-gray-600">Operations Team</p>
                    <p className="text-gray-600">Safety Committee</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Content Generation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              AI Content Generator - {selectedSection && sopSections.find((s) => s.id === selectedSection)?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Content</label>
              <Textarea
                value={sectionContent[selectedSection] || ""}
                onChange={(e) =>
                  setSectionContent((prev) => ({
                    ...prev,
                    [selectedSection]: e.target.value,
                  }))
                }
                placeholder="Enter or edit content manually..."
                className="min-h-[100px]"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Prompt</label>
              <Textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe what you want to generate for this section..."
                className="min-h-[80px]"
                rows={3}
              />
            </div>

            <div className="flex space-x-3">
              <Button onClick={generateContent} disabled={!aiPrompt.trim() || isGenerating} className="flex-1">
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>

              <Button onClick={addToSection} variant="outline" disabled={!sectionContent[selectedSection]}>
                <Plus className="w-4 h-4 mr-2" />
                Add to Section
              </Button>
            </div>

            <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
              <p className="font-medium text-blue-900 mb-1">💡 AI Tips:</p>
              <ul className="space-y-1 text-blue-800">
                <li>• Be specific about the type of content you need</li>
                <li>• Mention any compliance standards or regulations</li>
                <li>• Include context about your industry or process</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
