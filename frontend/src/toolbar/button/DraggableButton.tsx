import { useActions, useValues } from 'kea'
import Draggable from 'react-draggable'

import { ActionsTab } from '~/toolbar/actions/ActionsTab'
import { ButtonWindow } from '~/toolbar/button/ButtonWindow'
import { ToolbarButton } from '~/toolbar/button/ToolbarButton'
import { toolbarButtonLogic } from '~/toolbar/button/toolbarButtonLogic'
import { FeatureFlags } from '~/toolbar/flags/FeatureFlags'
import { featureFlagsLogic } from '~/toolbar/flags/featureFlagsLogic'
import { posthog } from '~/toolbar/posthog'
import { HeatmapStats } from '~/toolbar/stats/HeatmapStats'

import { HedgehogButton } from './HedgehogButton'

export function DraggableButton(): JSX.Element {
    const {
        dragPosition,
        heatmapPosition,
        heatmapWindowVisible,
        actionsWindowVisible,
        actionsPosition,
        flagsVisible,
        flagsPosition,
    } = useValues(toolbarButtonLogic)
    const {
        saveDragPosition,
        saveHeatmapPosition,
        saveActionsPosition,
        hideActionsInfo,
        hideHeatmapInfo,
        hideFlags,
        saveFlagsPosition,
    } = useActions(toolbarButtonLogic)
    const { countFlagsOverridden } = useValues(featureFlagsLogic)

    return (
        <>
            <Draggable
                handle=".floating-toolbar-button"
                position={dragPosition}
                onDrag={(_, { x, y }) => {
                    saveDragPosition(x, y)
                }}
                onStop={(_, { x, y }) => {
                    posthog.capture('toolbar dragged', { x, y })
                    saveDragPosition(x, y)
                }}
            >
                <div id="button-toolbar" className="ph-no-capture">
                    <ToolbarButton />
                </div>
            </Draggable>
            <HedgehogButton />
            <ButtonWindow
                name="heatmap"
                label="Heatmap"
                visible={heatmapWindowVisible}
                close={hideHeatmapInfo}
                position={heatmapPosition}
                savePosition={saveHeatmapPosition}
            >
                <div className="toolbar-block">
                    <HeatmapStats />
                </div>
            </ButtonWindow>
            <ButtonWindow
                name={'actions'}
                label={'Actions'}
                visible={actionsWindowVisible}
                close={hideActionsInfo}
                position={actionsPosition}
                savePosition={saveActionsPosition}
            >
                <ActionsTab />
            </ButtonWindow>
            <ButtonWindow
                name="flags"
                label="Feature Flags"
                tagComponent={
                    countFlagsOverridden > 0 ? (
                        <span className="overridden-tag">{`${countFlagsOverridden} overridden`}</span>
                    ) : null
                }
                visible={flagsVisible}
                close={hideFlags}
                position={flagsPosition}
                savePosition={saveFlagsPosition}
            >
                <FeatureFlags />
            </ButtonWindow>
        </>
    )
}
