"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Download, AlertTriangle, Sparkles, Plus, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const documentSections = [
  { id: "basic-info", title: "Basic Information", required: true },
  { id: "deviation-description", title: "Deviation Description", required: true },
  { id: "impact-assessment", title: "Impact Assessment", required: true },
  { id: "root-cause-analysis", title: "Root Cause Analysis", required: true },
  { id: "corrective-actions", title: "Corrective Actions", required: true },
  { id: "preventive-actions", title: "Preventive Actions", required: true },
  { id: "investigation-procedure", title: "Investigation Procedure", required: true },
  { id: "qa-review", title: "Quality Assurance Review", required: true },
  { id: "capa-implementation", title: "CAPA Implementation", required: true },
  { id: "supporting-documents", title: "Supporting Documents", required: false },
  { id: "approval-closure", title: "Approval and Closure", required: true },
]

export default function DeviationReportPage() {
  const [selectedSection, setSelectedSection] = useState("")
  const [sectionInput, setSectionInput] = useState("")
  const [aiPrompt, setAiPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [documentContent, setDocumentContent] = useState({})

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId)
    setSectionInput(documentContent[sectionId] || "")
    setGeneratedContent("")
    setAiPrompt("")
  }

  const generateContent = async () => {
    if (!aiPrompt.trim()) return

    setIsGenerating(true)
    setTimeout(() => {
      const sectionTitle = documentSections.find((s) => s.id === selectedSection)?.title
      const generatedText = `AI-Generated Content for ${sectionTitle}:

Based on your prompt: "${aiPrompt}"

This comprehensive analysis addresses the specific requirements for ${sectionTitle} in a deviation report. The content follows regulatory compliance standards and industry best practices for quality management.

Key Elements Included:
• Detailed systematic analysis
• Regulatory compliance considerations
• Risk assessment and mitigation
• Clear documentation requirements
• Actionable recommendations
• Timeline and responsibility assignments

This content ensures thorough documentation and supports effective deviation management processes in accordance with quality standards.`

      setGeneratedContent(generatedText)
      setIsGenerating(false)
    }, 2000)
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
    }
  }

  const updateSectionInput = () => {
    if (sectionInput && selectedSection) {
      setDocumentContent((prev) => ({
        ...prev,
        [selectedSection]: sectionInput,
      }))
    }
  }

  const getSectionStatus = (sectionId: string) => {
    return documentContent[sectionId] ? "completed" : "empty"
  }

  const getSectionColor = (sectionId: string) => {
    const colors = {
      "basic-info": "bg-blue-100 text-blue-800",
      "deviation-description": "bg-red-100 text-red-800",
      "impact-assessment": "bg-orange-100 text-orange-800",
      "root-cause-analysis": "bg-purple-100 text-purple-800",
      "corrective-actions": "bg-green-100 text-green-800",
      "preventive-actions": "bg-teal-100 text-teal-800",
      "investigation-procedure": "bg-indigo-100 text-indigo-800",
      "qa-review": "bg-cyan-100 text-cyan-800",
      "capa-implementation": "bg-pink-100 text-pink-800",
      "supporting-documents": "bg-yellow-100 text-yellow-800",
      "approval-closure": "bg-gray-100 text-gray-800",
    }
    return colors[sectionId] || "bg-gray-100 text-gray-800"
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
                <h1 className="text-xl font-bold text-gray-900">Deviation Report</h1>
                <p className="text-sm text-gray-600">AI-Powered Quality Deviation Investigation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
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

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Content Generation */}
        <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-200">
          <div className="space-y-6">
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
                      {documentSections.map((section, index) => (
                        <SelectItem key={section.id} value={section.id}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getSectionColor(section.id)}`}>
                                {index + 1}.0
                              </span>
                              <span>{section.title}</span>
                            </div>
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

                <div className="text-xs text-blue-600 bg-blue-100 p-3 rounded-lg">
                  <p className="font-medium mb-1">💡 AI Tips for Deviation Reports:</p>
                  <ul className="space-y-1">
                    <li>• Include specific details about the deviation</li>
                    <li>• Mention regulatory requirements (FDA, ISO, etc.)</li>
                    <li>• Specify the product/process affected</li>
                    <li>• Include timeline and impact assessment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Panel - Document Preview */}
        <div className="w-1/2 p-6 overflow-y-auto bg-white">
          <div className="space-y-6">
            {/* Document Header */}
            <Card>
              <CardHeader className="text-center border-b">
                <CardTitle className="text-2xl font-bold text-gray-900">DEVIATION REPORT</CardTitle>
                <p className="text-gray-600 mt-2">Quality Investigation and Corrective Action</p>
                <div className="flex justify-center space-x-8 text-sm text-gray-600 mt-4">
                  <div>
                    <span className="font-medium">Document Type:</span> Deviation Report
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
              {documentSections.map((section, index) => (
                <Card
                  key={section.id}
                  className={`transition-all duration-200 ${
                    selectedSection === section.id ? "ring-2 ring-blue-500 border-blue-300" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSectionColor(section.id)}`}>
                          {index + 1}.0
                        </span>
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
                    <p className="text-gray-600">DEV-001</p>
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
