'use server'

import { COOKIE_KEY } from '@/constant/app'
import { cookies } from 'next/headers'

export async function hasCookie(key: COOKIE_KEY) {
  try {
    return cookies().has(key)
  } catch {
    return false
  }
}

export async function getCookie<T>(key: COOKIE_KEY): Promise<T | null> {
  try {
    const data = cookies().get(key)?.value || null
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export async function setCookie(key: COOKIE_KEY, value: any, expired?: number) {
  try {
    cookies().set(key, JSON.stringify(value), {
      expires: expired,
    })
    return true
  } catch {
    return false
  }
}

export async function deleteCookie(key: COOKIE_KEY | COOKIE_KEY[]) {
  try {
    if (typeof key === 'string') {
      cookies().delete(key)
    } else {
      key.forEach((k) => {
        cookies().delete(k)
      })
    }
    return true
  } catch {
    return false
  }
}

export async function getAllCookies() {
  try {
    return cookies().getAll()
  } catch {
    return null
  }
}
