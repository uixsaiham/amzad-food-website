// Add approved customer content under the exact product slug. Never reuse unrelated reviews.
export type WrittenReview = { name: string; rating: number; comment: string };
export type VideoReview = { title: string; youtubeId: string };
export const productReviews: Record<string, { written: WrittenReview[]; videos: VideoReview[] }> = {};
