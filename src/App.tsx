import { Route, Navigate, Routes } from "react-router-dom"
import AppLayout from "@/layout/AppLayout"
import AlbumPage from "./pages/album/Album"
import UserPage from "./pages/user/User"
import UserDetailsPage from "./pages/user/UserDetails"
import AlbumDetailsPage from "./pages/album/AlbumDetails"
import { Suspense } from "react"
import { LoadingSpinner } from "./common/components/LoadingSpinner"

export const App = () => {
  return (
    <AppLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/albums?pageSize=20&current=1" replace />}
          />
          <Route path="/albums" element={<AlbumPage />} />
          <Route path="/albums/:id" element={<AlbumDetailsPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
        </Routes>
      </Suspense>
    </AppLayout>
  )
}
