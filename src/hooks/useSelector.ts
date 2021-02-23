import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'

import { State } from '../types'

export const useSelector = useReduxSelector as TypedUseSelectorHook<State>
