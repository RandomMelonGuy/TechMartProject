export type Profile = {
    user_id: number,
    username: string,
    desc: string | undefined,
    ico: string | undefined
}

export type ProfileForm = {
    username: string,
    desc: string | undefined
}