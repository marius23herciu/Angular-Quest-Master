export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    department: string
    points: number
    rank: string
    totalQuestsAttempts: number
    badges: [string]
}