import { blend, lerpBinding } from '@rbxts/pretty-react-hooks'
import { composeBindings } from '@rbxts/pretty-react-hooks'
import React from '@rbxts/react'
import { images } from 'ReplicatedStorage/shared/assets'
import { palette } from 'ReplicatedStorage/shared/constants/palette'
import { Frame } from 'StarterPlayer/StarterPlayerScripts/Gui/components/Frame'
import { Image } from 'StarterPlayer/StarterPlayerScripts/Gui/components/Image'
import { Outline } from 'StarterPlayer/StarterPlayerScripts/Gui/components/Outline'
import { ReactiveButton } from 'StarterPlayer/StarterPlayerScripts/Gui/components/ReactiveButton'
import { Shadow } from 'StarterPlayer/StarterPlayerScripts/Gui/components/Shadow'
import { useMotion, useRem } from 'StarterPlayer/StarterPlayerScripts/Gui/hooks'

interface PrimaryButtonProps extends React.PropsWithChildren {
  readonly onClick?: () => void
  readonly onHover?: (hovered: boolean) => void
  readonly size?: UDim2 | React.Binding<UDim2>
  readonly position?: UDim2 | React.Binding<UDim2>
  readonly anchorPoint?: Vector2 | React.Binding<Vector2>
  readonly overlayGradient?: ColorSequence | React.Binding<ColorSequence>
  readonly overlayTransparency?: number | React.Binding<number>
  readonly overlayRotation?: number | React.Binding<number>
  readonly layoutOrder?: number | React.Binding<number>
}

export function PrimaryButton({
  onClick,
  onHover,
  size,
  position,
  anchorPoint,
  overlayGradient,
  overlayTransparency = 0,
  overlayRotation,
  layoutOrder,
  children,
}: PrimaryButtonProps) {
  const rem = useRem()
  const [hover, hoverMotion] = useMotion(0)

  return (
    <ReactiveButton
      onClick={onClick}
      onHover={(hovered) => {
        hoverMotion.spring(hovered ? 1 : 0)
        onHover?.(hovered)
      }}
      backgroundTransparency={1}
      anchorPoint={anchorPoint}
      size={size}
      position={position}
      layoutOrder={layoutOrder}
    >
      <Shadow
        shadowSize={rem(2.5)}
        shadowBlur={0.2}
        shadowTransparency={lerpBinding(hover, 0.7, 0.4)}
        shadowPosition={rem(0.5)}
      />

      <Frame
        backgroundColor={palette.white}
        cornerRadius={new UDim(0, rem(1))}
        size={new UDim2(1, 0, 1, 0)}
      >
        <uigradient
          Offset={lerpBinding(hover, new Vector2(), new Vector2(0, 1))}
          Rotation={90}
          Transparency={new NumberSequence(0, 0.1)}
        />
      </Frame>

      <Outline cornerRadius={new UDim(0, rem(1))} innerTransparency={0} />

      <Image
        image={images.gui.button_glow_top}
        imageTransparency={composeBindings(
          overlayTransparency,
          lerpBinding(hover, 0.3, 0),
          blend,
        )}
        cornerRadius={new UDim(0, rem(1))}
        size={new UDim2(1, 0, 1, 0)}
      >
        <uigradient Color={overlayGradient} Rotation={overlayRotation} />
      </Image>

      {children}
    </ReactiveButton>
  )
}
