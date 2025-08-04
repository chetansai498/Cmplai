"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Download, BarChart3, Sparkles, Plus, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const documentSections = [
  { id: "report-info", title: "Report Information", required: true },
  { id: "production-summary", title: "Production Summary", required: true },
  { id: "production-details", title: "Production Details", required: true },
  { id: "quality-metrics", title: "Quality Metrics", required: true },
  { id: "efficiency-analysis", title: "Efficiency Analysis", required: true },
  { id: "downtime-analysis", title: "Downtime Analysis", required: true },
  { id: "resource-utilization", title: "Resource Utilization", required: true },
  { id: "quality-issues", title: "Quality Issues", required: false },
  { id: "recommendations", title: "Recommendations", required: false },
  { id: "action-items", title: "Action Items", required: false },
]

export default function ManufacturingDataReportingPage() {
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

This comprehensive analysis provides detailed insights for ${sectionTitle} in manufacturing data reporting. The content follows industry best practices for production monitoring and performance analysis.

Key Performance Indicators:
• Production efficiency metrics and targets
• Quality control measurements and trends
• Resource utilization optimization
• Operational excellence indicators
• Continuous improvement opportunities

Data Analysis Summary:
• Statistical analysis of production data
• Trend identification and forecasting
• Performance benchmarking
• Root cause analysis of variations
• Actionable insights for improvement

This report supports data-driven decision making and operational excellence in manufacturing processes.`

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/department/manufacturing">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Manufacturing
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Manufacturing Data Reporting</h1>
                <p className="text-sm text-gray-600">AI-Powered Production Performance Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Report
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
                  <label className="text-sm font-medium text-gray-700">Select Report Section:</label>
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

                <div className="text-xs text-blue-600 bg-blue-100 p-3 rounded-lg">
                  <p className="font-medium mb-1">💡 AI Tips for Manufacturing Reports:</p>
                  <ul className="space-y-1">
                    <li>• Include specific production metrics and KPIs</li>
                    <li>• Mention shift details and production lines</li>
                    <li>• Specify quality standards and targets</li>
                    <li>• Include efficiency and downtime data</li>
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
                <CardTitle className="text-2xl font-bold text-gray-900">MANUFACTURING DATA REPORT</CardTitle>
                <p className="text-gray-600 mt-2">Production Performance and Quality Metrics</p>
                <div className="flex justify-center space-x-8 text-sm text-gray-600 mt-4">
                  <div>
                    <span className="font-medium">Report Type:</span> Production Data
                  </div>
                  <div>
                    <span className="font-medium">Period:</span> {new Date().toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> <Badge variant="secondary">Draft</Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Document Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Report Progress
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
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300"
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
                    selectedSection === section.id ? "ring-2 ring-orange-500 border-orange-300" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-orange-500" />
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
                <CardTitle>Report Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Report ID:</p>
                    <p className="text-gray-600">MFG-RPT-001</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Generated:</p>
                    <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Department:</p>
                    <p className="text-gray-600">Manufacturing</p>
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
