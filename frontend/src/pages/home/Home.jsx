import { useState } from "react"
import {
  Layers,
  File,
  Settings,
  UploadCloud,
  Home,
  ChevronLeft,
  X,
  Workflow,
  Bot,
  AlarmClock,
  Gauge,
  Zap,
  ListChecks,
  Menu,
} from "lucide-react"

export default function Dashboard() {
  const [activeService, setActiveService] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)

  const services = [
    { id: "workflow-builder", name: "Workflow Builder", icon: Workflow, color: "text-indigo-500" },
    { id: "bot-integration", name: "Bot Integrations", icon: Bot, color: "text-emerald-500" },
    { id: "task-scheduler", name: "Task Scheduler", icon: AlarmClock, color: "text-amber-500" },
  ]

  return (
    <div className="h-screen w-full flex flex-col  justify-between md:flex-row bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
  {/* Sidebar: Hidden on mobile, shown on desktop (left sidebar) */}
<aside className="hidden md:flex w-64 flex-col bg-white/80 backdrop-blur-md border-r border-gray-200 p-6 gap-6 h-full overflow-y-auto">
  <h1 className="text-2xl font-bold flex items-center gap-2">
    <span className="bg-indigo-600 text-white p-2 rounded-lg">
      <Zap size={20} />
    </span>
    <span>Automation</span>
  </h1>

  <nav className="flex flex-col gap-1 text-sm">
    {[
      { label: "Dashboard", icon: Home },
      { label: "Analytics", icon: Gauge },
      { label: "Task Monitor", icon: ListChecks },
      { label: "Settings", icon: Settings },
    ].map((item) => (
      <button
        key={item.label}
        className="flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-lg text-gray-700 hover:text-indigo-600 transition-colors"
      >
        <item.icon size={18} className="opacity-80" />
        {item.label}
      </button>
    ))}
  </nav>

  <div className="mt-auto p-3 bg-indigo-50 rounded-lg">
    <div className="text-xs text-indigo-800 mb-1">Automation Quota</div>
    <div className="w-full bg-white rounded-full h-2 mb-1">
      <div className="bg-indigo-600 h-2 rounded-full w-3/4"></div>
    </div>
    <div className="text-xs text-indigo-800">15.2 GB of 20 GB used</div>
  </div>
</aside>

{/* Bottom Navbar for mobile */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around items-center h-14 shadow-sm">
  {[
    { label: "Dashboard", icon: Home },
    { label: "Analytics", icon: Gauge },
    { label: "Tasks", icon: ListChecks },
    { label: "Settings", icon: Settings },
  ].map((item) => (
    <button
      key={item.label}
      className="flex flex-col items-center justify-center text-xs text-gray-600 hover:text-indigo-600"
    >
      <item.icon size={20} />
      <span className="text-[11px]">{item.label}</span>
    </button>
  ))}
</nav>


      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto relative">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden absolute top-4 right-4 z-50 text-gray-600 hover:text-indigo-600"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu size={24} />
        </button>

        {!activeService ? (
          <>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Choose Automation Module
              </h2>
              <p className="text-gray-500">Start building or managing your automated workflows</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md cursor-pointer transition-all group"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${service.color} bg-opacity-10 flex items-center justify-center mb-3 group-hover:bg-opacity-20 transition-all`}
                  >
                    <service.icon size={22} className={`${service.color}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-snug">
                    Click to manage or upload files
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
              <div>
                <button
                  onClick={() => setActiveService(null)}
                  className="flex items-center gap-2 text-sm px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <ChevronLeft size={16} />
                  Back to Modules
                </button>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">
                  {activeService.name} Upload
                </h2>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  Recent Uploads
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  Settings
                </button>
              </div>
            </div>

            <UploadFileComponent />
          </>
        )}
      </main>
    </div>
  )
}

function UploadFileComponent() {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)

  const handleChange = (e) => {
    const uploaded = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...uploaded])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const uploaded = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...uploaded])
  }

  const clearFiles = () => setFiles([])
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 shadow-sm w-full max-w-3xl">
      <div
        className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all ${
          isDragging ? "border-indigo-400 bg-indigo-50" : "border-gray-300 hover:border-indigo-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <UploadCloud size={28} className="text-indigo-500" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Drag and drop files here</h3>
        <p className="text-gray-500 text-sm mb-4">or</p>

        <label className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors text-sm">
          <UploadCloud size={16} className="mr-2" />
          Select Files
          <input type="file" multiple onChange={handleChange} className="hidden" />
        </label>

        <p className="text-xs text-gray-400 mt-3">Supports: PDF, JPG, PNG up to 10MB</p>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
              Selected Files ({files.length})
            </h4>
            <button
              onClick={clearFiles}
              className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              <X size={14} />
              Clear All
            </button>
          </div>

          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                <div className="flex items-center gap-3">
                  <File size={16} className="text-gray-400" />
                  <span className="font-medium text-gray-700 truncate max-w-[180px] sm:max-w-xs">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {Math.round(file.size / 1024)} KB
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm">
            Upload Files
          </button>
        </div>
      )}
    </div>
  )
}
