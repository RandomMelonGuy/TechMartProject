export type Profile = {
    id: number,
    user_id: number,
    username: string,
    desc: string | undefined
}

export type ProfileForm = {
    username: string,
    desc: string | undefined
}