'use client'

import { useState } from "react"
import stylesAnim from '@styles/eyecandy/SpinCycle.module.scss'
import { TbCheck, TbExclamationCircle, TbLoader } from "react-icons/tb"


type Props = {
  email:string
}

type State = 'pending'|'error'|'success'|undefined

const statusIcon = (state:State) => {

  switch (state) {
    case 'pending':
      return <TbLoader className={'anim-spin-circle'}/>
      
    case 'success':
      return <TbCheck />

    case 'error':
      return <TbExclamationCircle />
  
    default:
      return null
  }
}

export function VerifyEmailCard ({ email }:Props) {

  const [state, setstate] = useState<State>(undefined)

  async function onSubmit(){

    try {
      setstate('pending')
      const res = await fetch(`/api/gql/noauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation VerifyEmailRequest($email: String!) {
              verifyEmailRequest(email: $email) {
                dateModified
              }
            }
          `,
          variables: {
            email
            
          }
        }),
      })

      const data = await res.json()
      console.log(data);

      setstate('success')
      
      
    } catch (error) {
      console.log(error);
      
      setstate('error')
    }
  }

  return (
    <div className={'warn'}>
      <h4> Verify Account </h4>
      <p> <strong>{email} </strong> has not yet been verified. Check your email for a validation link</p>

      {state === 'success' ? (
        <p className="success"> Follow further instructions sent to {email} </p>
      ): (
        <button 
          disabled={state === 'pending'}
          onClick={onSubmit}
        > 
          Request a new link 
        </button>
      )}
      {/* <br />
      <br />

      <p>{statusIcon(state)}</p> */}
    </div>
  )
}