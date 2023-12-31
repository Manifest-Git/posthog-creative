import { expectLogic } from 'kea-test-utils'

import { initKeaTests } from '~/test/init'
import { toolbarLogic } from '~/toolbar/toolbarLogic'

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
    } as any as Response)
)

describe('toolbar toolbarLogic', () => {
    let logic: ReturnType<typeof toolbarLogic.build>

    beforeEach(() => {
        initKeaTests()
        logic = toolbarLogic({ apiURL: 'http://localhost' })
        logic.mount()
    })

    it('is not authenticated', () => {
        expectLogic(logic).toMatchValues({ isAuthenticated: false })
    })
})
