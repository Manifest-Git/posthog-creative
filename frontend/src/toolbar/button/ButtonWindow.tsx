import { LemonButton } from '@posthog/lemon-ui'
import { Fade } from 'lib/components/Fade/Fade'
import { IconClose } from 'lib/lemon-ui/icons'
import Draggable from 'react-draggable'

interface ButtonWindowProps {
    name: string
    visible: boolean
    position: { x: number; y: number }
    savePosition: (x: number, y: number) => void
    close: () => void
    label: string | JSX.Element
    tagComponent?: null | JSX.Element
    children?: JSX.Element
}

export function ButtonWindow({
    name,
    visible,
    position,
    savePosition,
    close,
    label,
    tagComponent,
    children,
}: ButtonWindowProps): JSX.Element {
    return (
        <Fade visible={visible}>
            <Draggable
                handle=".toolbar-info-window-draggable"
                position={position}
                onDrag={(_, { x, y }) => savePosition(x, y)}
                onStop={(_, { x, y }) => savePosition(x, y)}
            >
                <div className={`toolbar-info-windows ${name}-button-window`}>
                    <div className="toolbar-info-window-title">
                        <div className="toolbar-info-window-draggable">
                            <div className="window-label">{label}</div>
                            {tagComponent}
                        </div>
                        <LemonButton
                            type="tertiary"
                            status={'stealth'}
                            icon={<IconClose />}
                            className="close-button"
                            onClick={close}
                            data-attr={'toolbar-' + name + '-window-close'}
                        />
                    </div>
                    {children}
                </div>
            </Draggable>
        </Fade>
    )
}
