import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import {
  Bell,
  ImageIcon,
  Mail,
  MapPin,
  Mic,
  Phone,
  Upload,
  Video,
  Wallet,
} from 'lucide-react'

import { useData } from '@/context/DataWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'

const notifications = [
  {
    title: 'Request under review',
    detail: 'Your latest request is being reviewed and matched with nearby providers.',
    time: '2 min ago',
  },
  {
    title: 'New provider response',
    detail: 'A carpenter near your location is interested in your request.',
    time: '12 min ago',
  },
  {
    title: 'Price suggestion received',
    detail: 'You received an updated quote based on your expected budget.',
    time: '1 hour ago',
  },
]

type MediaKind = 'audio' | 'video'

type JobRequestForm = {
  audiobase64: string
  videobase64: string
  imagebase64: string
  title: string
  description: string
  service: string
  customerExpectedPriceinInr: number
}

const initialFormState: JobRequestForm = {
  audiobase64: '',
  videobase64: '',
  imagebase64: '',
  title: 'Leaking kitchen sink repair needed',
  description:
    'Kitchen sink ke neeche se paani leak ho raha hai. Pipe joint check karke repair chahiye as soon as possible.',
  service: 'Plumbing',
  customerExpectedPriceinInr: 100,
}

const uploadOptions = [
  {
    title: 'Upload photos',
    description: 'Add pictures of the issue or work area.',
    icon: ImageIcon,
    accept: 'image/*',
    field: 'imagebase64',
  },
  {
    title: 'Upload video',
    description: 'Share a short video to explain the work needed.',
    icon: Video,
    accept: 'video/*',
    field: 'videobase64',
  },
  {
    title: 'Upload audio',
    description: 'Upload voice notes with extra details.',
    icon: Mic,
    accept: 'audio/*',
    field: 'audiobase64',
  },
] as const

const serviceOptions = [
  'Plumbing',
  'Electrician',
  'Carpentry',
  'Painting',
  'Cleaning',
  'AC Repair',
  'Appliance Repair',
  'Pest Control',
]

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const result = reader.result
      if (typeof result === 'string') {
        resolve(result)
        return
      }

      reject(new Error('Could not convert file to base64.'))
    }

    reader.onerror = () => reject(new Error('Could not read selected file.'))
    reader.readAsDataURL(file)
  })
}

export function CustomerWorkspace() {
  const { user } = useData()
  const apiBaseUrl = getApiBaseUrl()
  const [formData, setFormData] = useState<JobRequestForm>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEstimatingPrice, setIsEstimatingPrice] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [estimateMessage, setEstimateMessage] = useState('')
  const [estimatePopupMessage, setEstimatePopupMessage] = useState('')
  const [audioFileName, setAudioFileName] = useState('')
  const [videoFileName, setVideoFileName] = useState('')
  const [imageFileName, setImageFileName] = useState('')
  const [isRecordingAudio, setIsRecordingAudio] = useState(false)
  const [isRecordingVideo, setIsRecordingVideo] = useState(false)
  const audioRecorderRef = useRef<MediaRecorder | null>(null)
  const videoRecorderRef = useRef<MediaRecorder | null>(null)
  const audioStreamRef = useRef<MediaStream | null>(null)
  const videoStreamRef = useRef<MediaStream | null>(null)
  const liveVideoRef = useRef<HTMLVideoElement | null>(null)
  const estimatePopupTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      audioStreamRef.current?.getTracks().forEach((track) => track.stop())
      videoStreamRef.current?.getTracks().forEach((track) => track.stop())
      if (estimatePopupTimeoutRef.current) {
        window.clearTimeout(estimatePopupTimeoutRef.current)
      }
    }
  }, [])

  const showEstimatePopup = (message: string) => {
    setEstimatePopupMessage(message)

    if (estimatePopupTimeoutRef.current) {
      window.clearTimeout(estimatePopupTimeoutRef.current)
    }

    estimatePopupTimeoutRef.current = window.setTimeout(() => {
      setEstimatePopupMessage('')
      estimatePopupTimeoutRef.current = null
    }, 5000)
  }

  const updateFormField = (field: keyof JobRequestForm, value: string | number) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleFileSelection = async (
    event: ChangeEvent<HTMLInputElement>,
    field: 'audiobase64' | 'videobase64' | 'imagebase64',
  ) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      const base64 = await fileToBase64(file)
      updateFormField(field, base64)

      if (field === 'audiobase64') {
        setAudioFileName(file.name)
      }

      if (field === 'videobase64') {
        setVideoFileName(file.name)
      }

      if (field === 'imagebase64') {
        setImageFileName(file.name)
      }

      setStatusMessage(`${file.name} attached successfully.`)
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'File upload failed.')
    } finally {
      event.target.value = ''
    }
  }

  const startRecording = async (kind: MediaKind) => {
    try {
      setStatusMessage('')

      if (kind === 'audio') {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        const chunks: Blob[] = []

        audioStreamRef.current?.getTracks().forEach((track) => track.stop())
        audioStreamRef.current = stream
        audioRecorderRef.current = recorder

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data)
          }
        }

        recorder.onstop = async () => {
          const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })
          const file = new File([blob], `audio-recording-${Date.now()}.webm`, {
            type: blob.type,
          })
          const base64 = await fileToBase64(file)

          updateFormField('audiobase64', base64)
          setAudioFileName(file.name)
          setIsRecordingAudio(false)
          setStatusMessage('Audio recorded and attached successfully.')
          stream.getTracks().forEach((track) => track.stop())
        }

        recorder.start()
        setIsRecordingAudio(true)
        setStatusMessage('Audio recording started.')
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })
      const recorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      videoStreamRef.current?.getTracks().forEach((track) => track.stop())
      videoStreamRef.current = stream
      videoRecorderRef.current = recorder

      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = stream
      }

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: recorder.mimeType || 'video/webm' })
        const file = new File([blob], `video-recording-${Date.now()}.webm`, {
          type: blob.type,
        })
        const base64 = await fileToBase64(file)

        updateFormField('videobase64', base64)
        setVideoFileName(file.name)
        setIsRecordingVideo(false)
        setStatusMessage('Video recorded and attached successfully.')
        stream.getTracks().forEach((track) => track.stop())

        if (liveVideoRef.current) {
          liveVideoRef.current.srcObject = null
        }
      }

      recorder.start()
      setIsRecordingVideo(true)
      setStatusMessage('Video recording started.')
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : `Unable to start ${kind} recording right now.`,
      )
    }
  }

  const stopRecording = (kind: MediaKind) => {
    if (kind === 'audio' && audioRecorderRef.current?.state === 'recording') {
      audioRecorderRef.current.stop()
      return
    }

    if (kind === 'video' && videoRecorderRef.current?.state === 'recording') {
      videoRecorderRef.current.stop()
    }
  }

  const createJobRequest = async () => {
    setIsSubmitting(true)
    setStatusMessage('')

    try {
      const response = await axios.post(`${apiBaseUrl}/api/job-requests`, formData)

      if (response.status < 200 || response.status >= 300) {
        throw new Error('Request submission failed.')
      }

      setStatusMessage('Request submitted successfully.')
      setFormData(initialFormState)
      setAudioFileName('')
      setVideoFileName('')
      setImageFileName('')
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : 'Could not submit your request.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const requestEstimatedPrice = async () => {
    setIsEstimatingPrice(true)
    setEstimateMessage('')

    try {
      const payload = {
        customer: {
          name: user?.name || '',
          email: user?.userProfile.email || '',
          phone: user?.userProfile.phone || '',
          address: user?.userProfile.address || '',
        },
        query: {
          title: formData.title,
          description: formData.description,
          service: formData.service,
          imagebase64: formData.imagebase64,
        },
      }

      const response = await axios.post(
        `${apiBaseUrl}/api/job-requests/estimate-price`,
        payload,
      )
      const estimatedPrice =
        response.data?.estimatedPrice ??
        response.data?.estimated_price ??
        response.data?.est_price ??
        response.data?.price ??
        response.data?.message
      const nextEstimateMessage = estimatedPrice
        ? String(estimatedPrice)
        : 'Estimate request sent successfully.'

      setEstimateMessage(nextEstimateMessage)
      showEstimatePopup(nextEstimateMessage)
    } catch (error) {
      const nextEstimateMessage =
        error instanceof Error
          ? error.message
          : 'Could not fetch estimated price right now.'

      setEstimateMessage(nextEstimateMessage)
      showEstimatePopup(nextEstimateMessage)
    } finally {
      setIsEstimatingPrice(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <section className="min-h-screen w-full border-t border-border bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.12),_transparent_28%),linear-gradient(180deg,_rgba(15,23,42,0.98),_rgba(10,14,25,1))]">
      {estimatePopupMessage ? (
        <div className="fixed right-6 top-6 z-50 max-w-sm rounded-2xl border border-primary/30 bg-card px-5 py-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
          <p className="text-sm font-semibold text-primary">Estimated Price</p>
          <p className="mt-1 text-sm text-foreground">{estimatePopupMessage}</p>
        </div>
      ) : null}
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.75)]">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Customer Request Desk
              </p>
              <h1 className="mt-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
                Describe the work, attach media, and set your expected price.
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                This customer view is focused only on raising a service request and
                receiving updates. Upload photos, video, or audio, explain the work,
                and wait for matching providers.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.75)]">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Service needed</span>
                <select
                  value={formData.service}
                  onChange={(event) => updateFormField('service', event.target.value)}
                  className="flex h-12 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {serviceOptions.map((serviceOption) => (
                    <option key={serviceOption} value={serviceOption}>
                      {serviceOption}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Request title</span>
                <Input
                  value={formData.title}
                  onChange={(event) => updateFormField('title', event.target.value)}
                  placeholder="Kitchen sink repair"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Price expectation</span>
                <Input
                  type="number"
                  value={formData.customerExpectedPriceinInr}
                  onChange={(event) =>
                    updateFormField(
                      'customerExpectedPriceinInr',
                      Number(event.target.value) || 0,
                    )
                  }
                  placeholder="Enter your expected budget"
                />
              </label>
            </div>

            <label className="mt-6 grid gap-2">
              <span className="text-sm font-medium text-foreground">Describe your request</span>
              <Textarea
                className="min-h-36"
                value={formData.description}
                onChange={(event) => updateFormField('description', event.target.value)}
                placeholder="Write what work you need, the urgency, preferred timing, and any important details."
              />
            </label>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {uploadOptions.map((option) => {
                const Icon = option.icon

                return (
                  <label
                    key={option.title}
                    className="group flex cursor-pointer flex-col gap-4 rounded-[1.6rem] border border-dashed border-border bg-background/55 p-6 transition-all hover:border-primary/60 hover:bg-background/75"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">{option.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    <div className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
                      <Upload className="h-4 w-4" />
                      Choose file
                    </div>
                    <input
                      type="file"
                      accept={option.accept}
                      className="hidden"
                      onChange={(event) => handleFileSelection(event, option.field)}
                    />
                  </label>
                )
              })}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border bg-background/55 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Audio recording</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {audioFileName || 'No audio attached yet.'}
                    </p>
                  </div>
                  {isRecordingAudio ? (
                    <Button type="button" variant="destructive" onClick={() => stopRecording('audio')}>
                      Stop Audio
                    </Button>
                  ) : (
                    <Button type="button" onClick={() => startRecording('audio')}>
                      Record Audio
                    </Button>
                  )}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-background/55 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Video recording</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {videoFileName || 'No video attached yet.'}
                    </p>
                  </div>
                  {isRecordingVideo ? (
                    <Button type="button" variant="destructive" onClick={() => stopRecording('video')}>
                      Stop Video
                    </Button>
                  ) : (
                    <Button type="button" onClick={() => startRecording('video')}>
                      Record Video
                    </Button>
                  )}
                </div>
                <video
                  ref={liveVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className={`mt-4 w-full rounded-2xl border border-border bg-black/40 ${
                    isRecordingVideo ? 'block' : 'hidden'
                  }`}
                />
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-border bg-background/55 p-5 text-sm text-muted-foreground">
              <p>Image: {imageFileName || 'No image attached yet.'}</p>
              <p className="mt-2">Audio base64: {formData.audiobase64 ? 'Ready' : 'Missing'}</p>
              <p className="mt-2">Video base64: {formData.videobase64 ? 'Ready' : 'Missing'}</p>
              <p className="mt-2">Image base64: {formData.imagebase64 ? 'Ready' : 'Missing'}</p>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl text-sm leading-6 text-muted-foreground">
                <p>
                  Add as much detail as possible so nearby service providers can respond
                  faster and with better price estimates.
                </p>
                {statusMessage ? (
                  <p className="mt-3 font-medium text-primary">{statusMessage}</p>
                ) : null}
              </div>
              <Button
                type="button"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={createJobRequest}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.75)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              User Profile
            </p>
            <div className="mt-5 flex items-center gap-4">
              <img
                src={user.userProfile.imageUrl}
                alt={user.name}
                className="h-16 w-16 rounded-2xl object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                <p className="text-sm capitalize text-muted-foreground">{user.role}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-[1.2rem] border border-border bg-background/55 px-4 py-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                {user.userProfile.email}
              </div>
              <div className="flex items-center gap-3 rounded-[1.2rem] border border-border bg-background/55 px-4 py-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                {user.userProfile.phone}
              </div>
              <div className="flex items-center gap-3 rounded-[1.2rem] border border-border bg-background/55 px-4 py-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {user.userProfile.address}
              </div>
              <div className="flex items-center gap-3 rounded-[1.2rem] border border-border bg-background/55 px-4 py-3 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4 text-primary" />
                Wallet balance: {user.wallet.balance} points
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.75)]">
            <div className="rounded-[1.5rem] border border-border bg-background/55 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                  <h3 className="text-lg font-semibold text-foreground">
                    See estimated price in their location
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    This sends customer details, service needed, title, description,
                    and attached picture to the backend for a location-based estimate.
                  </p>
                  {estimateMessage ? <p className="mt-3 text-sm font-medium text-primary">{estimateMessage}</p> : null}
                </div>
                <Button
                  type="button"
                  onClick={requestEstimatedPrice}
                  disabled={isEstimatingPrice}
                >
                  {isEstimatingPrice
                    ? 'Requesting estimate...'
                    : 'See estimated price in their location'}
                </Button>
              </div>
            </div>

            <div className="mt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Notifications
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  Updates for your requests
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Bell className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {notifications.map((notification) => (
                <article
                  key={notification.title}
                  className="rounded-[1.5rem] border border-border bg-background/55 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-foreground">
                      {notification.title}
                    </h3>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {notification.time}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {notification.detail}
                  </p>
                </article>
              ))}
            </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
