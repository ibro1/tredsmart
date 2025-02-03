import Queue from "bull"
import { createBullBoard } from "@bull-board/api"
import { BullAdapter } from "@bull-board/api/dist/bullAdapter.js"
import { ExpressAdapter } from "@bull-board/express"

// Create queues with Docker Redis service
export const tweetQueue = new Queue("tweet-processing", {
  redis: {
    host: process.env.NODE_ENV === "production" ? "redis" : "localhost",
    port: 6379,
  },
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 3,
  },
})

// Setup Bull Board
export const serverAdapter = new ExpressAdapter()
createBullBoard({
  queues: [new BullAdapter(tweetQueue)],
  serverAdapter,
})

serverAdapter.setBasePath("/admin/queues")

// Export queue instance
export { Queue }
