// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:8000/api/v1/verify", {
          method: "GET",
          credentials: "include", // ✅ let browser send HTTP-only cookie
        })

        if (res.ok) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) return <div>Loading...</div>

  if (!isAuthenticated) return <Navigate to="/" />

  return children
}
