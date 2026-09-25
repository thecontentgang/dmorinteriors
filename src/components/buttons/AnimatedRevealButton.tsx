"use client"

import * as React from "react"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useAnimate, useReducedMotion, type Transition } from "framer-motion"
import { Link } from "react-router-dom"

type Colors = {
    fill?: string
    textColor?: string
    hoverFill?: string
    hoverTextColor?: string
}

export type IconConfig = {
    type?: "icon" | "symbol" | "image"
    icon?: string | React.ReactNode
    symbol?: string
    image?: string | { src?: string; srcSet?: string; alt?: string }
    background?: string
    color?: string
    badgeSize?: number
    size?: number
    iconSize?: number
    padding?: number
    rounded?: number
    inset?: number
    badgeInset?: number
    direction?: number | string
    restAngle?: number | string
    hoverAngle?: number | string
    side?: "left" | "right"
    position?: "left" | "right"
}

type Props = {
    colors?: Colors
    label?: string
    font?: any
    padding?: string
    rounded?: number
    fill?: string
    textColor?: string
    border?: any
    icon?: IconConfig
    arrow?: IconConfig
    gap?: number
    to?: string
    link?: string
    onClick?: () => void
    className?: string
    transition?: Transition
    newTab?: boolean
    style?: React.CSSProperties
    type?: "button" | "submit"
}

const borderWidthOf = (b: any): number => {
    if (!b) return 0
    if (typeof b === "number") return b
    const num = (v: any) => {
        if (typeof v === "number") return v
        const parsed = parseFloat(String(v ?? ""))
        return Number.isFinite(parsed) ? parsed : 0
    }
    const sides = [
        b.borderTopWidth, b.borderRightWidth, b.borderBottomWidth, b.borderLeftWidth,
    ].filter((v) => v !== undefined && v !== null)
    if (sides.length) return Math.max(...sides.map(num))
    return num(b.borderWidth)
}

const radiusFromPercent = (w: number, h: number, pct: number) =>
    (Math.min(w, h) / 2) * (Math.max(0, Math.min(100, pct)) / 100)

const TWELVE_ANGLES: Record<string, number> = {
    "0": 0, "30": 30, "60": 60, "90": 90, "120": 120, "150": 150, "180": 180,
    "210": 210, "240": 240, "270": 270, "300": 300, "330": 330,
    right: 0, downRight: 45, down: 90, downLeft: 135, left: 180, upLeft: 225, up: 270, upRight: 315,
}

const getAngleInDegrees = (dir: number | string | undefined, defaultVal = 0): number => {
    if (dir === undefined || dir === null) return defaultVal
    if (typeof dir === "number") return ((dir % 360) + 360) % 360
    if (typeof dir === "string" && dir in TWELVE_ANGLES) return TWELVE_ANGLES[dir]
    const parsed = parseFloat(String(dir ?? ""))
    if (Number.isFinite(parsed)) return ((parsed % 360) + 360) % 360
    return defaultVal
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
const ICON_STROKE_WIDTH = 2

function renderIconPath(iconType: any, strokeWidth: number = ICON_STROKE_WIDTH) {
    if (React.isValidElement(iconType)) return iconType
    const str = typeof iconType === "string" ? iconType.toLowerCase() : "arrow"

    switch (str) {
        case "arrowdiagonal":
        case "arrow-diagonal":
            return <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        default:
            return <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    }
}

export default function AnimatedRevealButton(props: Props) {
    const {
        label = "ARROW REVEAL",
        font,
        padding,
        rounded = 100,
        colors = { fill: "#FFFFFF", textColor: "#000000" },
        border = { borderColor: "#FFFFFF", borderStyle: "solid", borderWidth: 2 },
        icon: iconProps,
        gap,
        to,
        link,
        onClick,
        className = "",
        transition = { ease: [0.44, 0, 0.56, 1], type: "tween", delay: 0, duration: 0.46 },
        newTab = false,
        style,
        type = "button",
    } = props

    const fill = colors?.fill ?? "#FFFFFF"
    const textColor = colors?.textColor ?? "#000000"
    const hoverTextColor = colors?.hoverTextColor ?? textColor
    const iconObj: IconConfig = iconProps || {}

    const {
        icon: iconType = "arrow-diagonal",
        background: iconBackground = "#000000",
        color: iconColor = "#FFFFFF",
        badgeSize: badgeSizePropIn,
        size: sizeProp,
        iconSize: iconSizeProp,
        padding: iconPadding = 24,
        rounded: iconRounded = 100,
        inset: insetProp,
        direction: iconDirection = 0,
        restAngle: restAngleProp,
        hoverAngle: hoverAngleProp,
        position: iconPosition = "right",
    } = iconObj

    const badgeInset = insetProp ?? 4
    const bWidth = borderWidthOf(border)
    const effectiveInset = badgeInset

    const Tag: any = to ? Link : (link ? "a" : "button")
    const tagProps = to ? { to, onClick } : link ? { href: link, target: newTab ? "_blank" : undefined, onClick } : { type, onClick }

    const [scope, animate] = useAnimate()
    const buttonRef = useRef<HTMLElement>(null)
    const strokeRef = useRef<HTMLSpanElement>(null)
    const badgeRef = useRef<HTMLDivElement>(null)
    const slotRef = useRef<HTMLSpanElement>(null)
    const textRef = useRef<HTMLSpanElement>(null)
    const arrowRef = useRef<HTMLDivElement>(null)
    const hovered = useRef(false)
    const metrics = useRef({ hoverScale: 1, hoverX: 0 })
    const reducedMotion = useReducedMotion()

    const iconSize = Math.max(1, Math.round(iconSizeProp ?? sizeProp ?? 32))
    const badgeSizeProp = badgeSizePropIn !== undefined ? Math.max(1, Math.round(badgeSizePropIn)) : Math.max(1, Math.round(iconSize + 2 * iconPadding))

    const dirAngle = getAngleInDegrees(iconDirection, 0)
    const restAngleVal = getAngleInDegrees(restAngleProp, dirAngle)
    const hoverAngleVal = getAngleInDegrees(hoverAngleProp, dirAngle + 45)
    const iconRadius = `${Math.max(0, Math.min(100, Math.round(iconRounded))) / 2}%`
    const isLeft = iconPosition === "left"

    useEffect(() => {
        if (!hovered.current && arrowRef.current) {
            animate(arrowRef.current, { rotate: restAngleVal }, { duration: 0 })
        }
    }, [restAngleVal, animate])

    useIsoLayoutEffect(() => {
        const btn = buttonRef.current
        const badge = badgeRef.current
        const arrow = arrowRef.current
        const slot = slotRef.current
        const strokeEl = strokeRef.current
        if (!btn || !badge || !arrow || !slot) return

        const measure = () => {
            const w = btn.offsetWidth
            const h = btn.offsetHeight
            if (!w || !h) return

            const radius = radiusFromPercent(w, h, rounded)
            btn.style.borderRadius = `${radius}px`
            if (strokeEl) strokeEl.style.borderRadius = `${radius + bWidth}px`

            const room = Math.min(h, w) - 2 * effectiveInset
            if (room <= 0) return
            const badgeSize = Math.min(badgeSizeProp, room)
            const rb = badgeSize / 2

            const rawCx = slot.offsetLeft + slot.offsetWidth / 2
            const cy = slot.offsetTop + slot.offsetHeight / 2

            const fromEdge = Math.max(effectiveInset + rb, radius)
            const cx = Math.min(Math.max(rawCx, fromEdge), w - fromEdge)

            const far = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy))
            const coverD = Math.ceil(2 * far * 1.1)
            const arrowSize = Math.min(iconSize, Math.floor(badgeSize / Math.SQRT2))

            metrics.current = {
                hoverScale: badgeSize > 0 ? coverD / badgeSize : 1,
                // Changed from `w / 2 - cx` to `0` so the arrow anchors to the right side
                hoverX: 0,
            }

            badge.style.width = `${badgeSize}px`
            badge.style.height = `${badgeSize}px`
            badge.style.left = `${cx}px`
            badge.style.top = `${cy}px`
            badge.style.marginLeft = `${-rb}px`
            badge.style.marginTop = `${-rb}px`

            arrow.style.width = `${arrowSize}px`
            arrow.style.height = `${arrowSize}px`
            arrow.style.fontSize = `${arrowSize}px`
            arrow.style.marginLeft = `${-arrowSize / 2}px`
            arrow.style.marginTop = `${-arrowSize / 2}px`
            arrow.style.left = `${cx}px`
            arrow.style.top = `${cy}px`
            arrow.style.right = "auto"

            if (!hovered.current) {
                animate(badge, { scale: 1 }, { duration: 0 })
                animate(arrow, { x: 0, rotate: restAngleVal }, { duration: 0 })
            }
        }

        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(btn)
        ro.observe(slot)
        return () => ro.disconnect()
    }, [animate, badgeSizeProp, iconSize, padding, isLeft, rounded, restAngleVal, effectiveInset, bWidth])

    const opts = () => (reducedMotion ? { duration: 0 } : transition)

    const pressTo = (s: number) => {
        if (buttonRef.current) animate(buttonRef.current as HTMLElement, { scale: s } as any, opts() as any)
        if (strokeRef.current) animate(strokeRef.current, { scale: s } as any, opts() as any)
    }

    const onEnter = () => {
        hovered.current = true
        animate(badgeRef.current!, { scale: metrics.current.hoverScale } as any, opts() as any)
        animate(arrowRef.current!, { x: metrics.current.hoverX, rotate: hoverAngleVal } as any, opts() as any)

        // Slightly pushes text leftward to give the right-anchored arrow room to breathe
        if (textRef.current) animate(textRef.current, { x: isLeft ? 6 : -6, color: hoverTextColor } as any, opts() as any)
    }

    const onLeave = () => {
        hovered.current = false
        animate(badgeRef.current!, { scale: 1 } as any, opts() as any)
        animate(arrowRef.current!, { x: 0, rotate: restAngleVal } as any, opts() as any)
        if (textRef.current) animate(textRef.current, { x: 0, color: textColor } as any, opts() as any)
        pressTo(1)
    }

    return (
        <div ref={scope} className={className} style={{ display: "inline-flex", position: "relative", overflow: "visible", ...style }}>
            <Tag
                {...tagProps}
                ref={buttonRef}
                onPointerEnter={onEnter}
                onPointerLeave={onLeave}
                onPointerDown={() => pressTo(0.97)}
                onPointerUp={() => pressTo(1)}
                style={{
                    boxSizing: "border-box", flex: "1 1 auto", display: "flex", alignItems: "center",
                    flexDirection: isLeft ? "row-reverse" : "row", justifyContent: "space-between",
                    background: fill, border: "none", overflow: "hidden", position: "relative",
                    cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", userSelect: "none",
                    ...(padding ? { padding } : {}),
                    ...(gap ? { gap } : {})
                }}
            >
                <span ref={textRef} style={{ position: "relative", zIndex: 10, color: textColor, ...font }}>
                    {label}
                </span>

                <span ref={slotRef} aria-hidden style={{ flex: "none", width: badgeSizeProp, height: badgeSizeProp }} />

                <div ref={badgeRef} aria-hidden style={{
                    position: "absolute", zIndex: 2, width: 0, height: 0,
                    borderRadius: iconRadius, background: iconBackground, transformOrigin: "center", pointerEvents: "none",
                }} />

                <div ref={arrowRef} aria-hidden style={{
                    position: "absolute", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center",
                    color: iconColor, pointerEvents: "none",
                }}>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {renderIconPath(iconType)}
                    </svg>
                </div>
            </Tag>

            <span ref={strokeRef} aria-hidden style={{
                position: "absolute", inset: -bWidth, zIndex: 4, boxSizing: "border-box",
                pointerEvents: "none", ...(border ?? {}),
            }} />
        </div>
    )
}