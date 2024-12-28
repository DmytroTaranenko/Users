import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root') as HTMLDivElement).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <App />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </StrictMode>
)
