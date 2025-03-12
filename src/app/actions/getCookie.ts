"use server";

import { cookies } from "next/headers";

const getCookie = () => {
  return cookies().get('jwtToken')?.value
}

export default getCookie