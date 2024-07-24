import "./App.css"

import ErrorBoundary from "./components/pages/ErrorBoundary.jsx"
import Routing from "./routes/Routing.jsx"

function App() {
	return (
		<ErrorBoundary>
			<Routing />
		</ErrorBoundary>
	)
}

export default App
