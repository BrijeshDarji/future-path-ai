import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ErrorBoundary from "./components/pages/ErrorBoundary.jsx"
import Routing from "./routes/Routing.jsx"

function App() {
	return (
		<ErrorBoundary>
			<Routing />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</ErrorBoundary>
	)
}

export default App
