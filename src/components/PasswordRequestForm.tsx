"use client"
import { useFormState } from "react-dom"
import {
	actionPasswordRequest,
	PasswordRequestState,
} from "@actions/actionPassworRequest"
import { InputField } from "@components/InputField"
import Link from "next/link"
import { SubmitButton } from "@components/forms/SubmitButton"

const initState: PasswordRequestState = {
	values: {
		email: "",
	},
	valueErrors: undefined,
	error: undefined,
	success: undefined,
	url: undefined,
	id: undefined,
}

export function PasswordRequestForm() {
	const [state, action] = useFormState(actionPasswordRequest, initState)

	return (
		<>
			<form action={action}>
				<fieldset disabled={state.success ? true : false}>
					<legend> Request a password reset </legend>

					<InputField
						name={"email"}
						type={"email"}
						required={true}
						defaultValue={state.values?.email}
						error={state.valueErrors?.email}
					/>
				</fieldset>

				{!state.success ? (
					<SubmitButton />
				) : (
					<p className={"success"}>
						{state.success} <br/>
            <Link href={'/login'}> Back to Login </Link>
					</p>
				)}
				<p className={"error"}>{state.error}</p>
			</form>
		</>
	)
}
