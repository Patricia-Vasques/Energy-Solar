import {render} from '@testing-library/react'
import App from '../App'

describe ('jest', () => {
    it('schould work', () => {
        expect (1).toBe (1)
    })

    it('should display elements', () => {
        render (<App/>)
        screen.debug()
    })
})