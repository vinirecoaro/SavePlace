import {render} from '@testing-library/react-native'
import LoginScreen from '@/app/index'

describe('', () => {
    it('', () => {
        const {getByTestId} = render(<LoginScreen/>)
        const component = getByTestId('login-input-username') 
        expect(component).toBeTruthy()
    })
})