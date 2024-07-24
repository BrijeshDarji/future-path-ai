import { memo } from "react"
import Footer from "./Footer"
import Header from "./Header"

function Container(props) {

    return (
        <>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </>
    )
}

export default memo(Container)
