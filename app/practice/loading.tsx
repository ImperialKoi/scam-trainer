import { Shield } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Practice Session</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-32 h-2 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Email Display Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              
              {/* Email Header Skeleton */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              
              {/* Email Content Skeleton */}
              <div className="bg-white border rounded-lg p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              
              {/* Button Skeleton */}
              <div className="flex gap-4 pt-4">
                <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div>
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="text-center">
                <div className="h-12 bg-gray-200 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
