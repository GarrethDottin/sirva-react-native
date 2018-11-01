import { apiUrls } from '../Config/Constants'
import { buildJsonPayload, doPost } from './Helper'

TYPE_MOOD_FEEDBACK_TRACKER = "moodFeedbackTracker"

export async function submitFeedback(userFeedback, token) {
  const attributes = {
    feedback: userFeedback
  };
  const payload = buildJsonPayload(TYPE_MOOD_FEEDBACK_TRACKER, attributes);
  return await doPost(apiUrls.moodFeedback, payload, token);
}

export async function submitFeedbackAndMood(userFeedback, userMood, token) {
  const attributes = {
    feedback: userFeedback,
    mood: userMood
  };
  const payload = buildJsonPayload(TYPE_MOOD_FEEDBACK_TRACKER, attributes);
  return await doPost(apiUrls.moodFeedback, payload, token);
}

export async function submitMood(userMood, token) {
  const attributes = {
    mood: userMood
  };
  const payload = buildJsonPayload(TYPE_MOOD_FEEDBACK_TRACKER, attributes);
  return await doPost(apiUrls.moodFeedback, payload, token);
}

