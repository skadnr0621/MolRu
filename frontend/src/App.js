import Router from './routes'
import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
import { AppProvider } from './contexts/context'

function App() {
  return (
    <AppProvider>
      <ThemeConfig>
        <GlobalStyles />
        <Router />
      </ThemeConfig>
    </AppProvider>
  )
}

export default App
