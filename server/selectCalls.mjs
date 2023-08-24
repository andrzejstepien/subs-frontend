import { db } from "./db.mjs";

export const selectSubmissions = async () => {
    return db('submissions')
    .select('*')
}

export const selectStories = async () => {
    return db('stories')
    .select('title')
}