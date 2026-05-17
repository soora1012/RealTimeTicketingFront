//대기열 SSE 연결 함수
export function connectQueueSse({
  concertScheduleId,
  onQueueUpdate,
  onEnterAllowed,
  onError
}) {
  const eventSource = new EventSource(
    `${import.meta.env.VITE_API_BASE_URL}/queue/subscribe/${concertScheduleId}`,
    {
      withCredentials: true
    }
  )

  eventSource.addEventListener("queue", (event) => {
    const data = JSON.parse(event.data)

    if (onQueueUpdate) {
      onQueueUpdate(data)
    }

    if (data.active === true) {
      if (onEnterAllowed) {
        onEnterAllowed(data)
      }
      eventSource.close()
    }
  })
  eventSource.onopen = () => {
    console.log("SSE 연결 성공")
  }

  eventSource.onerror = (error) => {
    console.error("SSE 연결 오류", error)
    if (onError) {
      onError(error)
    }

    eventSource.close()
  }
  return eventSource
}