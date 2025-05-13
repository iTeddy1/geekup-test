import { useAppDispatch, useAppSelector } from "@/app/hooks"
import DynamicBreadcrumb from "@/common/components/Breadcrumb"
import { LoadingSpinner } from "@/common/components/LoadingSpinner"
import { STATUS } from "@/common/config/status"
import { Button } from "@/components/ui/button"
import {
  getAlbumByIdAsync,
  getPhotosByAlbumIdAsync,
  selectAlbumById,
  selectPhotosByAlbumId,
  selectStatus,
} from "@/features/album/albumSlice"
import { getUserByIdAsync, selectUserById } from "@/features/user/userSlice"
import type { TPhoto } from "@/interfaces/Album"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function AlbumDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const album = useAppSelector(state => selectAlbumById(state, +id))
  const photos = useAppSelector(state => selectPhotosByAlbumId(state, +id))
  const user = useAppSelector(state => selectUserById(state, album?.userId))
  const albumStatus = useAppSelector(selectStatus)

  useEffect(() => {
    if (album?.userId) dispatch(getUserByIdAsync(album.userId))
  }, [dispatch, album?.userId])

  useEffect(() => {
    if (id) {
      dispatch(getAlbumByIdAsync(id))
      dispatch(getPhotosByAlbumIdAsync(id))
    }
  }, [dispatch, id])

  if (albumStatus === STATUS.LOADING || !user || !album) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <div>
      <DynamicBreadcrumb title="Albums" />
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => navigate(-1)}
          variant={"ghost"}
          className="hover:bg-[#0000000f] flex items-center "
        >
          <ArrowLeft className=" size-4" />
        </Button>
        <p className="text-xl">Show</p>
      </div>

      {/* Detail user render */}
      <section className="border border-[#f0f0f0] rounded-lg mt-4 bg-white">
        <div className="border border-[#f0f0f0] p-6 space-y-4">
          <div className="flex gap-4 items-start">
            <div className="flex items-center">
              <span className="size-8">
                <img
                  width={50}
                  height={50}
                  src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${user.name}`}
                  alt={user.name}
                />
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Link
                to={`/users/${user.id}`}
                className="font-medium hover:text-[#69b1ff] text-[#1677ff] "
              >
                {user.name}
              </Link>{" "}
              <Link
                to={`mailto:${user.email}`}
                className="text-sm hover:text-[#69b1ff] text-[#1677ff] "
              >
                {user.email}
              </Link>
            </div>
          </div>
          <h1>{album.title}</h1>
          {/* Display Photos of User  */}
          <PhotoList photos={photos} />
        </div>
      </section>
    </div>
  )
}

const PhotoList = ({ photos }: { photos: TPhoto[] }) => {
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {photos.length > 0 ? (
          photos.map(photo => (
            <div key={photo.id} className="flex items-center max-w-[150px]">
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="w-full h-16 rounded-lg"
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-gray-500">No photos found</p>
          </div>
        )}
      </div>
    </>
  )
}
