"use client"
// dave gray - https://github.com/gitdagray/next-dialog-modal/blob/main/src/app/components/Dialog.tsx
import { useSearchParams } from "next/navigation"
import { useRef, useEffect, type ComponentPropsWithoutRef } from "react"
// import styles, {
// 	animated_wrapper,
// 	wrapper,
// } from "@styles/popup.module.css"
import { useRouter } from "next/navigation"
import { IoMdClose } from "react-icons/io"

type Props = ComponentPropsWithoutRef<"dialog"> & {
	title?: string
	buttonLabel?: string
	onClose?: () => void
	onOk?: () => void
	children: React.ReactNode
}

export function DialogPopup(props: Props) {
	const { title, onClose, onOk, buttonLabel = "OK", children } = props

	const searchParams = useSearchParams()
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const showPopup = searchParams?.get("popup")
	const router = useRouter()

	useEffect(() => {
		switch (showPopup) {
			case "modal":
				dialogRef.current?.showModal()
				// dialogRef.current?.classList.add(styles.open)
				break

			case "dialog":
				dialogRef.current?.show()
				break

			default:
				dialogRef.current?.close()
		}
	}, [showPopup])

	const handleTransitionEnd = () => {
		if (!showPopup) {
			if (!dialogRef.current) return
			closeDialog()
		}
	}

	const closeDialog = () => {
		// dialogRef.current?.classList.add(styles.close)


		dialogRef.current?.addEventListener(
			"animationend",
			() => {

		    // dialogRef.current?.classList.remove(styles.close)
				dialogRef.current?.close()
				router.back()
				if (onClose) onClose()
			},
			{ once: true }
		)
	}

	const clickOk = () => {
		if (onOk) onOk()
		router.back()
		closeDialog()
	}

	// todo hide and show with style components so i can get a smooth transition
	// const dialog: JSX.Element | null = (showPopup === 'modal') || (showPopup === 'dialog')
	return (
		<dialog
			ref={dialogRef}
			
			onTransitionEnd={handleTransitionEnd}
		>
			<button  onClick={closeDialog}>
				{/* if user clicks off of dialog box, close it */}
			</button>

			<div >
				<header>
					<h2>{title}</h2>

					<button onClick={closeDialog} >
						<IoMdClose />
					</button>
				</header>

				<div >
					{children}

					{buttonLabel && (
						<div >
							<button onClick={clickOk} className={`button`}>
								{buttonLabel}
							</button>
						</div>
					)}
				</div>
			</div>
		</dialog>
	)
}
