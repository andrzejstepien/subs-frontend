import { db } from "./db.mjs";

export const selectSubmissions = async () => {
    return db('submissions')
    .select('*')
}