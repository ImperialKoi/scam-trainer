"use client"

import { Suspense } from "react"
import PracticeContent from "./practice-content"

export default function PracticePage() {
  return (
    <Suspense fallback={<div>Loading practice session...</div>}>
      <PracticeContent />
    </Suspense>
  )
}
