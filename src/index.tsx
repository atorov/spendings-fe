import { render } from 'react-dom'

import App from './App'

declare const APP_NAME: string
declare const APP_VERSION: string
declare const MODE: string
declare const NODE_ENV: string

const appRootElement: HTMLElement | null = document.querySelector('#app-root')
const buildDate = appRootElement?.dataset.buildDate

console.log('::: ::: :::')
console.log('::: APP_NAME:', APP_NAME)
console.log('::: APP_VERSION:', APP_VERSION)
console.log('::: MODE:', MODE)
console.log('::: NODE_ENV:', NODE_ENV)
console.log('::: Build Date:', buildDate)
console.log('::: ::: :::')

render(<App />, document.querySelector('#app-root'))
