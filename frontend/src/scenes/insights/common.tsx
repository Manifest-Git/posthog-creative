import '../../lib/components/PropertyGroupFilters/PropertyGroupFilters.scss'

import clsx from 'clsx'
import { IconInfo } from 'lib/lemon-ui/icons'
import { Tooltip } from 'lib/lemon-ui/Tooltip'

export function GlobalFiltersTitle({
    unit = 'series',
    title = 'Filters',
    orFiltering = false,
}: {
    unit?: string
    title?: string
    orFiltering?: boolean
}): JSX.Element {
    return (
        <h4 className={clsx('secondary', orFiltering && 'property-group-title')}>
            {title}{' '}
            {!orFiltering && (
                <Tooltip
                    title={
                        <>
                            These filters will apply to <b>all</b> the {unit} in this graph.
                        </>
                    }
                >
                    <IconInfo className="ml-1" />
                </Tooltip>
            )}
        </h4>
    )
}
