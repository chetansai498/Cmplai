"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Building2,
  User,
  MessageSquare,
  Video,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Quality Manager",
    department: "Quality Assurance",
    email: "sarah.johnson@cmplai.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "2022-03-15",
    status: "active",
    avatar: "/diverse-woman-portrait.png",
    skills: ["Quality Control", "ISO Standards", "Process Improvement"],
    projects: ["Quality Metrics Dashboard", "ISO Certification"],
    certifications: ["Six Sigma Black Belt", "ISO 9001 Lead Auditor"],
  },
  {
    id: 2,
    name: "Michael Davis",
    role: "Safety Officer",
    department: "EHS",
    email: "michael.davis@cmplai.com",
    phone: "+1 (555) 234-5678",
    location: "Chicago, IL",
    joinDate: "2021-08-22",
    status: "active",
    avatar: "/thoughtful-man.png",
    skills: ["Safety Management", "Risk Assessment", "Emergency Response"],
    projects: ["Safety Protocol Review", "Emergency Response Plan"],
    certifications: ["OSHA 30-Hour", "Certified Safety Professional"],
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Manufacturing Engineer",
    department: "Manufacturing",
    email: "emily.chen@cmplai.com",
    phone: "+1 (555) 345-6789",
    location: "San Francisco, CA",
    joinDate: "2023-01-10",
    status: "active",
    avatar: "/diverse-woman-portrait.png",
    skills: ["Process Engineering", "Lean Manufacturing", "Automation"],
    projects: ["Production Optimization", "Equipment Upgrade"],
    certifications: ["Lean Six Sigma Green Belt", "PMP"],
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Compliance Specialist",
    department: "Regulatory Affairs",
    email: "david.rodriguez@cmplai.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    joinDate: "2022-11-05",
    status: "active",
    avatar: "/thoughtful-man.png",
    skills: ["Regulatory Compliance", "Documentation", "Audit Management"],
    projects: ["Compliance Audit", "Regulatory Documentation"],
    certifications: ["RAC Certification", "FDA Regulations"],
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Quality Control Analyst",
    department: "Quality Control",
    email: "lisa.wang@cmplai.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    joinDate: "2023-06-12",
    status: "active",
    avatar: "/diverse-woman-portrait.png",
    skills: ["Laboratory Testing", "Data Analysis", "Quality Systems"],
    projects: ["Testing Protocol Update", "Lab Equipment Validation"],
    certifications: ["ASQ CQA", "Laboratory Management"],
  },
  {
    id: 6,
    name: "James Thompson",
    role: "Supply Chain Manager",
    department: "Supply Chain",
    email: "james.thompson@cmplai.com",
    phone: "+1 (555) 678-9012",
    location: "Denver, CO",
    joinDate: "2021-12-03",
    status: "active",
    avatar: "/thoughtful-man.png",
    skills: ["Supply Chain Management", "Vendor Relations", "Logistics"],
    projects: ["Supplier Qualification", "Inventory Optimization"],
    certifications: ["APICS SCOR", "Supply Chain Management"],
  },
]

const departments = [
  "All Departments",
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

export default function TeamPage() {
  const [filteredMembers, setFilteredMembers] = useState(teamMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
  const [selectedMember, setSelectedMember] = useState(null)
  const [userDepartment, setUserDepartment] = useState("")

  useEffect(() => {
    const storedUserDepartment = localStorage.getItem("userDepartment") || ""
    setUserDepartment(storedUserDepartment)

    // Filter team members based on search and department
    let filtered = teamMembers

    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (departmentFilter !== "All Departments") {
      filtered = filtered.filter((member) => member.department === departmentFilter)
    }

    setFilteredMembers(filtered)
  }, [searchTerm, departmentFilter])

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "away":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Directory</h1>
          <p className="text-gray-600">Connect with your colleagues and view team information</p>
        </div>

        {/* Team Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-gray-900">{departments.length - 1}</p>
                </div>
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Today</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter((m) => m.status === "active").length}
                  </p>
                </div>
                <User className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Certifications</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.reduce((sum, member) => sum + member.certifications.length, 0)}
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                {filteredMembers.length} members found
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Image
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{member.role}</p>
                    <Badge variant="outline" className="text-xs mb-2">
                      {member.department}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(member.status)}`}>{member.status}</Badge>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{member.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setSelectedMember(member)}
                  >
                    <User className="w-3 h-3 mr-1" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Member Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={selectedMember.avatar || "/placeholder.svg"}
                    alt={selectedMember.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-xl">{selectedMember.name}</CardTitle>
                    <p className="text-gray-600">{selectedMember.role}</p>
                    <Badge variant="outline" className="mt-1">
                      {selectedMember.department}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedMember(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{selectedMember.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{selectedMember.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{selectedMember.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Joined {new Date(selectedMember.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Current Projects */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Current Projects</h3>
                <div className="space-y-2">
                  {selectedMember.projects.map((project, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{project}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Certifications</h3>
                <div className="space-y-2">
                  {selectedMember.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Video className="w-4 h-4 mr-2" />
                  Video Call
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
