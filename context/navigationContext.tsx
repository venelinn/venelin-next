import { useRouter } from "next/router"
import React, {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react"
import useLockedScroll from "../hooks/useLockedScroll"
import useWindowSize from "../hooks/useWindowSize"

type NavigationContextType = {
	ref: HTMLElement | null
	setRef: (el: HTMLElement | null) => void
	isOpen: boolean
	setIsOpen: (open: boolean) => void
	fixed: boolean
	sticky: boolean
	stuck: boolean
	toggle: () => void
}

const NavigationContext = createContext<NavigationContextType>({
	ref: null,
	setRef: () => {},
	isOpen: false,
	setIsOpen: () => {},
	fixed: false,
	sticky: false,
	stuck: false,
	toggle: () => {},
})

type NavigationContextProviderProps = {
	children: ReactNode
}

const NAV_HEIGHT = 100

export function NavigationContextProvider({
	children,
}: NavigationContextProviderProps) {
	const [ref, setRef] = useState<HTMLElement | null>(null)
	const [isOpen, setIsOpen] = useState(false)
	const { windowSize, isDesktop } = useWindowSize()
	const [locked, setLocked] = useLockedScroll(false)
	const router = useRouter()

	const [isSticky, setIsSticky] = useState(false)
	const [isStuck, setIsStuck] = useState(false)
	const [isFixedAlwaysTrue, setIsFixedAlwaysTrue] = useState(false)

	const toggle = useCallback(() => {
		setIsOpen((prev) => !prev)
		setLocked((prev: boolean) => !prev)
	}, [setLocked])

	const rafRef = useRef(0)

	useEffect(() => {
		const viewportHeight = windowSize.height ?? 0

		const onScroll = () => {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = requestAnimationFrame(() => {
				const y = window.scrollY
				setIsStuck(y > NAV_HEIGHT)
				setIsSticky(y > NAV_HEIGHT && y > viewportHeight)
			})
		}

		window.addEventListener("scroll", onScroll, { passive: true })
		return () => {
			cancelAnimationFrame(rafRef.current)
			window.removeEventListener("scroll", onScroll)
		}
	}, [windowSize.height])

	useEffect(() => {
		if (isDesktop) {
			setIsOpen(false)
			setLocked(false)
		}
	}, [isDesktop, setLocked])

	useEffect(() => {
		if (isOpen) {
			setIsOpen(false)
			setLocked(false)
		}

		setIsFixedAlwaysTrue(false)

		requestAnimationFrame(() => {
			setIsSticky(false)
			setIsStuck(false)
		})

		setIsFixedAlwaysTrue(
			router.asPath === "/contact" ||
				router.asPath === "/privacy-policy" ||
				router.asPath === "/terms-and-conditions" ||
				/^\/media(\/|$)/.test(router.asPath),
		)
	}, [router.asPath])

	return (
		<NavigationContext.Provider
			value={{
				ref,
				setRef,
				isOpen,
				setIsOpen,
				fixed: isFixedAlwaysTrue,
				sticky: isSticky,
				stuck: isStuck,
				toggle,
			}}
		>
			{children}
		</NavigationContext.Provider>
	)
}

export default function useNavigationContext(): NavigationContextType {
	return useContext(NavigationContext)
}
